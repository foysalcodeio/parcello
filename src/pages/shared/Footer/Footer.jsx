import React from 'react';
import { motion } from 'framer-motion';
import ProfastLogo from '../ProfastLogo/ProfastLogo';
import { FaLinkedin, FaXTwitter, FaFacebook, FaYoutube } from 'react-icons/fa6';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const Footer = () => {
  return (
    <footer className="bg-black text-white p-5 text-center border rounded-3xl">
      {/* Logo + Description */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col items-center space-y-4"
      >
        <ProfastLogo />
        <p className="max-w-xl text-gray-300 text-sm md:text-base leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
          From personal packages to business shipments — we deliver on time, every time.
        </p>
      </motion.div>

      {/* Navigation Links */}
      <motion.nav
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-10 flex flex-wrap justify-center gap-6 text-gray-300 text-sm md:text-base"
      >
        {["Services", "Coverage", "About Us", "Pricing", "Blog", "Contact"].map((item, i) => (
          <a
            key={i}
            href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
            className="relative group transition hover:text-lime-400"
          >
            {item}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </motion.nav>

      {/* Social Links */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ delay: 0.35 }}
        className="mt-10 flex justify-center gap-8 flex-wrap"
      >
        <SocialLink Icon={FaLinkedin} label="LinkedIn" />
        <SocialLink Icon={FaXTwitter} label="X" />
        <SocialLink Icon={FaFacebook} label="Facebook" />
        <SocialLink Icon={FaYoutube} label="YouTube" />
      </motion.div>

      {/* Copyright */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ delay: 0.45 }}
        className="mt-12 text-gray-500 text-xs tracking-wide"
      >
        © {new Date().getFullYear()} Profast. All rights reserved.
      </motion.div>
    </footer>
  );
};

// Small reusable component for social icons
const SocialLink = ({ Icon, label }) => (
  <a className="flex flex-col items-center space-y-1 group cursor-pointer">
    <Icon className="text-2xl group-hover:text-lime-400 transition" />
    <span className="text-xs text-gray-400 group-hover:text-white">{label}</span>
  </a>
);

export default Footer;
