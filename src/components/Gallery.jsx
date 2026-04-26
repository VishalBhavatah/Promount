import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import CTAButton from '@/components/ui/CTAButton';

const images = [
  'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/61225bd6dcd94991bee1cc7fda06a003.jpg',
  'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/5d2db477d23184ecb2d1bf5045f917a7.jpg',
  'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/e150ba60ea0cd36bde53204ebacdd197.jpg',
  'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/67fd15405bb7e3cae299ba76f5b2e21a.jpg',
  'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/9229708a208413ab762b0db1a40294a5.jpg',
  'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/fd2ec61198e59f29108d6cf320261f1f.jpg',
  'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/ad07e663073a2f2668fdbb5057c6544f.jpg',
  'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/f6aae5579e193432b636ca7b0d3c3fe4.jpg',
  'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/b93d2b64bd37215140c524c39143c472.jpg',
  'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/cf19197ffe6405111e975523ff136495.jpg',
  'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/1612535e91c95ab7a4f574a6c8b4ede0.jpg',
  'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/82c39aac3659b795fecc375a6aba7ade.jpg'
];

const Gallery = ({ onOpenBooking }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="gallery" className="py-8 bg-gradient-to-b from-navy-900 to-navy-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-orange-500">Work Gallery</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            See the quality and precision of our professional installations
          </p>
        </motion.div>

        <div className="relative mb-12">
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-orange-500 text-white p-2 rounded-full transition-all duration-200 -translate-x-3"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                className="relative flex-shrink-0 w-72 h-72 rounded-xl overflow-hidden shadow-xl group cursor-pointer bg-navy-800"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Installation ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-orange-500 text-white p-2 rounded-full transition-all duration-200 translate-x-3"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-2xl text-white font-semibold mb-6">Like what you see?</p>
          <CTAButton size="lg" onClick={onOpenBooking}>Book Now</CTAButton>
        </motion.div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-6 right-6 text-white hover:text-orange-500 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-10 h-10" />
              </button>
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;