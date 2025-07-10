import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center mb-12 select-none">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={540}
        height={540}
        className="h-14 w-fit select-none"
        draggable="false"
      />
      <p className="font-bold -ml-2 text-xl">CareCore</p>
    </div>
  );
};

export default Logo;
