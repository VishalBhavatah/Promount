import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Award, Target } from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="py-8 bg-gradient-to-b from-navy-800 to-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About <span className="text-orange-500">PROMountUSA</span>
            </h2>
            
            <div className="space-y-6 text-white/80 text-lg leading-relaxed">
              <p>
                Let's face it: you have better things to do with your weekend and free time than wrestling with drywall anchors and reading confusing instruction manuals.
              </p>
              
              <p>
                <strong className="text-orange-500">Pro Mount USA</strong> was created to solve a simple problem: getting professional, reliable TV mounting shouldn't be a hassle. We stripped away the long waiting windows, the vague pricing, and the uncertainty. In their place, we built a service that is <strong className="text-white">fast, transparent, and undeniably pro.</strong>
              </p>
              
              <p>
                We are a local team of dedicated technicians serving the entire DFW Metroplex. We have encountered every type of wall — from metal studs in high-rise apartments to brick fireplaces in historic homes — and perfected the process. Our mission is simple: we arrive on time, we work efficiently, and we get it right the first time. We guarantee it!
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
            className="space-y-6"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://horizons-cdn.hostinger.com/b9ebcfa9-4abf-47ed-a852-96eed2403bfb/pexels-artbovich-6527053-SOJFK.jpg" alt="Professional TV Installation Team" className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Heart, title: 'Customer First', text: 'Your satisfaction is our priority' },
                { icon: Users, title: 'Lots of Happy Customers', text: 'Trusted across the DFW Metroplex' },
                { icon: Target, title: 'Precision Work', text: 'Perfect every time' },
                { icon: Award, title: 'Expert Team', text: 'Highly skilled pros' }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  whileInView={{ opacity: 1, scale: 1 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.1 }} 
                  className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-4 border border-white/10 hover:border-orange-500/50 transition-all duration-300"
                >
                  <item.icon className="w-6 h-6 text-orange-500 mb-2" />
                  <h4 className="text-white font-bold mb-1 text-sm">{item.title}</h4>
                  <p className="text-white/70 text-xs leading-tight">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default AboutUs;