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

const navItems = [
  { id: 1, title: "Home", path: "/", icon: <FaHome /> },
  { id: 2, title: "Shop", path: "/shop", icon: <FaCartShopping /> },
  { id: 3, title: "About", path: "/about", icon: <FaInfoCircle /> },
  { id: 4, title: "Contact", path: "/contact", icon: <FaEnvelope /> },
];

const socialMediaItems = [
  {
    id: 1,
    title: "Facebook",
    link: "https://www.facebook.com",
    icon: <FaFacebook />,
  },
  {
    id: 2,
    title: "Instagram",
    link: "https://www.instagram.com",
    icon: <FaInstagram />,
  },
  {
    id: 3,
    title: "Twitter",
    link: "https://www.twitter.com",
    icon: <FaTwitter />,
  },
];

const contactItems = [
  {
    id: 1,
    type: "Address",
    value: "123 St, City, Country",
    icon: <FaMapMarkerAlt />,
  },
  { id: 2, type: "Phone", value: "+20 123 456 7890", icon: <FaPhone /> },
  { id: 3, type: "Email", value: "info@mfgfit.com", icon: <FaEnvelope /> },
];

function Footer() {
  return (
    <footer className="bg-dark-bg text-white py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-8">
          <div className="space-y-4">
            <Logo />
            <ul className="space-y-1">
              {socialMediaItems.map((item) => (
                <li key={item.id} className="w-full hover:bg-neutral-700 hoverEffect group">
                  <a
                    href={item.link}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex items-center gap-2 py-2 hover:text-primary group-hover:translate-x-3 hoverEffect"
                  >
                    {item.icon}
                    <span className="text-sm">{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul>
              {navItems.map((item) => (
                <li key={item.id} className="w-full hover:bg-neutral-700 hoverEffect group">
                  <a
                    href={item.path}
                    className="flex items-center gap-2 py-2 hover:text-primary group-hover:translate-x-3 hoverEffect"
                  >
                    {item.icon}
                    <span className="text-sm">{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul>
              {contactItems.map((item) => (
                <li key={item.id} className="w-full hover:bg-neutral-700 hoverEffect group">
                  <div className="flex items-center gap-2 py-2 hover:text-primary group-hover:translate-x-3 hoverEffect cursor-pointer">
                    {item.icon}
                    <span className="text-white text-sm">{item.type}:</span>{" "}
                    <span className="text-gray-400 text-[13px] tracking-wide">{item.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-center text-sm text-gray-400 pt-8 mt-8 border-t border-t-neutral-700">
          &copy; 2025{" "}
          <Link to={"/"} className="font-semibold text-primary">
            MFG Fit
          </Link>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
