import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Phone, Clock, Send, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['(972) 430-3694'], // Updated phone number here
      link: 'tel:9724303694' // Updated phone link here
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['8 AM – 10 PM Daily', '7 Days a Week']
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please check the form fields and try again."
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://promountbackend-914264443.development.catalystserverless.com/server/pro_mount_backend_function/create_lead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            message: formData.message
          })
        }
      );

      const result = await response.json().catch(() => ({}));
      if (!response.ok || result?.success === false) {
        throw new Error(result?.message || "Lead creation failed");
      }

      // Clear form
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      navigate('/contact-submitted');

    } catch (error) {
      console.error('Submission error:', error);

      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "We couldn't submit your message. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-navy-900 to-navy-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-orange-500">Touch</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Ready to transform your entertainment space? Contact us today!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column: Contact Info */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-300 text-center"
                >
                  <div className="bg-orange-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  {item.details.map((detail, idx) => (
                    <p key={idx} className="text-white/80 mb-1">
                      {item.link ? (
                        <a href={item.link} className="hover:text-orange-500 transition-colors">
                          {detail}
                        </a>
                      ) : (
                        detail
                      )}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>
            
            <div className="hidden lg:block bg-orange-500/10 rounded-2xl p-8 border border-orange-500/20">
              <h4 className="text-2xl font-bold text-white mb-4">Why Contact Us?</h4>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>Specialized Expertise: We don&#39;t fix sinks or mow lawns. We are mounting specialists.</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>Fully Insured: We carry comprehensive liability insurance for your total protection.</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>All Wall Types: Drywall, brick, stone, concrete, or metal studs - we handle it all.</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>The &quot;Clean Up&quot; Guarantee: We never leave dust or drywall debris behind.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6" id="contactForm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-black/20 border ${errors.firstName ? 'border-red-500' : 'border-white/10'} text-white focus:outline-none focus:border-orange-500 transition-colors`}
                    placeholder="First Name"
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-400 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-black/20 border ${errors.lastName ? 'border-red-500' : 'border-white/10'} text-white focus:outline-none focus:border-orange-500 transition-colors`}
                    placeholder="Last Name"
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-400 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-black/20 border ${errors.email ? 'border-red-500' : 'border-white/10'} text-white focus:outline-none focus:border-orange-500 transition-colors`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-black/20 border ${errors.phone ? 'border-red-500' : 'border-white/10'} text-white focus:outline-none focus:border-orange-500 transition-colors`}
                    placeholder="your phone number"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-400 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-3 rounded-lg bg-black/20 border ${errors.message ? 'border-red-500' : 'border-white/10'} text-white focus:outline-none focus:border-orange-500 transition-colors resize-none`}
                  placeholder="How can we help you?"
                />
                {errors.message && <p className="mt-1 text-sm text-red-400 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;