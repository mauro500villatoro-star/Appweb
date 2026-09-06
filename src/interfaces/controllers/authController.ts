import { Request, Response } from "express";
import { authService } from "../../application/use-cases/auth/authService";

export const authController = {

  async register(req: Request, res: Response) {

    try {

      const result = await authService.register(req.body);

      res.status(201).json({
        success: true,
        message: result.message,
        data: result.data
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,
        message: error.message,
        data: null
      });

    }

  },

  async login(req: Request, res: Response) {

    try {

      const { usuario, password } = req.body;

      const result = await authService.login(usuario, password);

      res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso",
        data: result
      });

    } catch (error: any) {

      res.status(401).json({
        success: false,
        message: error.message,
        data: null
      });

    }

  }

};