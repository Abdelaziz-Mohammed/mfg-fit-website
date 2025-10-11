import { useTranslation } from "react-i18next";
import { FaLightbulb, FaSeedling, FaHandsHelping, FaDumbbell, FaGlobeAmericas } from "react-icons/fa";

function About() {
  const { t } = useTranslation();

  const paragraphs = [
    { icon: <FaLightbulb className="text-yellow-500 text-2xl" />, text: t("about.paragraphs.p1") },
    { icon: <FaSeedling className="text-green-500 text-2xl" />, text: t("about.paragraphs.p2") },
    { icon: <FaHandsHelping className="text-blue-500 text-2xl" />, text: t("about.paragraphs.p3") },
    { icon: <FaDumbbell className="text-red-500 text-2xl" />, text: t("about.paragraphs.p4") },
    { icon: <FaGlobeAmericas className="text-indigo-500 text-2xl" />, text: t("about.paragraphs.p5") },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto text-gray-800 leading-relaxed text-left rtl:text-right">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-primary mb-6">{t("about.title")}</h1>
          <div className="flex flex-col gap-4 text-lg ltr:text-base sm:text-xl ltr:sm:text-lg ltr:font-montserrat ltr:tracking-wide">
            {paragraphs.map((p, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white shadow-sm hover:shadow-lg rounded-2xl p-5 border border-gray-100 hoverEffect"
              >
                <div className="flex-shrink-0 mt-1">{p.icon}</div>
                <p className="text-gray-700 leading-8 ltr:text-gray-600">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
