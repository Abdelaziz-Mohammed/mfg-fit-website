import { useTranslation } from "react-i18next";
import { dashboardIndexImg } from "../assets/index.js";

function DashboardIndex() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-full">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-primary">{t("dashboard.welcome")}</h2>
      <p className="text-lg text-neutral-500 text-center">{t("dashboard.slogan")}</p>
      <div className="w-full max-w-md">
        <img src={dashboardIndexImg} alt="Welcome to dashboard" className="max-w-full" />
      </div>
    </div>
  );
}

export default DashboardIndex;
