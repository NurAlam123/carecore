import Logo from "@/assets/logo";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/appwrite";
import Image from "next/image";

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
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Logo />

          <RegisterForm user={user} />

          <p className="copyright py-10">&copy; 2025 CareCore</p>
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
