
import BenefitCard from "./BenefitCard";
import tracking from "../../assets/benefits/tracking.png";
import call from "../../assets/benefits/call.png";
import support from "../../assets/benefits/support.png";

const benefits = [
  {
    id: 1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: tracking,
  },
  {
    id: 2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: call,
  },
  {
    id: 3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: support,
  },
];

const Benefits = () => {
  return (
    <section className="bg-white">
      <div className="h-0 sm:w-full border-t-2 sm:border-l-2 border-dashed border-[#03373D] my-4 sm:mx-0 sm:my-4"></div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        
        <h2 className="text-3xl font-bold text-center mb-12 text-[#03373D]">
          Why Choose Us
        </h2>

        {/* Benefit Cards */}
        <div className="flex flex-col gap-6">
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.id} {...benefit} />
          ))}
        </div>
      </div>

      <div className="h-0 sm:w-full border-t-2 sm:border-l-2 border-dashed border-[#03373D] my-4 sm:mx-0 sm:my-4"></div>

    </section>
  );
};

export default Benefits;


