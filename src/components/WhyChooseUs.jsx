import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, DollarSign, Sparkles, Star, Users, Calendar } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: 'Experience That Shows',
      description: '1,000\'s of successful installations. Our technicians bring years of expertise to every job, ensuring your TV is mounted safely and perfectly the first time.',
      gradient: 'from-orange-500/20 to-red-500/20'
    },
    {
      icon: Shield,
      title: 'Guaranteed Quality',
      description: 'Lifetime warranty on our brackets. 1-Year Warranty on the labor and all installations. We stand behind our work with comprehensive coverage that protects your investment and gives you peace of mind.',
      gradient: 'from-blue-500/20 to-purple-500/20'
    },
    {
      icon: DollarSign,
      title: 'Clear & Honest Pricing',
      description: 'Our transparent pricing model has earned us the trust of our customers.',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: Sparkles,
      title: 'Clean Work, Every Time',
      description: 'We treat your home like our own. Professional drop cloths, careful handling, and thorough cleanup leave your space spotless when we finish.',
      gradient: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      icon: Star,
      title: '5★ Reviews',
      description: 'Our customers love our technicians, and their reviews speak for themselves.',
      gradient: 'from-pink-500/20 to-rose-500/20'
    },
    {
      icon: Users,
      title: '$1M Fully Insured',
      description: 'Complete liability coverage protects you and your property. We carry comprehensive insurance so you never have to worry about potential damages.',
      gradient: 'from-indigo-500/20 to-blue-500/20'
    },
    {
      icon: Calendar,
      title: 'Open 7 Days a Week',
      description: '8 AM – 10 PM Daily for your convenience. Weekend appointments available. We work around your schedule, not the other way around.',
      gradient: 'from-teal-500/20 to-cyan-500/20'
    }
  ];

  return (
    <section className="py-16 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose <span className="text-orange-500">PROMountUSA</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Experience, quality, and customer satisfaction that sets us apart
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] max-w-sm"
            >
              <div className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl h-full flex flex-col`}>
                <div className="bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed flex-grow">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;