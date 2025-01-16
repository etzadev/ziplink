import { Outlet } from "react-router-dom";
import { Header } from "./../components/header";

export const AppLayout = () => {
  return (
    <>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>

      <div className="p-10 text-center bg-gray-800 mt-10">
        &copy; 2025 Todos los derechos reservados por{" "}
        <a
          href="https://www.johangarcia.dev/"
          target="_blank"
          className="text-cyan-400"
        >
          @etzadev
        </a>
      </div>
    </>
  );
};
