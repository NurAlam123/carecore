import Logo from "@/assets/logo";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/appwrite.config";
import Image from "next/image";
import Link from "next/link";

interface Params {
  userID: string;
}

interface Props {
  params: Promise<Params>;
}
const UserRegisterPage = async ({ params }: Props) => {
  const { userID } = await params;

  const user = await getUser(userID);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Logo />

          <RegisterForm user={user} />

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
        src="/assets/images/register-img.png"
        alt="Register"
        width={1000}
        height={1000}
        className="side-img max-w-[390px] select-none"
        draggable="false"
      />
    </div>
  );
};

export default UserRegisterPage;
