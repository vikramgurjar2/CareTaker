import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-gray-900 overflow-y-auto">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
