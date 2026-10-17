import { Request, Response } from "express";
import Perfil from "../../infrastructure/models/PerfilModel";
import Usuario from "../../infrastructure/models/UsuarioModel";

export const profileController = {
  async getMe(req: Request, res: Response) {
    try {
      const userId = req.authenticatedUser!.id;
      const user = await Usuario.findByPk(userId, {
        attributes: ["id", "nombre", "apellido", "usuario", "correo", "rol"]
      });
      if (!user) return res.status(404).json({ success: false, message: "Usuario no encontrado", data: null });
      const [perfil] = await Perfil.findOrCreate({ where: { usuarioId: userId }, defaults: { usuarioId: userId } });
      return res.json({ success: true, message: "Perfil obtenido", data: { usuario: user, perfil } });
    } catch {
      return res.status(500).json({ success: false, message: "No fue posible consultar el perfil", data: null });
    }
  },

  async updateMe(req: Request, res: Response) {
    try {
      const userId = req.authenticatedUser!.id;
      const allowed = ["direccion", "telefono", "fechaNacimiento", "genero", "biografia", "foto"];
      const changes: Record<string, unknown> = {};
      for (const key of allowed) {
        if (Object.prototype.hasOwnProperty.call(req.body ?? {}, key)) changes[key] = req.body[key];
      }
      if (typeof changes.foto === "string" && changes.foto.length > 5_000_000) {
        return res.status(413).json({ success: false, message: "La fotografía es demasiado grande; comprímela antes de enviarla", data: null });
      }
      if (changes.foto !== undefined && changes.foto !== null && typeof changes.foto !== "string") {
        return res.status(400).json({ success: false, message: "La fotografía debe enviarse como texto Base64 o null", data: null });
      }
      const [perfil] = await Perfil.findOrCreate({ where: { usuarioId: userId }, defaults: { usuarioId: userId } });
      await perfil.update(changes);
      return res.json({ success: true, message: "Perfil actualizado", data: perfil });
    } catch {
      return res.status(400).json({ success: false, message: "No fue posible actualizar el perfil; verifica los datos enviados", data: null });
    }
  }
};
