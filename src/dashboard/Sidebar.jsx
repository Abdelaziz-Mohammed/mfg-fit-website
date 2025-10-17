import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  MdOutlineCategory,
  MdOutlineDashboard,
  MdOutlineLocalOffer,
  MdOutlineLocationOn,
  MdOutlineProductionQuantityLimits,
  MdOutlineCampaign,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";

function Sidebar() {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 768);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navItems = [
    { id: 1, name: t("dashboard.navItems.dashboard"), path: "/dashboard", icon: <MdOutlineDashboard /> },
    {
      id: 2,
      name: t("dashboard.navItems.products"),
      path: "/dashboard/products",
      icon: <MdOutlineProductionQuantityLimits />,
    },
    { id: 3, name: t("dashboard.navItems.categories"), path: "/dashboard/categories", icon: <MdOutlineCategory /> },
    { id: 4, name: t("dashboard.navItems.coupons"), path: "/dashboard/coupons", icon: <MdOutlineLocalOffer /> },
    { id: 5, name: t("dashboard.navItems.orders"), path: "/dashboard/orders", icon: <MdOutlineShoppingCart /> },
    { id: 6, name: t("dashboard.navItems.provinces"), path: "/dashboard/provinces", icon: <MdOutlineLocationOn /> },
    { id: 7, name: t("dashboard.navItems.ads"), path: "/dashboard/ads", icon: <MdOutlineCampaign /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`w-60 h-screen bg-secondary px-3 py-12 border-r rtl:border-l border-gray-300 ${
        isOpen ? "" : "w-fit"
      } hoverEffect`}
    >
      <div className={`space-y-10 ${isOpen ? "" : "w-fit"}`}>
        <div className="flex items-center justify-between text-black">
          {isOpen && (
            <Link to={"/"} className="text-xl font-semibold text-primary">
              MFG FIT
            </Link>
          )}
          <button
            onClick={() => setIsOpen((i) => !i)}
            className="text-2xl p-1 border border-neutral-300 rounded-md hover:bg-neutral-200 hoverEffect"
          >
            {isOpen ? <IoIosArrowBack className="rtl:rotate-180" /> : <IoIosArrowForward className="rtl:rotate-180" />}
          </button>
        </div>
        {/* nav items */}
        <ul className="flex flex-col gap-5 text-neutral-700 font-medium text-base">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-primary hover:text-white ${
                pathname === item.path ? "bg-primary text-white" : ""
              } cursor-pointer transition-all duration-200 ease-in-out ${isOpen ? "" : "justify-center w-fit"} `}
              onClick={() => navigate(item.path)}
            >
              <span>{item.icon}</span>
              {isOpen && <span>{item.name}</span>}
            </li>
          ))}
        </ul>
        {/* logout */}
        <button
          onClick={logout}
          className={`flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-red-600 hover:text-white 
        text-red-600 border border-red-600 hoverEffect transition-all duration-200 ease-in-out ${
          isOpen ? "w-full" : "justify-center w-fit"
        }`}
        >
          <CiLogout className="text-lg" />
          {isOpen && <span>{t("general.logout")}</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
