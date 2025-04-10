export interface PatientRepository {
  createPatient(patient: {
    name: string;
    email: string;
    phone: string;
    address: string;
    photo: string;
  }): Promise<any>;

  getPatients(): Promise<any[]>;
}
