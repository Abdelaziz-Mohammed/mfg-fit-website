import { Link } from "react-router-dom";
import Logo from "./../logo/Logo";
import {
  FaEnvelope,
  FaFacebook,
  FaHome,
  FaInfoCircle,
  FaInstagram,
  FaPhone,
  FaTwitter,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  const socialMediaItems = [
    { id: 1, title: t("footer.socialMedia.facebook"), link: "https://www.facebook.com", icon: <FaFacebook /> },
    { id: 2, title: t("footer.socialMedia.instagram"), link: "https://www.instagram.com", icon: <FaInstagram /> },
    { id: 3, title: t("footer.socialMedia.twitter"), link: "https://www.twitter.com", icon: <FaTwitter /> },
  ];

  const navItems = [
    { id: 1, title: t("header.navItems.home"), path: "/", icon: <FaHome /> },
    { id: 2, title: t("header.navItems.shop"), path: "/shop", icon: <FaCartShopping /> },
    { id: 3, title: t("header.navItems.about"), path: "/about", icon: <FaInfoCircle /> },
    { id: 4, title: t("header.navItems.contact"), path: "/contact", icon: <FaEnvelope /> },
  ];

  const contactItems = [
    {
      id: 1,
      type: t("footer.contactUs.address.type"),
      value: t("footer.contactUs.address.value"),
      icon: <FaMapMarkerAlt />,
    },
    { id: 2, type: t("footer.contactUs.phone.type"), value: t("footer.contactUs.phone.value"), icon: <FaPhone /> },
    { id: 3, type: t("footer.contactUs.email.type"), value: t("footer.contactUs.email.value"), icon: <FaEnvelope /> },
  ];

  return (
    <footer className="bg-dark-bg text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-8">
          <div className="space-y-4">
            <div className="rtl:me-auto w-fit">
              <Logo />
            </div>
            <ul className="space-y-1">
              {socialMediaItems.map((item) => (
                <li key={item.id} className="w-full hover:bg-neutral-700 hoverEffect group">
                  <a
                    href={item.link}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex items-center gap-2 py-2 hover:text-primary group-hover:translate-x-3 rtl:group-hover:-translate-x-3 hoverEffect"
                  >
                    {item.icon}
                    <span className="text-sm">{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footer.quickLinks.title")}</h3>
            <ul>
              {navItems.map((item) => (
                <li key={item.id} className="w-full hover:bg-neutral-700 hoverEffect group">
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
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footer.contactUs.title")}</h3>
            <ul>
              {contactItems.map((item) => (
                <li key={item.id} className="w-full hover:bg-neutral-700 hoverEffect group">
                  <div className="flex items-center gap-2 py-2 hover:text-primary group-hover:translate-x-3 rtl:group-hover:-translate-x-3 hoverEffect cursor-pointer">
                    {item.icon}
                    <span className="text-white text-sm">{item.type}:</span>{" "}
                    <span className="text-gray-400 text-[13px] tracking-wide">{item.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-center text-sm text-gray-400 pt-8 mt-8 border-t border-t-neutral-700 tracking-wider">
          &copy; 2025{" "}
          <Link to={"/"} className="font-semibold text-primary">
            MFG Fit
          </Link>{" "}
          {t("footer.copyright.text")}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
