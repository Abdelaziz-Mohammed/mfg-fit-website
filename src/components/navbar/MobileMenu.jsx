import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Logo from "./../logo/Logo";
import { IoCloseSharp } from "react-icons/io5";
import { FaEnvelope, FaHome, FaInfoCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

function MobileMenu({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const mobileMenuRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname, setIsMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsMobileMenuOpen]);

  const { t } = useTranslation();

  const navItems = [
    { id: 1, title: t("header.navItems.home"), path: "/", icon: <FaHome /> },
    { id: 2, title: t("header.navItems.shop"), path: "/shop", icon: <FaCartShopping /> },
    { id: 3, title: t("header.navItems.about"), path: "/about", icon: <FaInfoCircle /> },
    { id: 4, title: t("header.navItems.contact"), path: "/contact", icon: <FaEnvelope /> },
  ];

  return (
    <div
      className={`md:hidden fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/40 shadow-xl
          ${
            isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full rtl:translate-x-full opacity-0"
          } hoverEffect`}
    >
      <div ref={mobileMenuRef} className="w-60 h-screen bg-black/85 px-6 py-10">
        <div className="flex items-center justify-between">
          <Logo />
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <IoCloseSharp className="text-2xl text-white hover:text-primary hoverEffect" />
          </button>
        </div>
        <ul className="space-y-2 mt-10">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`w-full hover:bg-neutral-700 hoverEffect group ps-2
                ${pathname === item.path ? "bg-neutral-700 text-primary" : ""}`}
            >
              <a
                href={item.path}
                className="flex items-center gap-2 py-2 hover:text-primary group-hover:translate-x-3 rtl:group-hover:-translate-x-3 hoverEffect"
              >
                {item.icon}
                <span className="text-sm">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MobileMenu;
