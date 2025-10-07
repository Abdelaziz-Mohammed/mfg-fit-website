import { Bounce, toast, ToastContainer } from "react-toastify";
import i18n from "./../utils/i18n";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard - MFG Fit";
  }, []);

  return (
    <>
      <div className="flex min-h-screen max-h-screen">
        <div>
          <Sidebar />
        </div>
        <div className="flex flex-col gap-0 flex-1">
          <Navbar />
          <div className="overflow-y-auto h-[calc(100vh-50px)] mx-2 my-3 p-2 border border-neutral-200 rounded-md">
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer
        position={`${i18n.language === "ar" ? "top-left" : "top-right"}`}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={`${i18n.language === "ar" ? "true" : "false"}`}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default Dashboard;
