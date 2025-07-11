import Logo from "@/assets/logo";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/appwrite.config";
import Image from "next/image";

interface Params {
  userID: string;
}

interface Props {
  params: Promise<Params>;
}

const NewAppointmentPage = async ({ params }: Props) => {
  const { userID } = await params;

  const patient = await getPatient(userID);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Logo />

          <AppointmentForm
            userID={userID}
            appointmentStatusType="create"
            patientID={patient.$id}
          />

          <p className="copyright">&copy; 2025 CareCore</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        alt="Appoinment"
        width={1000}
        height={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default NewAppointmentPage;
