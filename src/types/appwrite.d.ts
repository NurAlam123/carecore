import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  birth_date: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergency_contactName: string;
  emergency_contact_number: string;
  primary_physician: string;
  insurance_provider: string;
  insurance_policy_number: string;
  allergies: string | undefined;
  current_medication: string | undefined;
  family_medical_history: string | undefined;
  past_medical_history: string | undefined;
  identification_type: string | undefined;
  identification_number: string | undefined;
  identification_document: FormData | undefined;
  privacy_consent: boolean;
}

export interface Appointment extends Models.Document {
  patient: Patient;
  patient: string;
  schedule: Date;
  status: Status;
  primary_physician: string;
  reason: string;
  note: string;
  user_id: string;
  cancellation_reason: string | null;
}
