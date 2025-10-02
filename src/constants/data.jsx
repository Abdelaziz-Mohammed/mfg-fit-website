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

export const navItems = [
  { id: 1, title: "Home", path: "/", icon: <FaHome /> },
  { id: 2, title: "About", path: "/about", icon: <FaInfoCircle /> },
  { id: 3, title: "Contact", path: "/contact", icon: <FaEnvelope /> },
];

export const socialMediaItems = [
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

export const contactItems = [
  {
    id: 1,
    type: "Address",
    value: "123 St, City, Country",
    icon: <FaMapMarkerAlt />,
  },
  { id: 2, type: "Phone", value: "+20 123 456 7890", icon: <FaPhone /> },
  { id: 3, type: "Email", value: "info@mfgfit.com", icon: <FaEnvelope /> },
];
