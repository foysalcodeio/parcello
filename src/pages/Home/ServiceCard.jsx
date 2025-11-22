
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const BenefitCard = ({ benefit }) => {
  const { image, title, description } = benefit;

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
      className="card card-side  border shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl"
    >
      {/* Left Image */}
      <figure className="w-32 md:w-40 p-6 flex justify-center items-center">
        <img src={image} alt={title} className="object-contain w-full h-full" />
      </figure>

      {/* Divider */}
      <div className="divider divider-horizontal hidden md:flex my-auto"></div>

      {/* Right Content */}
      <div className="card-body justify-center p-32">
        <h3 className="text-lg md:text-xl font-semibold text-primary">
          {title}
        </h3>
        <p className="text-sm md:text-base text-base-content/70 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default BenefitCard;
