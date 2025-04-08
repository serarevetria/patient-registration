import { Router } from "express";
import { registerPatient } from "../controllers/patientController";

const router = Router();

router.post("/patients", registerPatient);

export default router;
