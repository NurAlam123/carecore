import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children }: Props) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={cn("cursor-pointer", className ?? "shad-primary-btn w-full")}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="Loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
