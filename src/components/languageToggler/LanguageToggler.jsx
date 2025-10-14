import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CiGlobe } from "react-icons/ci";
import { useAdmin } from "../../context/AdminContext";

function LanguageToggler() {
  const { i18n } = useTranslation();
  const { setLang } = useAdmin();

  useEffect(() => {
    if (i18n.language === "ar") {
      document.body.dir = "rtl";
      setLang("ar");
    } else {
      document.body.dir = "ltr";
      setLang("en");
    }
  }, [i18n.language]);

  return (
    <button
      onClick={() => i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")}
      className="p-2 md:px-3 hover:text-primary hoverEffect flex items-center gap-2"
    >
      {i18n.language === "ar" ? "English" : "العربية"}
      <CiGlobe className="text-xl" />
    </button>
  );
}

export default LanguageToggler;
