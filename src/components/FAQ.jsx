import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How much does it cost?',
      answer: 'Mounting starts as low as $29, with a $30 discount on orders over $200. Use the "Book Now" button on this page for an instant, custom quote.'
    },
    {
      question: 'How long does it take?',
      answer: 'Typically 30 to 90 minutes. We work efficiently to ensure your TV is perfectly level and secure without rushing the job.'
    },
    {
      question: 'Do I need my own mount?',
      answer: 'No. You can use yours, or purchase one of our high-quality fixed, tilting, or full-motion mounts. We carry hardware for every TV size.'
    },
    {
      question: 'Can you hide the wires?',
      answer: 'Yes. We can route wires behind the wall (even through insulation) or use sleek, paintable covers. You choose the look; we make it flawless.'
    },
    {
      question: 'What wall types do you work with?',
      answer: 'Almost anything: drywall, brick, stone, tile, concrete, and fireplaces. We bring specialized anchors for every surface.'
    },
    {
      question: 'Can you mount above a fireplace?',
      answer: 'Absolutely, and we do not charge extra for it. We ensure it\'s safe, secure, and at the ideal viewing height.'
    },
    {
      question: 'I live in an apartment with metal studs. Can you still mount my TV?',
      answer: 'Yes. We carry specialized anchors designed specifically for metal framing (common in condos/apartments) to ensure your TV is safe and secure.'
    },
    {
      question: 'Is your service insured?',
      answer: 'Yes, we are insured up to $1 Million. Your home and equipment are fully covered.'
    },
    {
      question: 'Where do you operate?',
      answer: 'We serve the entire DFW Metroplex, specifically Collin, Dallas, Denton, Rockwall, and Tarrant counties.'
    },
    {
      question: 'Do you offer same-day appointments?',
      answer: 'Yes, when available. We also have appointments available throughout the week, including weekends, to fit your schedule.'
    },
    {
      question: 'Is there a warranty?',
      answer: 'Yes. We offer a lifetime warranty on our brackets. 1-year warranty on the labor on all installations.'
    },
    {
      question: 'What forms of payment do you accept?',
      answer: 'We\'re happy to accept credit and debit cards. We don\'t accept cash.'
    },
    {
      question: 'Do you install TVs for businesses?',
      answer: 'Yes. We install digital menu boards, conference room displays, and waiting room TVs for offices, restaurants, gyms, and retail stores. Note: Due to insurance regulations, we do not perform installations in schools or hospitals.'
    },
    {
      question: 'How do I book?',
      answer: <span>Use the <strong className="text-orange-500">Book Now</strong> button, give us a call, or send us a text — whichever works best for you.</span>
    }
  ];

  return (
    <section id="faq" className="py-8 bg-navy-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-10 h-10 text-orange-500 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Frequently Asked <span className="text-orange-500">Questions</span>
            </h2>
          </div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Everything you need to know about our TV mounting services
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10 overflow-hidden w-full max-w-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-all duration-300"
              >
                <span className="text-lg font-semibold text-white pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-orange-500 flex-shrink-0" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-white/80 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;