import { motion, useScroll } from "framer-motion";
import Banner from "./Banner";
import BeMarchent from "./BeMarchent";
import Benefits from "./Benefits";
import ClientSlider from "./ClientSlider";
import Services from "./Services";

const Home = () => {
    const { scrollYProgress } = useScroll();

    return (
        <div>

            {/* Scroll Progress Bar */}
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 7,
                    originX: 0,
                    backgroundColor: "#34eba8",
                    zIndex: 9999,
                }}
            />

            {/* Page Content */}
            <article>
                <Banner />
                <Services />
                <ClientSlider />
                <Benefits />
                <BeMarchent />
            </article>

        </div>
    );
};

export default Home;
