
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/ui/CTAButton';

const customNavLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'Services', href: '/services' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

const GalleryPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const images = [
    { url: 'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/61225bd6dcd94991bee1cc7fda06a003.jpg', title: 'Bedroom Corner TV Setup', category: 'bedroom' },
    { url: 'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/5d2db477d23184ecb2d1bf5045f917a7.jpg', title: 'Dark Media Console with Fireplace', category: 'living-room' },
    { url: 'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/e150ba60ea0cd36bde53204ebacdd197.jpg', title: 'Game Room Arcade Setup', category: 'game-room' },
    { url: 'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/67fd15405bb7e3cae299ba76f5b2e21a.jpg', title: 'Living Room with Bookshelves', category: 'living-room' },
    { url: 'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/9229708a208413ab762b0db1a40294a5.jpg', title: 'Living Room Fireplace Mount', category: 'living-room' },
    { url: 'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/fd2ec61198e59f29108d6cf320261f1f.jpg', title: 'Apple TV Interface Setup', category: 'living-room' },
    { url: 'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/ad07e663073a2f2668fdbb5057c6544f.jpg', title: 'TCL Roku Streaming Setup', category: 'living-room' },
    { url: 'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/f6aae5579e193432b636ca7b0d3c3fe4.jpg', title: 'Vizio on Brick Fireplace', category: 'living-room' },
    { url: 'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/b93d2b64bd37215140c524c39143c472.jpg', title: 'White Brick Fireplace Setup', category: 'living-room' },
    { url: 'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/cf19197ffe6405111e975523ff136495.jpg', title: 'White Dresser with Soundbar', category: 'bedroom' },
    { url: 'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/1612535e91c95ab7a4f574a6c8b4ede0.jpg', title: 'White Fireplace with Neon', category: 'living-room' },
    { url: 'https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/82c39aac3659b795fecc375a6aba7ade.jpg', title: 'Wooden Media Console', category: 'living-room' }
  ];

  const categories = [
    { id: 'all', label: 'All Installations' },
    { id: 'living-room', label: 'Living Room' },
    { id: 'bedroom', label: 'Bedroom' },
    { id: 'game-room', label: 'Game Room' }
  ];

  const filteredImages = activeFilter === 'all' 
    ? images 
    : images.filter(img => img.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Installation Gallery - Pro Mount USA</title>
        <meta name="description" content="View our professional TV mounting and installation work across the Dallas-Fort Worth area." />
      </Helmet>

      <div className="min-h-screen bg-navy-950">
        <Header navLinks={customNavLinks} />

        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="py-16 bg-gradient-to-b from-navy-900 to-navy-800 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-4xl mx-auto"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Our <span className="text-orange-500">Work Gallery</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/80 mb-8">
                  See the quality and precision of our professional installations
                </p>
              </motion.div>
            </div>
          </section>

          {/* Filters */}
          <section className="py-8 bg-navy-900">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Filter className="w-5 h-5 text-orange-500" />
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      activeFilter === category.id
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Gallery Grid */}
          <section className="py-16 bg-navy-900">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="wait">
                  {filteredImages.map((image, index) => (
                    <motion.div
                      key={image.url}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.03 }}
                      className="relative aspect-square rounded-xl overflow-hidden shadow-xl group cursor-pointer bg-navy-800"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full mb-3">
                          <ZoomIn className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-bold text-center text-sm">{image.title}</h3>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mt-16"
              >
                <p className="text-2xl text-white font-semibold mb-6">
                  Like what you see?
                </p>
                <CTAButton size="lg" onClick={() => navigate('/booking')}>
                  Get Your Price in 30 Seconds
                </CTAButton>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />

        {/* Lightbox Modal */}
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
                className="absolute top-6 right-6 text-white hover:text-orange-500 transition-colors z-10"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-10 h-10" />
              </button>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-6xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl mx-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-white text-2xl font-bold">{selectedImage.title}</h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default GalleryPage;
