import { useTranslation } from "react-i18next";
import { CiGlobe } from "react-icons/ci";

function LanguageToggler() {
  const { i18n } = useTranslation();

  return (
    <button
      onClick={() => i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")}
      className="p-2 md:px-3 hover:text-primary hoverEffect flex items-center gap-2"
    >
      <CiGlobe className="text-xl" />
      {i18n.language === "ar" ? "العربية" : "English"}
    </button>
  );
}

export default LanguageToggler;
