import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const BenefitCard = ({ title, image, description }) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
      }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
      className="card card-side p-6 sm:p-10 shadow-md hover:shadow-xl duration-300 rounded-xl"
    >
      <div className="card-body flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6">
        {/* Image */}
        <img src={image} alt={title} className="w-28 h-28 sm:w-32 sm:h-32 object-contain" />

        {/* Divider */}
        <div className="w-full sm:w-0 h-0 sm:h-32 border-t-2 sm:border-l-2 border-dashed border-[#03373D] my-4 sm:my-0 mx-0 sm:mx-4"></div>

        {/* Text */}
        <div className="flex-1 px-0 md:px-5">
          <h3 className="card-title text-[#03373D] text-2xl mb-2">{title}</h3>
          <p className="text-sm text-[#606060] font-bold">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BenefitCard;
