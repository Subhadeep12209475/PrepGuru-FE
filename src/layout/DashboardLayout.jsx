import DashboardNavbar from "../components/DashboardNavbar";
import DashboardSidebar from "../components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-[#0B1220] min-h-screen text-white">
      <DashboardSidebar />

      <div className="flex-1">
        <DashboardNavbar />

        <main className="pt-24 px-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
