import { MySQLPatientRepository } from "./MySQLPatientRepository";
import { PatientRepository } from "./PatientRepository";

export class RepositoryFactory {
  static createPatientRepository(): PatientRepository {
    return new MySQLPatientRepository();
  }
}
