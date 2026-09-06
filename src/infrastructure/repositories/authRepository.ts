import Usuario from "../models/UsuarioModel";
import { Op } from "sequelize";

export const authRepository = {

  async findUserByUsuario(usuario: string) {
    return await Usuario.findOne({
      where: { usuario }
    });
  },

  async findUserByUsuarioOrCorreo(usuario: string, correo: string) {
    return await Usuario.findOne({
      where: {
        [Op.or]: [
          { usuario },
          { correo }
        ]
      }
    });
  },

  async createUser(data: any) {
    return await Usuario.create({
      nombre: data.nombre,
      apellido: data.apellido,
      usuario: data.usuario,
      correo: data.correo,
      password: data.password
    });
  }
};