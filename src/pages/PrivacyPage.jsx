import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Shield, FileText, Workflow, Share2, ShieldCheck, MessageSquare, ExternalLink, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const customNavLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'Services', href: '/#services' },
  { name: 'About', href: '/#about' },
  { name: 'Reviews', href: '/#reviews' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'Contact', href: '/#contact' }
];

const PrivacyPage = () => {
  useEffect(() => {
    // When loading the privacy page directly, scroll to top
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Helmet>
        <title>Privacy Policy - Pro Mount USA LLC</title>
        <meta name="description" content="Privacy Policy for Pro Mount USA LLC - Professional TV Installation Services." />
      </Helmet>

      <Header navLinks={customNavLinks} />

      <main className="flex-grow bg-navy-950 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-navy-900 rounded-2xl shadow-2xl overflow-hidden border border-white/5">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-navy-900 to-navy-800 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-500/20 p-3 rounded-xl backdrop-blur-sm border border-orange-500/30">
                  <Shield className="w-8 h-8 text-orange-500" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Privacy Policy</h1>
                  <p className="text-orange-400 text-sm">Last Updated: March 10, 2026</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-12">
              {/* Introduction */}
              <section className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg">
                  Pro Mount USA LLC ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website <a href="https://www.promountusa.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">www.promountusa.com</a> or use our TV mounting and installation services.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg mt-4">
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
                </p>
              </section>

              {/* 1. Information We Collect */}
              <section>
                <div className="flex items-center mb-6 border-b border-white/10 pb-2">
                  <FileText className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-xl md:text-2xl font-bold text-white">1. Information We Collect</h2>
                </div>
                <div className="space-y-6 pl-2 md:pl-9">
                  <p className="text-gray-300 text-lg">We collect information that allows us to provide accurate quotes, schedule appointments, and complete installations at your residence or business.</p>

                  <div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2">Personal Data:</h3>
                    <p className="text-gray-400">
                      Personally identifiable information, such as your name, shipping address, installation address, email address, and telephone number, which you voluntarily give to us when you request a quote or book a service.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2">Service-Specific Data:</h3>
                    <p className="text-gray-400 mb-2">Information required to perform the installation, including:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
                      <li>Gate codes or property access instructions.</li>
                      <li>Details about your wall type (drywall, brick, stone) and TV specifications.</li>
                      <li>Photos of the installation area you may upload for quote accuracy.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2">Payment Data:</h3>
                    <p className="text-gray-400">
                      Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date), which may be collected when you purchase our services. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, Stripe.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2">Installation Photos:</h3>
                    <p className="text-gray-400">
                      We may take photos of the completed installation for quality assurance and proof of service. With your explicit permission, we may also use these photos for marketing purposes.
                    </p>
                  </div>
                </div>
              </section>

              {/* 2. How We Use Your Information */}
              <section>
                <div className="flex items-center mb-6 border-b border-white/10 pb-2">
                  <Workflow className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-xl md:text-2xl font-bold text-white">2. How We Use Your Information</h2>
                </div>
                <div className="pl-2 md:pl-9">
                  <p className="text-gray-300 text-lg mb-4">We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-3 pl-4 text-gray-400">
                    <li>Schedule and perform TV mounting and related audio-video services.</li>
                    <li>Communicate with you regarding your appointment (e.g., arrival time notifications via SMS or email).</li>
                    <li>Process payments and send receipts.</li>
                    <li>Send you a satisfaction survey or request a review after service completion.</li>
                    <li>Respond to customer service requests and resolve liability claims.</li>
                  </ul>
                </div>
              </section>

              {/* 3. Sharing of Your Information */}
              <section>
                <div className="flex items-center mb-6 border-b border-white/10 pb-2">
                  <Share2 className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-xl md:text-2xl font-bold text-white">3. Sharing of Your Information</h2>
                </div>
                <div className="space-y-6 pl-2 md:pl-9">
                  <p className="text-gray-300 text-lg">We do not sell, trade, or rent your personal information to others. We may share information in the following situations:</p>

                  <div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2">Service Providers:</h3>
                    <p className="text-gray-400">
                      We may share your information with third-party vendors who perform services for us or on our behalf, such as payment processing, email delivery, and hosting services.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2">Subcontractors:</h3>
                    <p className="text-gray-400">
                      If we utilize independent contractors to assist with your installation, they will receive only the information necessary to complete the job (name, address, and scope of work).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-100 mb-2">Legal Obligations:</h3>
                    <p className="text-gray-400">
                      We may disclose your information if required to do so by law or in response to valid requests by public authorities.
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. Security of Your Information */}
              <section>
                <div className="flex items-center mb-6 border-b border-white/10 pb-2">
                  <ShieldCheck className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-xl md:text-2xl font-bold text-white">4. Security of Your Information</h2>
                </div>
                <div className="pl-2 md:pl-9">
                  <p className="text-gray-400 leading-relaxed text-lg">
                    We use administrative, technical, and physical security measures to help protect your personal information. Specifically, information regarding home access (such as gate codes) is treated with high confidentiality and is deleted or purged from active installer views after the service is complete.
                  </p>
                </div>
              </section>

              {/* 5. SMS & Communications */}
              <section>
                <div className="flex items-center mb-6 border-b border-white/10 pb-2">
                  <MessageSquare className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-xl md:text-2xl font-bold text-white">5. SMS & Communications</h2>
                </div>
                <div className="pl-2 md:pl-9">
                  <p className="text-gray-400 leading-relaxed text-lg">
                    By opting in and providing your phone number, you consent to receive text messages from us regarding your scheduled services (e.g., "Technician is on the way"). You may opt out of receiving marketing SMS messages at any time by replying "STOP". <strong className="text-white">SMS consent is not shared with third parties or affiliates.</strong>
                  </p>
                </div>
              </section>

              {/* 6. Third-Party Websites */}
              <section>
                <div className="flex items-center mb-6 border-b border-white/10 pb-2">
                  <ExternalLink className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-xl md:text-2xl font-bold text-white">6. Third-Party Websites</h2>
                </div>
                <div className="pl-2 md:pl-9">
                  <p className="text-gray-400 leading-relaxed text-lg">
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices or the content of those third-party websites.
                  </p>
                </div>
              </section>

              {/* 7. Contact Us */}
              <section>
                <div className="flex items-center mb-6 border-b border-white/10 pb-2">
                  <Mail className="w-6 h-6 text-orange-500 mr-3" />
                  <h2 className="text-xl md:text-2xl font-bold text-white">7. Contact Us</h2>
                </div>
                <div className="pl-2 md:pl-9">
                  <p className="text-gray-400 leading-relaxed text-lg">
                    If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:info@promountusa.com" className="text-orange-400 font-medium hover:underline">info@promountusa.com</a>.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;