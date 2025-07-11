import { Patient } from "@/types/appwrite";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { formatDateTime } from "@/lib/utils";

const PatientDetails = ({ patient }: { patient: Patient }) => {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <p className="text-medium-[14]">{patient.name}</p>
      </DialogTrigger>

      <DialogContent className="bg-dark-400 max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
        </DialogHeader>

        <section className="overflow-y-auto max-h-[65vh] pr-2">
          <div className="space-y-4 overflow-y-auto">
            <div className="space-y-2">
              <p className="text-medium-[18]">Patient Name</p>
              <p className="text-regular-[16] bg-dark-500 px-2 py-1 rounded-sm">
                {patient.name}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-medium-[18]">Email</p>
              <p className="text-regular-[16] bg-dark-500 px-2 py-1 rounded-sm">
                {patient.email}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-medium-[18]">Phone</p>
              <p className="text-regular-[16] bg-dark-500 px-2 py-1 rounded-sm">
                {patient.phone}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-medium-[18]">Gender</p>
              <p className="text-regular-[16] bg-dark-500 px-2 py-1 rounded-sm">
                {patient.gender}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-medium-[18]">Birth Date</p>
              <p className="text-regular-[16] bg-dark-500 px-2 py-1 rounded-sm">
                {formatDateTime(patient.birth_date).dateOnly}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-medium-[18]">Address</p>
              <p className="text-regular-[16] bg-dark-500 px-2 py-1 rounded-sm">
                {patient.address}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-medium-[18]">Occupation</p>
              <p className="text-regular-[16] bg-dark-500 px-2 py-1 rounded-sm">
                {patient.occupation || "Not Provided"}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-medium-[18]">Emergency Contact</p>
              <p className="text-regular-[16] bg-dark-500 px-2 py-1 rounded-sm">
                {patient.emergency_contact_name} -{" "}
                {patient.emergency_contact_number}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-medium-[18]">Insurance</p>
              <p className="text-regular-[16] bg-dark-500 px-2 py-1 rounded-sm">
                {patient.insurance_provider} - {patient.insurance_policy_number}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-medium-[18]">Allergies</p>
              <p className="text-regular-[16] bg-dark-500 px-2 py-1 rounded-sm">
                {patient.allergies || "Not Provided"}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-medium-[18]">Current Medication</p>
              <p className="text-regular-[16] bg-dark-500 px-2 py-1 rounded-sm">
                {patient.current_medication || "Not Provided"}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-medium-[18]">Family Medical History</p>
              <p className="text-regular-[16] bg-dark-500 px-2 py-1 rounded-sm">
                {patient.family_medical_history || "Not Provided"}
              </p>
              <p className="text-medium-[18]">Past Medical History</p>
              <p className="text-regular-[16] bg-dark-500 px-2 py-1 rounded-sm">
                {patient.past_medical_history || "Not Provided"}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-medium-[18]">ID Type</p>
              <p className="text-regular-[16] bg-dark-500 px-2 py-1 rounded-sm">
                {patient.identification_type || "Not Provided"}
              </p>

              <p className="text-medium-[18]">ID Number</p>
              <p className="text-regular-[16] bg-dark-500 px-2 py-1 rounded-sm">
                {patient.identification_number || "Not Provided"}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-medium-[18]">Primary Physician</p>
              <p className="text-regular-[16] bg-dark-500 px-2 py-1 rounded-sm">
                {patient.primary_physician}
              </p>
            </div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetails;
