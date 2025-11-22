import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import testimonials from "../../../src/assets/json/testimonials.json";
import reviewQuetes from "../../../src/assets/reviewQuote.png";
import customerTop from "../../../src/assets/customer-top.png";


const Testimonial = () => {
    const [current, setCurrent] = useState(0);

    const data = testimonials;

    const next = () => {
        setCurrent((prev) => (prev + 1) % data.length);
    }
    const prev = () => {
        setCurrent((prev) => (prev - 1 + data.length) % data.length);
    }

    // ✅ Auto-loop slider every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 3000); // 3 seconds

        return () => clearInterval(interval);
    }, [data.length]);

    return (
        <div>
            <section className="py-10 bg-linear-to-r from-gray-50 via-blue-50 to-gray-100 ">
                <div className="text-3xl md:text-4xl text-center mb-5 mt-2 text-[#03373D] flex flex-col items-center gap-4">
                    <img className="max-w-5xl" src={customerTop} alt="" />
                    <h2 className="font-bold">What our customers are sayings</h2>
                    <p className="text-xl md:text-xl mt-3 md:mt-2">Enhance posture, mobility, and well-being effortlessly with Posture Pro. <br /> Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
                </div>
            </section>

            <div className="w-full flex flex-col items-center py-2 bg-base-200">
                {/* Carousel Section */}
                <div className="relative flex items-center justify-center w-full max-w-5xl h-80 overflow-hidden">
                    {data.map((item, index) => {
                        const isActive = index === current;
                        const offset = (index - current) * 300;

                        return (
                            <motion.div
                                key={index}
                                className="absolute w-[400px]"
                                animate={{
                                    x: offset,
                                    scale: isActive ? 1.15 : 0.8,
                                    opacity: isActive ? 1 : 0.3,
                                    zIndex: isActive ? 50 : 10,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 150,
                                    damping: 20,
                                }}
                            >
                                <div className="card bg-base-100 shadow-xl p-7 rounded-2xl">
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                         <img src={reviewQuetes} className="" alt="" />
                                        {item.text}
                                    </p>

                                    {/* Short dashed line */}
                                    <div className="border-t border-dashed border-[#00545A] my-1"></div>

                                    <div className="flex items-center gap-4 mt-4">
                                        <img
                                            src={item.image}
                                            className="w-12 h-12 rounded-full"
                                            alt={item.name}
                                        />
                                        <div>
                                            <h3 className="font-bold text-lg">{item.name}</h3>
                                            <p className="text-sm opacity-60">{item.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Dots Indicator */}
                <div className="flex items-center gap-2 mt-6">
                    {data.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-3 h-3 rounded-full transition-all ${idx === current ? "bg-lime-400" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 mt-4">
                    <button className="btn btn-circle" onClick={prev}>
                        ❮
                    </button>
                    <button className="btn btn-circle" onClick={next}>
                        ❯
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
