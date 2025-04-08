import { RepositoryFactory } from "../repositories/repositoryFactory";
import { PatientRepository } from "../repositories/PatientRepository";

export class PatientService {
  private patientRepository: PatientRepository;

  constructor() {
    this.patientRepository = RepositoryFactory.createPatientRepository();
  }

  async registerPatient(patient: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }) {
    return await this.patientRepository.createPatient(patient);
  }
}
