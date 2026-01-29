import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <div className="grid-background" aria-hidden="true" />

      <Header />

      <main className="min-h-screen container">
        <Outlet />
      </main>

      <footer className="p-10 text-center bg-gray-800 mt-10">
        Made with 💗 by Nati
      </footer>
    </>
  );
};

export default AppLayout;
