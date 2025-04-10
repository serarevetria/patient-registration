import { Router } from "express";
import { getPatients, registerPatient } from "../controllers/patientController";

const router = Router();

router.post("/patients", registerPatient);
router.get("/patients", getPatients);

export default router;
