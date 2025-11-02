
import { motion } from 'framer-motion';
import { FaShippingFast, FaMapMarkedAlt, FaBoxes, FaHandHoldingUsd, FaWarehouse, FaUndoAlt } from 'react-icons/fa';

// Service Data
const servicesData = [
  {
    icon: FaShippingFast,
    title: "Express & Standard Delivery",
    description: "We deliver parcels within 24–72 hours in major cities. Express delivery available in Dhaka within 4–6 hours.",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Nationwide Delivery",
    description: "We deliver parcels nationwide with home delivery in every district, ensuring timely arrival.",
  },
  {
    icon: FaBoxes,
    title: "Fulfillment Solution",
    description: "Customized services with inventory management, online order processing, packaging, and after-sales support.",
  },
  {
    icon: FaHandHoldingUsd,
    title: "Cash on Delivery",
    description: "100% cash on delivery anywhere in Bangladesh with guaranteed product safety.",
  },
  {
    icon: FaWarehouse,
    title: "Corporate Services",
    description: "Customized corporate services including warehouse and inventory management.",
  },
  {
    icon: FaUndoAlt,
    title: "Parcel Return",
    description: "Through reverse logistics, customers can return or exchange products hassle-free.",
  },
];

// Motion Variants
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const hoverCard = {
  hover: { scale: 1.08, y: -10, boxShadow: '0 30px 50px rgba(0,0,0,0.15)' },
};

const iconPulse = {
  hover: {
    scale: [1, 1.3, 1],
    rotate: [0, 10, -10, 0],
    transition: { duration: 0.8, repeat: 0 },
  },
  float: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

const underline = {
  hidden: { width: 0 },
  show: { width: '100%', transition: { duration: 0.4 } },
};

const wordFade = {
  hidden: { opacity: 0, y: 10 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5 },
  }),
};

const Services = () => (
  <section className="relative py-24 px-4 md:px-10 overflow-hidden">
    {/* Background layers */}
    <div className="absolute inset-0 bg-linear-to-b from-gray-50 via-blue-50 to-gray-100"></div>
    <div className="absolute inset-0 bg-blue-50 opacity-40"></div>

    {/* Content */}
    <div className="relative z-10">
      {/* Header */}
      <motion.div
        variants={fadeUp} 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-teal-400 to-yellow-200"
        >
          Our Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-600 mt-6 max-w-3xl mx-auto text-lg"
        >
          {`Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.`.split(' ').map((word, i) => (
            <motion.span key={i} custom={i} variants={wordFade} initial="hidden" animate="show" className="inline-block mr-1">
              {word}
            </motion.span>
          ))}
        </motion.p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {servicesData.map((service, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}           // entrance animation
            whileHover={hoverCard.hover} // hover animation
            className="relative rounded-3xl bg-white p-8 shadow-lg cursor-pointer transition-all duration-300"
          >
            {/* Icon with float */}
            <motion.div
              variants={iconPulse}
              initial="float"
              whileHover="hover"
              className="text-5xl text-emerald-200 mb-5"
            >
              <service.icon />
            </motion.div>

            {/* Title with animated underline */}
            <h3 className="text-xl font-semibold mb-2 relative inline-block">
              {service.title}
              <motion.span
                className="absolute left-0 bottom-0 h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded"
                variants={underline}
                initial="hidden"
                whileHover="show"
              ></motion.span>
            </h3>

            {/* Description with word fade */}
            <p className="text-gray-600">
              {service.description.split(' ').map((word, i) => (
                <motion.span key={i} custom={i} variants={wordFade} initial="hidden" whileInView="show" className="inline-block mr-1">
                  {word}
                </motion.span>
              ))}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Services;
