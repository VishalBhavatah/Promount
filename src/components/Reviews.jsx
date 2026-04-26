import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import ReviewCard from '@/components/ui/ReviewCard';

const Reviews = () => {
  const scrollRef = useRef(null);

  const reviews = [{
    name: 'Martha Martinez',
    rating: 5,
    text: 'The technician arrived within the promised time frame and completed the job in under an hour. He recommended the perfect height and placement for our tv. Very professional. Thank you!'
  }, {
    name: 'Laverne Kimmel',
    rating: 5,
    text: 'Great Job. The installer was knowledgeable and friendly. Did a great job. Thank you!'
  }, {
    name: 'Sakeria Northcross',
    rating: 5,
    text: 'They quickly responded to my request, and performed the services promptly. My tech did a great job mounting my tv.'
  }, {
    name: 'Summer Scarbrough',
    rating: 5,
    text: 'My tech was fantastic! He mounted two tvs and hung two sets of curtains in my home, and everything turned out perfectly. He really knows his stuff – especially when it came to figuring out how to mount the tvs where I wanted them, even though the outlets weren\'t nearby. Super professional and easy to work with!'
  }, {
    name: 'Jon Doshier',
    rating: 5,
    text: 'My tech did a great job and was very thorough and professional. He was great at helping us get the tv hung and completely hiding the wires. Great job!'
  }, {
    name: 'Cara Cross',
    rating: 5,
    text: 'Our tech was prompt, polite, and very quick! He took time to discuss options and provide feedback. He also provided follow up information and things for us to be aware of! We will be calling his team again!'
  }];

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="reviews" className="py-8 bg-gradient-to-b from-navy-900 to-navy-800 relative overflow-hidden">
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
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-orange-500 fill-orange-500 mx-0.5" />
            ))}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="text-orange-500">Customers Say</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Five-Star Reviews from Satisfied Customers</p>
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
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-80"
              >
                <ReviewCard
                  name={review.name}
                  rating={review.rating}
                  text={review.text}
                  compact
                />
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

export default Reviews;