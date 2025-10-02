import { Link } from "react-router-dom";
import { logoImg } from "./../../assets/index.js";

function Logo() {
  return (
    <Link to={"/"} className="flex items-center gap-2">
      <img src={logoImg} alt="MFG Fit" className="w-6" />
      <h1 className="text-xl font-bold uppercase hover:text-primary hoverEffect">
        MFG Fit
      </h1>
    </Link>
  );
}

export default Logo;
