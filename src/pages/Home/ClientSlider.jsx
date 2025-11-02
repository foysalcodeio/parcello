import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const ClientSlider = () => {

    const controls = useAnimation();
    const [duration, setDuration] = useState(10);

    const logos = [
        "src/assets/brands/amazon_vector.png",
        "src/assets/brands/amazon.png",
        "src/assets/brands/casio.png",
        "src/assets/brands/moonstar.png",
        "src/assets/brands/randstad.png",
        "src/assets/brands/start-people 1.png",
        "src/assets/brands/start.png",
    ];

    // Adjust speed based on screen size
    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth < 640){
                setDuration(15);
            }
            else if(window.innerWidth < 1024){
                setDuration(12);
            }else{
                setDuration(10);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Animation settings
    const slideAction = {
        animate: {
            x: ["0%", "-50%"],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 10, // Increase for slower motion
                    ease: "linear",
                },
            },
        },
    };

    useEffect(() => {
        controls.start("animate");
    }, [controls, duration]);

    return (
        <section className="relative py-16 bg-linear-to-r from-gray-50 via-blue-50 to-gray-100 overflow-hidden">

            <div className="text-3xl md:text-4xl font-bold text-center mb-5 mt-2 text-[#03373D]">
                <h2>We've helped thousands of sales teams</h2>
            </div>

            <div
                onMouseEnter={() => controls.stop()}
                onMouseLeave={() => controls.start("animate")}
                className="relative w-full overflow-hidden py-10 bg-gray-50">
                <motion.div
                    className="flex space-x-16 items-center"
                    variants={slideAction}
                    animate={controls}
                >
                    {/* Duplicate logos for infinite loop */}
                    {[...logos, ...logos].map((logo, idx) => (
                        <div
                            key={idx}
                            className="shrink-0 w-40 h-20 flex justify-center items-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <img
                                src={logo}
                                alt={`Client Logo ${idx}`}
                                className="object-contain w-28 h-14 grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>


        </section>
    );
};

export default ClientSlider;
