
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/ui/CTAButton';

const ContactSubmittedPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const nextSteps = [
    {
      title: "Message Received",
      description: "Your message has been successfully delivered to our team"
    },
    {
      title: "Team Review",
      description: "Our experts will carefully review your inquiry and requirements"
    },
    {
      title: "Quick Response",
      description: "We'll contact you within 24 business hours via your preferred method"
    },
    {
      title: "Personalized Solution",
      description: "We'll provide tailored recommendations for your TV mounting needs"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Thank You - Pro Mount USA</title>
        <meta name="description" content="Thank you for contacting Pro Mount USA. We'll be in touch shortly." />
      </Helmet>

      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            {/* Success Icon */}
            <motion.div
              variants={iconVariants}
              animate={["visible", "pulse"]}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl"></div>
                <CheckCircle2 className="w-24 h-24 md:w-32 md:h-32 text-orange-500 relative z-10" strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4">
                Thank You for Contacting Us
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We've received your message and appreciate you reaching out to <span className="text-orange-500 font-bold">Pro Mount USA</span>
              </p>
            </motion.div>

            {/* What Happens Next Section */}
            <motion.div
              variants={itemVariants}
              className="bg-card border border-border rounded-2xl p-8 md:p-10 mb-12 shadow-xl"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                What Happens Next?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {nextSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start space-x-4 p-5 bg-muted/50 rounded-xl hover:bg-muted/80 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1 text-lg">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Additional Info Card */}
            <motion.div
              variants={itemVariants}
              className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 md:p-8 mb-12"
            >
              <p className="text-center text-foreground font-medium text-lg">
                <span className="font-bold text-orange-500">Need immediate assistance?</span> Call us at{' '}
                <a href="tel:9724303694" className="text-orange-500 hover:text-orange-600 font-bold underline decoration-2 underline-offset-4 transition-colors">
                  (972) 430-3694
                </a>
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <CTAButton
                size="lg"
                onClick={() => navigate('/')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 shadow-xl"
              >
                <Home className="w-5 h-5" />
                Return to Home
              </CTAButton>
              
              <CTAButton
                size="lg"
                variant="outline"
                onClick={() => navigate('/services')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
              >
                View Our Services
                <ArrowRight className="w-5 h-5" />
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactSubmittedPage;
