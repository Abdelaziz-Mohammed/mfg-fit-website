import { Bounce, toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import i18n from "./../utils/i18n";
import { useEffect } from "react";

function Dashboard() {
  const { logout } = useAuth();

  useEffect(() => {
    document.title = "Dashboard - MFG Fit";
    toast.info("Welcome to the Dashboard!", { autoClose: 2000 });
  }, []);

  return (
    <>
      <div>
        <div>
          <h1>Dashboard</h1>
          <button onClick={logout}>Logout</button>
          <button className="" onClick={() => toast.success("This is a toast message!")}>
            Toast
          </button>
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
