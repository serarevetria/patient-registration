import { PatientRepository } from "./PatientRepository";
import { pool } from "../config/db";

export class MySQLPatientRepository implements PatientRepository {
  async createPatient(patient: {
    name: string;
    email: string;
    phone: string;
    address: string;
    photo: string;
  }) {
    const { name, email, phone, address, photo } = patient;

    const query =
      "INSERT INTO patients (name, email, phone, address, photo) VALUES (?, ?, ?, ?, ?)";
    const [result] = await pool.query(query, [
      name,
      email,
      phone,
      address,
      photo,
    ]);

    return result;
  }
}
