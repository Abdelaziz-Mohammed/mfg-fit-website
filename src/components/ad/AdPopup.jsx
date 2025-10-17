import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AdPopup = () => {
  const [showAd, setShowAd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowAd(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowAd(false);
  };

  const handleAdClick = () => {
    setShowAd(false);
    navigate("/offer");
  };

  return (
    <AnimatePresence>
      {showAd && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-lg text-center cursor-pointer"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={handleAdClick}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-semibold mb-4">Special Offer!</h2>
            <p className="text-gray-600 mb-4">Click below to grab your exclusive discount now.</p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handleAdClick();
              }}
            >
              View Offer
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdPopup;
