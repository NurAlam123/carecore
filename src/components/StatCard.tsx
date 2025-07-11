import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  statType: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
}
const StatCard = ({ count = 0, icon, statType, label }: Props) => {
  return (
    <div
      className={cn(
        "stat-card",
        statType === "appointments" && "bg-appointments",
        statType === "pending" && "bg-pending",
        statType === "cancelled" && "bg-cancelled",
      )}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          alt={label}
          width={32}
          height={32}
          className="size-8 w-fit select-none"
          draggable="false"
        />
        <h2 className="text-bold-[32] text-white">{count}</h2>
      </div>
      <p className="text-regular-[14]">{label}</p>
    </div>
  );
};

export default StatCard;
