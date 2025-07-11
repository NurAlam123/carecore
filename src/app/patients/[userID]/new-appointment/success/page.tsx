import Logo from "@/assets/logo";
import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.action";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface AppointmentSuccessPageTypes {
  params: Promise<{ userID: string }>;
  searchParams: Promise<{
    appointmentID: string;
  }>;
}

const AppointmentSuccessPage = async ({
  params,
  searchParams,
}: AppointmentSuccessPageTypes) => {
  const { userID } = await params;
  const { appointmentID } = await searchParams;
  const appointment = await getAppointment(appointmentID);
  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primary_physician,
  );

  return (
    <div className="h-screen flex max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Logo />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            alt="success"
            width={300}
            height={280}
            priority
            className="w-auto h-auto select-none"
            draggable="false"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We will be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details:</p>

          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image || ""}
              alt={doctor?.name || "doctor"}
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>

            <div className="flex gap-2">
              <Image
                src="/assets/icons/calendar.svg"
                alt="Calendar"
                height={24}
                width={24}
              />
              <p className="">
                {formatDateTime(appointment.schedule).dateTime}
              </p>
            </div>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userID}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">&copy; 2025 CareCore</p>
      </div>
    </div>
  );
};

export default AppointmentSuccessPage;
