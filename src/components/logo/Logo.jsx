import { Link } from "react-router-dom";
import { logoImg } from "./../../assets/index.js";

function Logo() {
  return (
    <Link to={"/"} className="flex items-center gap-2 rtl:flex-row-reverse">
      <img src={logoImg} alt="MFG Fit" className="w-6" />
      <h1 className="text-xl font-bold uppercase text-[#e8b420]">MFG Fit</h1>
    </Link>
  );
}

export default Logo;
