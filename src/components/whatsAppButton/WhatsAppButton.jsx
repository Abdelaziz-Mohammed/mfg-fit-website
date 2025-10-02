import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hello, I would like to get in touch with you."
    );
    const phoneNumber = "+201016965619";
    window.open(
      `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`,
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="w-10 h-10 flex items-center justify-center rounded-full text-black bg-primary/90 shadow-2xl 
          hover:bg-primary hover:scale-110 hoverEffect"
        onClick={handleWhatsAppClick}
      >
        <FaWhatsapp className="text-2xl" />
      </button>
    </div>
  );
}

export default WhatsAppButton;
