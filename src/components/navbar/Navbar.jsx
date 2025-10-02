import { Link, useLocation } from "react-router-dom";
import { navItems } from "./../../constants/data";
import Logo from "../logo/Logo";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import LanguageToggler from "../languageToggler/LanguageToggler";

function Navbar() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-dark-bg text-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <nav className="hidden md:block">
          <ul className="flex space-x-5">
            {navItems.map((item) => (
              <li key={item.id} className="relative group">
                <Link
                  to={item.path}
                  className={`${
                    pathname === item.path ? "text-primary" : "text-white"
                  }`}
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
        <Logo />
        <div className="flex items-center gap-0">
          <LanguageToggler />
          <button className="p-2 md:px-3 hover:text-primary hoverEffect">
            <FaCartShopping className="text-lg" />
          </button>
          <button className="p-2 md:px-3 hover:text-primary hoverEffect">
            <FaRegUser className="text-lg" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
