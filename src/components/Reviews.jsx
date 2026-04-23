import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import ReviewCard from '@/components/ui/ReviewCard';
const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const reviews = [{
    name: 'Martha Martinez',
    rating: 5,
    text: 'The technician arrived within the promised time frame and completed the job in under an hour.  He recommended the perfect height and placement for our tv.  Very professional.  Thank you!'
  }, {
    name: 'Laverne Kimmel',
    rating: 5,
    text: 'Great Job. The installer was knowledgeable and friendly.  Did a great job.  Thank you!'
  }, {
    name: 'Sakeria Northcross',
    rating: 5,
    text: 'They quickly responded to my request, and performed the services promptly.  My tech did a great job mounting my tv.'
  }, {
    name: 'Summer Scarbrough',
    rating: 5,
    text: 'My tech was fantastic! He mounted two tvs and hung two sets of curtains in my home, and everything turned out perfectly.  He really knows his stuff – especially when it came to figuring out how to mount the tvs where I wanted them, even though the outlets weren’t nearby.  He also gave great tips about certain lengths and rods.  Super professional and easy to work with!'
  }, {
    name: 'Jon Doshier',
    rating: 5,
    text: 'My tech did a great job and was very thorough and professional.  He was great at helping us get the tv hung and completely hiding the wires.  Great job!'
  }, {
    name: 'Cara Cross',
    rating: 5,
    text: 'Our tech was prompt, polite, and very quick! He took time to discuss options and provide feedback. He also provided follow up information and things for us to be aware of!  We will be calling his team again!'
  }];
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prev => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const paginate = newDirection => {
    setDirection(newDirection);
    setCurrentIndex(prev => {
      if (newDirection === 1) {
        return (prev + 1) % reviews.length;
      }
      return prev === 0 ? reviews.length - 1 : prev - 1;
    });
  };
  return <section id="reviews" className="py-16 bg-gradient-to-b from-navy-900 to-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Star className="w-8 h-8 text-orange-500 fill-orange-500" />
            <Star className="w-8 h-8 text-orange-500 fill-orange-500 mx-1" />
            <Star className="w-8 h-8 text-orange-500 fill-orange-500" />
            <Star className="w-8 h-8 text-orange-500 fill-orange-500 mx-1" />
            <Star className="w-8 h-8 text-orange-500 fill-orange-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="text-orange-500">Customers Say</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Five-Star Reviews from Satisfied Customers</p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={currentIndex} custom={direction} initial={{
            opacity: 0,
            x: direction > 0 ? 100 : -100
          }} animate={{
            opacity: 1,
            x: 0
          }} exit={{
            opacity: 0,
            x: direction > 0 ? -100 : 100
          }} transition={{
            duration: 0.3
          }}>
              <ReviewCard name={reviews[currentIndex].name} rating={reviews[currentIndex].rating} text={reviews[currentIndex].text} image={reviews[currentIndex].image} date={reviews[currentIndex].date} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button onClick={() => paginate(-1)} className="bg-white/10 hover:bg-orange-500/20 text-white p-3 rounded-full transition-all duration-300 border border-white/20 hover:border-orange-500">
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex space-x-2">
              {reviews.map((_, index) => <button key={index} onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-orange-500 w-8' : 'bg-white/30'}`} />)}
            </div>

            <button onClick={() => paginate(1)} className="bg-white/10 hover:bg-orange-500/20 text-white p-3 rounded-full transition-all duration-300 border border-white/20 hover:border-orange-500">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Grid of All Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {reviews.map((review, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }}>
              <ReviewCard name={review.name} rating={review.rating} text={review.text} image={review.image} date={review.date} compact />
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default Reviews;