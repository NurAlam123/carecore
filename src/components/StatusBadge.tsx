import { StatusIcon } from "@/constants";
import { cn } from "@/lib/utils";
import { Status } from "@/types";
import Image from "next/image";

interface Props {
  status: Status;
}

const StatusBadge = ({ status }: Props) => {
  return (
    <div
      className={cn("status-badge", {
        "bg-green-600": status === "scheduled",
        "bg-blue-600": status === "pending",
        "bg-red-600": status === "cancelled",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt={status}
        width={24}
        height={24}
        className="h-fit w-3 select-none"
        draggable="false"
      />
      <p
        className={cn("text-semibold-[12] capitalize", {
          "text-green-500": status === "scheduled",
          "text-blue-500": status === "pending",
          "text-red-500": status === "cancelled",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
