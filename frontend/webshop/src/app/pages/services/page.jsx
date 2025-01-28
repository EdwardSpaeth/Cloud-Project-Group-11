"use client";
import { motion } from 'framer-motion';
import styles from './services.css';

export default function Services() {
  return (
    <div className="min-h-screen bg-w">
      <div className="max-w-screen-2xl mx-auto">
        {/* Hero Section */}
        <div className="relative h-[40vh] mb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
            <div className="flex flex-col justify-center h-full px-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-5xl font-light text-white mb-4">Our Services</h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <p className="text-gray-200 text-lg max-w-xl">
                  Explore the range of services we offer to help you create the perfect space.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Custom Furniture Design", description: "Our team of skilled designers will work with you to create custom furniture pieces that perfectly fit your space and style." },
              { title: "Interior Design Consultation", description: "Our interior design experts provide personalized consultations to help you create a cohesive and stylish look for your home or office." },
              { title: "Delivery and Installation", description: "We offer convenient delivery and professional installation services to ensure your new furniture is set up perfectly in your space." },
              { title: "Eco-Friendly Solutions", description: "We are committed to sustainability and offer eco-friendly furniture options made from recycled and sustainable materials." },
              { title: "Furniture Restoration", description: "We breathe new life into your old furniture, restoring it to its former glory with expert craftsmanship." },
              { title: "Space Planning", description: "Our space planning services help you make the most of your available space, ensuring a functional and aesthetically pleasing layout." }
            ].map((service, index) => (
              <div key={index} className="service-item bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <div className="service-item-inner">
                  <div className="service-item-front flex items-center justify-center h-full">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <div className="service-item-back flex items-center justify-center h-full">
                    <p>{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}