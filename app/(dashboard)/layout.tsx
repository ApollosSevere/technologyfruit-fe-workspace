import { Metadata } from "next";
import { Providers } from "../Provider";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

export const metadata: Metadata = {
  title: "TechnologyFruit",
  description: "The Apollonia Market LLC",
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <div className="h-full">
        <div className="h-[80px] md:pl-72 fixed inset-y-0 w-full z-50">
          <Navbar />
        </div>
        <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <main className="md:pl-72 pt-[80px] h-full">{children}</main>
      </div>
    </Providers>
  );
};

export default DashboardLayout;
