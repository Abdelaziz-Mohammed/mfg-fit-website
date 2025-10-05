import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";
import WhatsAppButton from "./components/whatsAppButton/WhatsAppButton";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === "ar") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, [i18n.language]);

  return (
    <>
      <Navbar />
      <div className="mt-[72px]">
        <Outlet />
      </div>
      <Footer />
      <WhatsAppButton />
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

export default App;
