import Logo from "@/assets/logo";
import StatCard from "@/components/StatCard";
import Link from "next/link";

const AdminPage = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Logo />
        </Link>

        <p className="text-semibold-[16]">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            statType="appointments"
            count={5}
            label="Scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            statType="pending"
            count={5}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            statType="cancelled"
            count={5}
            label="Canelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
