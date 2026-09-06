import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authRepository } from "../../../infrastructure/repositories/authRepository";

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET no está configurado");
}

export const authService = {

  async register(data: any) {

    const {
      nombre,
      apellido,
      usuario,
      correo,
      password
    } = data;

    const exists =
      await authRepository.findUserByUsuarioOrCorreo(
        usuario,
        correo
      );

    if (exists) {
      throw new Error("El usuario o correo ya existe");
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const nuevoUsuario =
      await authRepository.createUser({
        nombre,
        apellido,
        usuario,
        correo,
        password: hashedPassword
      });

    return {
      message: "Registro exitoso",
      data: {
        id: nuevoUsuario.getDataValue("id"),
        nombre: nuevoUsuario.getDataValue("nombre"),
        apellido: nuevoUsuario.getDataValue("apellido"),
        usuario: nuevoUsuario.getDataValue("usuario"),
        correo: nuevoUsuario.getDataValue("correo")
      }
    };

  },

  async login(usuario: string, password: string) {

    const user =
      await authRepository.findUserByUsuario(usuario);

    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.getDataValue("password")
      );

    if (!validPassword) {
      throw new Error("Credenciales inválidas");
    }

    const payload = {
      id: user.getDataValue("id"),
      usuario: user.getDataValue("usuario"),
      correo: user.getDataValue("correo")
    };

    const token = jwt.sign(
      payload,
      SECRET_KEY,
      {
        expiresIn: "1h"
      }
    );

    return {
      token,
      user: {
        id: user.getDataValue("id"),
        nombre: user.getDataValue("nombre"),
        apellido: user.getDataValue("apellido"),
        usuario: user.getDataValue("usuario"),
        correo: user.getDataValue("correo")
      }
    };

  }

};