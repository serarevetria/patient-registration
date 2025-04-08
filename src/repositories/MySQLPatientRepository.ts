import { PatientRepository } from "./PatientRepository";
import { pool } from "../config/db";

export class MySQLPatientRepository implements PatientRepository {
  async createPatient(patient: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }) {
    const { name, email, phone, address } = patient;

    const query =
      "INSERT INTO patients (name, email, phone, address) VALUES (?, ?, ?, ?)";
    const [result] = await pool.query(query, [name, email, phone, address]);

    return result;
  }
}
