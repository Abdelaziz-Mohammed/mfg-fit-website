import { useTranslation } from "react-i18next";
import { bannerImg } from "../../assets/index.js";

function Banner() {
  const { t } = useTranslation();

  return (
    <div
      className="w-full h-[calc(100vh-72px)] bg-cover bg-center"
      style={{
        backgroundImage: `url(${bannerImg})`,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "darken",
      }}
    >
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-10 h-full">
        <h1 className="text-primary/90 text-2xl sm:text-3xl font-bold text-center">{t("banner.welcome")}</h1>
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center flex flex-col gap-2">
          <span>{t("banner.slogan.line1")}</span>
          <span>{t("banner.slogan.line2")}</span>
        </h2>
        <div className="flex flex-col min-[440px]:flex-row gap-4">
          <button
            className="bg-white text-sm sm:text-base text-black py-2 px-4 uppercase relative after:absolute after:bottom-0 after:left-0 after:right-0
            after:content-[''] after:w-full after:h-0 after:bg-black/10 hover:after:h-full after:transition-all after:duration-300 hoverEffect"
          >
            {t("banner.buttons.discoverClothing")}
          </button>
          <button
            className="bg-white text-sm sm:text-base text-black py-2 px-4 uppercase relative after:absolute after:bottom-0 after:left-0 after:right-0
            after:content-[''] after:w-full after:h-0 after:bg-black/10 hover:after:h-full after:transition-all after:duration-300 hoverEffect"
          >
            {t("banner.buttons.discoverEquipment")}
          </button>
          <button
            className="bg-white text-sm sm:text-base text-black py-2 px-4 uppercase relative after:absolute after:bottom-0 after:left-0 after:right-0
            after:content-[''] after:w-full after:h-0 after:bg-black/10 hover:after:h-full after:transition-all after:duration-300 hoverEffect"
          >
            {t("banner.buttons.customOrder")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
