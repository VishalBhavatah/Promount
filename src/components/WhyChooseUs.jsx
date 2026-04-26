import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, DollarSign, Sparkles, Star, Users, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const WhyChooseUs = () => {
  const scrollRef = useRef(null);

  const features = [
    {
      icon: Award,
      title: 'Proven Expertise',
      description: 'Lots of happy customers across DFW. Your TV goes up right the first time — guaranteed.',
      gradient: 'from-orange-500/20 to-red-500/20'
    },
    {
      icon: Shield,
      title: 'Rock-Solid Warranty',
      description: 'We stand behind every installation with a 1-year labor warranty. Our work is guaranteed.',
      gradient: 'from-blue-500/20 to-purple-500/20'
    },
    {
      icon: DollarSign,
      title: 'No Surprises, Ever',
      description: 'Transparent pricing from the start. Any extras are discussed openly and approved by you first.',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: Sparkles,
      title: 'We Clean Up After Ourselves',
      description: 'Drop cloths down, wires hidden, debris gone. We clean up the debris from our work.',
      gradient: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      icon: Star,
      title: '5-Star Rated',
      description: 'Every job ends the same way — a happy customer and a perfectly mounted TV.',
      gradient: 'from-pink-500/20 to-rose-500/20'
    },
    {
      icon: Users,
      title: 'Your Home is Protected',
      description: 'We carry $1M in liability insurance. If anything goes wrong, you\'re fully covered.',
      gradient: 'from-indigo-500/20 to-blue-500/20'
    },
    {
      icon: Calendar,
      title: 'We Work Around Your Schedule',
      description: 'Available 8AM–10PM, 7 days a week — including weekends. Book when it works for you, not us.',
      gradient: 'from-teal-500/20 to-cyan-500/20'
    }
  ];

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 bg-navy-900 relative overflow-hidden">
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

        {/* Side Scroll Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-orange-500 text-white p-2 rounded-full transition-all duration-200 -translate-x-3"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Scrollable Row */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 pt-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overflowY: 'visible' }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group flex-shrink-0 w-72"
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

          {/* Right Arrow */}
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-orange-500 text-white p-2 rounded-full transition-all duration-200 translate-x-3"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;