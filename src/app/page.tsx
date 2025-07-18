import Logo from "@/assets/logo";
import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ admin: string }>;
}) {
  const query = await searchParams;
  const isAdmin = query.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <div className="mb-12">
            <Logo />
          </div>

          <PatientForm />

          <div className="text-regular-[14] mt-20 flex justify-between">
            <p className="justify-items-center text-dark-600 xl:text-left">
              &copy; 2025 CareCore
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        alt="Onboarding"
        width={1000}
        height={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
