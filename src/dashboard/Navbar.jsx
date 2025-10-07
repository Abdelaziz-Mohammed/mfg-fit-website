import { useTranslation } from "react-i18next";
import { FaRegUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const languages = [
  {
    code: "en",
    name: "En",
    alt: "English",
  },
  {
    code: "ar",
    name: "Ar",
    alt: "Arabic",
  },
];

function Navbar() {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();

  return (
    <div className="h-[50px] w-full border-b border-b-neutral-300">
      <div className="px-4 sm:px-6 flex items-center justify-between h-full">
        <h1 className="text-lg font-semibold text-primary capitalize">{pathname.split("/")[2] || "Dashboard"}</h1>
        <div className="flex items-center gap-2">
          <div className="flex gap-0 border border-neutral-300 text-white rounded-md overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => i18n.changeLanguage(lang.code)}
                className={`flex items-center justify-center py-1 px-3 sm:px-4 cursor-pointer hoverEffect ${
                  i18n.resolvedLanguage === lang.code ? "bg-primary text-white" : "text-neutral-600"
                } text-sm font-medium text-black not-last:border-r border-neutral-300`}
              >
                {lang.name}
              </button>
            ))}
          </div>
          <button className="py-1 px-3 border border-neutral-300 rounded-md hover:bg-neutral-200 hoverEffect">
            <FaRegUser className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
