import { RegisterFieldValues } from "@/schemas/RegisterFormSchema";

export enum Collection {
  PATIENT = "patient",
  APPOINTMENT = "appointment",
}

export enum FormFieldTypes {
  INPUT = "input",
  PHONE_INPUT = "phoneInput",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues: Partial<RegisterFieldValues> = {
  name: "",
  email: "",
  phone: "",
  birth_date: undefined,
  gender: undefined,
  address: "",
  occupation: "",
  emergency_contact_name: "",
  emergency_contact_number: "",
  primary_physician: "",
  insurance_provider: "",
  insurance_policy_number: "",
  allergies: "",
  current_medication: "",
  family_medical_history: "",
  past_medical_history: "",
  identification_type: "",
  identification_number: "",
  identification_document: [],
  treatment_consent: false,
  disclosure_consent: false,
  privacy_consent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
