import { Request, Response, NextFunction } from "express";
import { z } from "zod";

import { patientSchema } from "../validators/patientValidator";
import { PatientService } from "../services/patientService";

const patientService = new PatientService();

export const registerPatient = async (req: Request, res: Response) => {
  try {
    const validatedData = patientSchema.parse(req.body);

    const result = await patientService.registerPatient(validatedData);

    res.status(201).json({
      message: "Paciente registrado correctamente",
      patientId: result.insertId,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      console.error(error);
      res
        .status(500)
        .json({ message: "Hubo un error al registrar el paciente" });
    }
  }
};
