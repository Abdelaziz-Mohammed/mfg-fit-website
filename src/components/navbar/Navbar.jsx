import { Link, useLocation } from "react-router-dom";
import Logo from "../logo/Logo";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { FaEnvelope, FaHome, FaInfoCircle } from "react-icons/fa";
import LanguageToggler from "../languageToggler/LanguageToggler";

const navItems = [
  { id: 1, title: "Home", path: "/", icon: <FaHome /> },
  { id: 2, title: "Shop", path: "/shop", icon: <FaCartShopping /> },
  { id: 3, title: "About", path: "/about", icon: <FaInfoCircle /> },
  { id: 4, title: "Contact", path: "/contact", icon: <FaEnvelope /> },
];

function Navbar() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-dark-bg text-white shadow-md py-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <nav className="hidden md:block">
          <ul className="flex space-x-5">
            {navItems.map((item) => (
              <li key={item.id} className="relative group">
                <Link
                  to={item.path}
                  className={`${pathname === item.path ? "text-primary" : "text-white"}`}
                >
                  {item.title}
                </Link>
                <span
                  className={`absolute left-0 bottom-0 w-0 h-[0.2px] group-hover:w-full hoverEffect
                  ${pathname === item.path ? "bg-primary w-full" : "bg-white"}`}
                ></span>
              </li>
            ))}
          </ul>
        </nav>
        <button onClick={() => setIsMobileMenuOpen((i) => !i)}>
          {isMobileMenuOpen ? (
            <IoCloseSharp className="text-2xl md:hidden" />
          ) : (
            <AiOutlineMenu className="text-2xl md:hidden" />
          )}
        </button>
        <div className="md:hidden">
          <MobileMenu
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Logo />
        </div>
        <div className="flex items-center gap-0">
          <LanguageToggler />
          <button className="p-2 md:px-3 hover:text-primary hoverEffect relative">
            <FaCartShopping className="text-2xl" />
            <span
              className="absolute top-0 right-0 bg-primary text-white text-xs 
              rounded-full w-4 h-4 flex items-center justify-center"
            >
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
