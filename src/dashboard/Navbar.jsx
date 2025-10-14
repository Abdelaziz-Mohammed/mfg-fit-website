import { FaRegUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import LanguageToggler from "../components/languageToggler/LanguageToggler";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <div className="h-[50px] w-full border-b border-b-neutral-300">
      <div className="px-4 sm:px-6 flex items-center justify-between h-full">
        <h1 className="text-lg font-semibold text-primary capitalize">
          {t(`dashboard.navItems.${pathname.split("/")[2] || "dashboard"}`)}
        </h1>
        <div className="flex items-center gap-2">
          <LanguageToggler />
          <button className="py-1 px-3 border border-neutral-300 rounded-md hover:bg-neutral-200 hoverEffect">
            <FaRegUser className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
