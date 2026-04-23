
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cable, Flame, Speaker, Gamepad, Maximize2, Building2, Sparkles, Monitor, CheckCircle2, Award, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ui/ServiceCard';
import CTAButton from '@/components/ui/CTAButton';

const customNavLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'Services', href: '/services' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

const ServicesPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Monitor,
      title: 'Professional TV Mounting',
      description: 'Expert installation on any wall type - drywall, brick, stone, or concrete. We ensure perfect leveling and secure mounting every time.',
      price: 'Starting at $99',
      features: ['All wall types', 'Perfect leveling', 'Secure installation', 'Cable management']
    },
    {
      icon: Cable,
      title: 'Wire Concealment',
      description: 'Clean, professional cable management solutions. Hide all wires inside the wall or use sleek surface raceways for a flawless finish.',
      price: 'Starting at $89',
      features: ['In-wall routing', 'Surface raceways', 'Power relocation', 'Clean finish']
    },
    {
      icon: Flame,
      title: 'Fireplace Mounting',
      description: 'Specialized mounting above fireplaces with proper heat management, cable routing, and safe clearances for comfortable viewing.',
      price: 'No extra charge',
      features: ['Heat management', 'Safe clearances', 'Cable routing', 'Perfect positioning']
    },
    {
      icon: Speaker,
      title: 'Soundbar Installation',
      description: 'Perfect audio positioning for optimal sound quality with invisible cable routing and complete system integration.',
      price: 'Starting at $59',
      features: ['Optimal positioning', 'Hidden cables', 'System integration', 'Sound optimization']
    },
    {
      icon: Gamepad,
      title: 'Gaming Console Setup',
      description: 'Complete gaming station installation with proper ventilation, cable management, and accessibility optimization.',
      price: 'Starting at $49',
      features: ['Proper ventilation', 'Cable organization', 'Console accessibility', 'Controller charging']
    },
    {
      icon: Maximize2,
      title: 'Flush-to-Wall Installation',
      description: 'Ultra-slim mounting that makes your TV appear to float on the wall. Perfect for modern, minimalist aesthetics.',
      price: 'Custom pricing',
      features: ['Minimal profile', 'Recessed options', 'Modern look', 'Custom solutions']
    },
    {
      icon: Building2,
      title: 'Commercial Installation',
      description: 'Professional installations for businesses, restaurants, offices, and commercial spaces with commercial-grade equipment.',
      price: 'Custom pricing',
      features: ['Multi-display setups', 'Digital signage', 'Conference rooms', 'Commercial warranties']
    },
    {
      icon: Sparkles,
      title: 'Complete Cleanup',
      description: 'Meticulous cleanup included with every installation. We remove all packaging, vacuum debris, and leave your space spotless.',
      price: 'Always included',
      features: ['Packaging removal', 'Debris cleanup', 'Paint touch-ups', 'Final inspection']
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: '1,000\'s of Installations',
      description: 'Trusted by thousands of satisfied customers across the DFW Metroplex'
    },
    {
      icon: Shield,
      title: 'Fully Insured',
      description: '$1M liability coverage protects you and your property'
    },
    {
      icon: CheckCircle2,
      title: 'Lifetime Warranty',
      description: 'Lifetime warranty on our brackets, 1-year warranty on labor'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Professional TV Mounting Services - Pro Mount USA</title>
        <meta name="description" content="Expert TV mounting and installation services for residential and commercial clients in the Dallas-Fort Worth area." />
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
                className="text-center max-w-4xl mx-auto mb-12"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Professional TV Mounting <span className="text-orange-500">Services</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/80 mb-8">
                  Expert installation on any wall type, with wire concealment and complete satisfaction guaranteed
                </p>
                <CTAButton size="lg" onClick={() => navigate('/booking')}>
                  Get Your Price in 30 Seconds
                </CTAButton>
              </motion.div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10 text-center"
                  >
                    <benefit.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-white/70 text-sm">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-16 bg-navy-900">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Our <span className="text-orange-500">Services</span>
                </h2>
                <p className="text-xl text-white/80 max-w-2xl mx-auto">
                  Comprehensive TV mounting and installation solutions for every need
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl h-full flex flex-col">
                      <div className="bg-orange-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                        <service.icon className="w-8 h-8 text-orange-500" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-white/70 mb-4 flex-grow">{service.description}</p>
                      
                      <div className="mb-6">
                        <div className="text-2xl font-bold text-orange-500 mb-4">{service.price}</div>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-white/80 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <CTAButton className="w-full mt-auto" onClick={() => navigate('/booking')}>
                        Book Now
                      </CTAButton>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mt-16"
              >
                <p className="text-2xl text-white font-semibold mb-6">
                  Ready to get started?
                </p>
                <CTAButton size="lg" onClick={() => navigate('/booking')}>
                  Get Your Price in 30 Seconds
                </CTAButton>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ServicesPage;
