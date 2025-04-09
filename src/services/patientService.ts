import { RepositoryFactory } from "../repositories/repositoryFactory";
import { PatientRepository } from "../repositories/PatientRepository";
import { NotificationService } from "./notificationService";

export class PatientService {
  private patientRepository: PatientRepository;
  private notificationService: NotificationService;

  constructor() {
    this.patientRepository = RepositoryFactory.createPatientRepository();
    this.notificationService = new NotificationService();
  }

  async registerPatient(patient: {
    name: string;
    email: string;
    phone: string;
    address: string;
    photo: string;
  }) {
    const response = await this.patientRepository.createPatient(patient);
    if (response) {
      await this.notificationService.sendNotifications(
        { email: patient.email },
        "welcome"
      );
      return response;
    } else {
      throw new Error("Failed to register patient");
    }
  }
}
