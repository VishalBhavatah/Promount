
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Users, Award, Target, Shield, DollarSign, Sparkles, Star, Calendar } from 'lucide-react';
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

const AboutUsPage = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go above and beyond to ensure every installation exceeds expectations.'
    },
    {
      icon: Users,
      title: '1,000\'s of Installs',
      description: 'Our technicians are trusted by thousands of customers across the Dallas-Fort Worth Metroplex.'
    },
    {
      icon: Target,
      title: 'Precision Work',
      description: 'Perfect leveling, secure mounting, and attention to detail in every installation, every time.'
    },
    {
      icon: Award,
      title: 'Expert Team',
      description: 'Highly skilled professionals with years of experience in TV mounting and audio-video installation.'
    },
    {
      icon: Shield,
      title: '$1M Insured',
      description: 'Comprehensive liability coverage protects you and your property during every installation.'
    },
    {
      icon: DollarSign,
      title: 'Transparent Pricing',
      description: 'No hidden fees, no surprises. Clear, honest pricing you can trust from the start.'
    },
    {
      icon: Sparkles,
      title: 'Clean Work',
      description: 'We treat your home like our own, with professional cleanup and zero mess left behind.'
    },
    {
      icon: Calendar,
      title: '7 Days Service',
      description: 'Open 8 AM – 10 PM Daily, including weekends, to work around your busy schedule.'
    }
  ];

  const certifications = [
    { name: '1-Year Labor Warranty', icon: Award },
    { name: 'Lifetime Bracket Warranty', icon: Shield },
    { name: '$1M Liability Insurance', icon: Shield },
    { name: '5★ Customer Reviews', icon: Star }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Pro Mount USA</title>
        <meta name="description" content="Learn about Pro Mount USA - Professional TV mounting and installation experts serving the Dallas-Fort Worth Metroplex." />
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
                  About <span className="text-orange-500">PROMountUSA</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/80">
                  Professional TV mounting experts serving the Dallas-Fort Worth Metroplex
                </p>
              </motion.div>
            </div>
          </section>

          {/* Our Story */}
          <section className="py-16 bg-navy-900">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Our <span className="text-orange-500">Story</span>
                  </h2>
                  
                  <div className="space-y-6 text-white/80 text-lg leading-relaxed">
                    <p>
                      Let's face it: you have better things to do with your weekend and free time than wrestling with drywall anchors and reading confusing instruction manuals.
                    </p>
                    
                    <p>
                      <strong className="text-orange-500">Pro Mount USA</strong> was created to solve a simple problem: getting professional, reliable TV mounting shouldn't be a hassle. We stripped away the long waiting windows, the vague pricing, and the uncertainty. In their place, we built a service that is <strong className="text-white">fast, transparent, and undeniably pro.</strong>
                    </p>
                    
                    <p>
                      We are a local team of dedicated technicians serving the entire DFW Metroplex. Our technicians have mounted thousands of screens, encountered every type of wall — from metal studs in high-rise apartments to brick fireplaces in historic homes — and perfected the process. Our mission is simple: we arrive on time, we work efficiently, and we get it right the first time. We guarantee it!
                    </p>
                    
                    <p>
                      <strong className="text-white">No mess. No stress.</strong> Just the perfect picture, exactly where you want it.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 30 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }}
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src="https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/pexels-artbovich-6527053-SOJFK.jpg" 
                      alt="Professional TV Installation Team" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="py-16 bg-gradient-to-b from-navy-800 to-navy-900">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Why Choose <span className="text-orange-500">PROMountUSA</span>
                </h2>
                <p className="text-xl text-white/80 max-w-2xl mx-auto">
                  Experience, quality, and customer satisfaction that sets us apart
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <div className="bg-orange-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                      <value.icon className="w-7 h-7 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="py-16 bg-navy-900">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Our <span className="text-orange-500">Guarantees</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-xl p-6 border-2 border-orange-500/30 text-center"
                  >
                    <cert.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-white font-bold text-lg">{cert.name}</h3>
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
                  Ready to experience the Pro Mount USA difference?
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

export default AboutUsPage;
