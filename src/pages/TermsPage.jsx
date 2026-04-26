import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FileText, Wrench, CheckCircle2, Clock, Shield, Award, CreditCard, Zap, AlertTriangle, Camera, Scale, Lock, Database, Share2, MessageSquare } from 'lucide-react';
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

const TermsPage = () => {
  useEffect(() => {
    // When loading the terms page directly, scroll to top
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Helmet>
        <title>Terms of Service - Pro Mount USA</title>
        <meta name="description" content="Terms of Service for Pro Mount USA - Professional TV Installation Services." />
      </Helmet>

      <Header navLinks={customNavLinks} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-navy-900 rounded-2xl shadow-2xl overflow-hidden border border-white/5">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-navy-900 to-navy-800 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-500/20 p-3 rounded-xl backdrop-blur-sm border border-orange-500/30">
                  <FileText className="w-8 h-8 text-orange-500" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Terms of Service</h1>
                  <p className="text-orange-400 text-sm">Last Updated: March 10, 2026</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-12">
              {/* Introduction */}
              <section className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg">
                  These Terms of Service ("Terms") govern the agreement between Pro Mount USA LLC ("we," "us," or "our") and the customer ("you" or "Customer") regarding the provision of TV mounting, audio-video installation, and related services (the "Services"). By booking an appointment or authorizing work to commence, you agree to be bound by these Terms.
                </p>
              </section>

              <div className="space-y-12">
                <section>
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <Wrench className="w-5 h-5 text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white m-0">1. Scope of Services</h2>
                  </div>
                  <div className="prose prose-invert max-w-none text-gray-300">
                    <ul className="list-disc pl-6 space-y-4 text-gray-300 marker:text-orange-500">
                      <li>
                        <strong className="text-white">Standard Service:</strong> Includes mounting the TV bracket to a standard wood-stud or drywall surface, mounting the TV to the bracket, and basic load testing.
                      </li>
                      <li>
                        <strong className="text-white">Additional Work:</strong> Services such as concealing wires behind the wall, mounting into brick/stone/concrete, fireplace mounting, or installing soundbars require additional time and materials. These may incur additional charges if not agreed upon in the original quote.
                      </li>
                      <li>
                        <strong className="text-white">Exclusions:</strong> We do not perform electrical work requiring a licensed electrician (e.g., installing new power outlets behind the TV) unless explicitly stated and performed by a licensed subcontractor. We do not repair internal TV components.
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white m-0">2. Customer Responsibilities</h2>
                  </div>
                  <div className="prose prose-invert max-w-none text-gray-300">
                    <p className="mb-3 text-gray-300">To ensure a safe and efficient installation, you agree to:</p>
                    <ul className="list-disc pl-6 space-y-4 text-gray-300 marker:text-orange-500">
                      <li>
                        <strong className="text-white">Adult Presence:</strong> Have an individual over the age of 18 present for the duration of the appointment to approve the mounting location and height.
                      </li>
                      <li>
                        <strong className="text-white">Work Area:</strong> Clear the area below and around the installation site of fragile items, furniture, and debris.
                      </li>
                      <li>
                        <strong className="text-white">Pets & Minors:</strong> Keep pets and small children away from the work area for safety.
                      </li>
                      <li>
                        <strong className="text-white">Equipment:</strong> Have the TV, mount (if supplying your own), and necessary cables ready before the technician arrives.
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <Clock className="w-5 h-5 text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white m-0">3. Scheduling & Cancellation Policy</h2>
                  </div>
                  <div className="prose prose-invert max-w-none text-gray-300">
                    <ul className="list-disc pl-6 space-y-4 text-gray-300 marker:text-orange-500">
                      <li>
                        <strong className="text-white">Saturday Bookings:</strong> A $29 non-refundable deposit is required for all Saturday appointments. This deposit will be applied to your final invoice upon completion of the work. If you cancel or reschedule your Saturday appointment, this deposit is forfeited.
                      </li>
                      <li>
                        <strong className="text-white">Cancellation & Rescheduling:</strong> We require at least 24 hours' notice for cancellations or rescheduling of all appointments. Cancellations made less than 24 hours before the appointment may be subject to a cancellation fee of $25.
                      </li>
                      <li>
                        <strong className="text-white">No-Show Policy:</strong> If our technician arrives and cannot access the property or no adult is present after a 15-minute grace period, a full service call fee may be charged.
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <Shield className="w-5 h-5 text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white m-0">4. Liability & Damage Waivers (Read Carefully)</h2>
                  </div>
                  <div className="prose prose-invert max-w-none text-gray-300">
                    <p className="mb-3 text-gray-300">While we exercise the highest care, the nature of drilling into walls carries inherent risks.</p>
                    <ul className="list-disc pl-6 space-y-4 text-gray-300 marker:text-orange-500">
                      <li>
                        <strong className="text-white">Hidden Obstructions & Wire Concealment:</strong> We use stud finders and professional judgment to locate studs. However, particularly during "In-Wall (Drywall)" or "In-Wall (Hard Surface)" wire concealment, we are not liable for damage to hidden pipes, electrical wiring, HVAC ducts, gas lines, or other infrastructure behind the wall that is not detectable by standard scanning tools.
                      </li>
                      <li>
                        <strong className="text-white">Fragile Surfaces (Stone/Tile/Marble):</strong> When services involve mounting to stone, tile, or marble, you acknowledge the inherent fragility of these natural or manufactured materials. While we use industry-best practices, Pro Mount USA LLC is released from liability for cracking, chipping, or shattering of these surfaces that may occur during standard installation.
                      </li>
                      <li>
                        <strong className="text-white">Structural Integrity (Oversized TVs & Ceiling Mounts):</strong> We are not responsible for structural defects in your walls (e.g., dry rot, weak studs, crumbling plaster) that compromise the installation. For Ceiling Mounts or televisions 86 inches and over, the customer assumes full responsibility that the structural integrity of the home's framing is sound and capable of supporting the equipment. If the technician determines the wall or ceiling is unsafe, we reserve the right to decline the service.
                      </li>
                      <li>
                        <strong className="text-white">Customer-Supplied Mounts:</strong> If you select the "Already Have Mount" option and supply your own hardware, we guarantee our labor but cannot guarantee the hardware itself. We are not liable for failure, bending, or breaking caused by a defective or inadequate customer-supplied mount.
                      </li>
                      <li>
                        <strong className="text-white">TV Functionality:</strong> We are responsible for physically mounting the unit. We are not responsible for existing pixel damage, internal electronic failure, or software issues with the TV.
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <Award className="w-5 h-5 text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white m-0">5. Warranty Coverage</h2>
                  </div>
                  <div className="prose prose-invert max-w-none text-gray-300">
                    <p className="mb-3 text-gray-300">We stand behind our work with the following warranties:</p>
                    <ul className="list-disc pl-6 space-y-4 text-gray-300 marker:text-orange-500">
                      <li>
                        <strong className="text-white">1-Year Workmanship Warranty (Labor):</strong> We offer a 1-Year Warranty on our installation labor. If the mount becomes loose or the TV shifts due to an installation error within 365 days of service, we will return to fix it free of charge.
                      </li>
                      <li>
                        <strong className="text-white">Lifetime Hardware Warranty (Brackets):</strong> All TV mounts and brackets purchased directly from Pro Mount USA LLC carry a Lifetime Warranty. If the metal hardware fails, bends, or breaks under normal use, we will replace the mount free of charge.
                        <div className="mt-4 pl-4 border-l-2 border-orange-500/30">
                          <p className="text-sm italic text-gray-400">
                            <strong className="text-white not-italic">Note:</strong> This hardware warranty does NOT apply to mounts purchased by the customer from third parties (e.g., Amazon, Best Buy).
                          </p>
                        </div>
                      </li>
                      <li>
                        <p><strong className="text-white">Voiding Warranty:</strong></p> These warranties are VOID if anyone other than our technicians alters, moves, adds weight to, or tampers with the installation after we leave.
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <CreditCard className="w-5 h-5 text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white m-0">6. Pricing & Payment</h2>
                  </div>
                  <div className="prose prose-invert max-w-none text-gray-300">
                    <ul className="list-disc pl-6 space-y-4 text-gray-300 marker:text-orange-500">
                      <li>
                        <strong className="text-white">Estimates:</strong> All quotes provided over the phone or online are non-binding estimates based on the information provided by the Client.
                      </li>
                      <li>
                        <strong className="text-white">On-Site Adjustments:</strong> The Technician reserves the right to adjust the price upon arrival if the job scope differs from the booking (e.g., mounting to stone instead of drywall, concealing wires in a firewall).
                      </li>
                      <li>
                        <strong className="text-white">Payment Terms:</strong> Payment is due in full immediately upon completion of the service. We accept Credit Card, Zelle, or tap-to-pay accounts. Unpaid balances beyond 5 days may be subject to a late fee or sent to collections.
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <Zap className="w-5 h-5 text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white m-0">7. Concealment of Wires & Electrical Services</h2>
                  </div>
                  <div className="prose prose-invert max-w-none text-gray-300">
                    <ul className="list-disc pl-6 space-y-4 text-gray-300 marker:text-orange-500">
                      <li>
                        <strong className="text-white">High Voltage:</strong> If you request wires to be hidden inside the wall, please note that standard TV power cords (high voltage) cannot legally or safely be run inside a wall unless it is an "In-Wall Rated" power kit.
                      </li>
                      <li>
                        <strong className="text-white">In-Wall + Power Service:</strong> Our "In-Wall + Power" service consists of installing a code-compliant power bridge/Romex kit that plugs into an existing outlet. It does not include pulling new wiring directly from the home's breaker panel. Pro Mount USA LLC is not responsible for pre-existing electrical faults, grounding issues, or code violations in your home's circuitry.
                      </li>
                      <li>
                        <strong className="text-white">Low Voltage:</strong> We will only run low-voltage cables (HDMI, Optical, Ethernet) directly inside the wall.
                      </li>
                      <li>
                        <strong className="text-white">Waiver:</strong> If you explicitly request non-compliant cord concealment against our advice, you assume full liability for fire hazards and code violations.
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white m-0">8. Limitation of Liability</h2>
                  </div>
                  <div className="prose prose-invert max-w-none text-gray-300">
                    <p className="mb-3 text-gray-300">To the fullest extent permitted by law, Pro Mount USA LLC's total liability for any claim arising out of the services provided shall be limited to the total amount paid by the Customer for the specific service. In no event shall we be liable for indirect, incidental, or consequential damages (e.g., loss of income, loss of use).</p>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <Camera className="w-5 h-5 text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white m-0">9. Media Release</h2>
                  </div>
                  <div className="prose prose-invert max-w-none text-gray-300">
                    <p className="mb-3 text-gray-300">Unless you explicitly decline at the time of service, you grant us permission to take before-and-after photos of the installation for quality assurance and marketing purposes (e.g., social media or website portfolio). We will never capture personal family photos or sensitive documents in these images.</p>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <Scale className="w-5 h-5 text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white m-0">10. Governing Law</h2>
                  </div>
                  <div className="prose prose-invert max-w-none text-gray-300">
                    <p className="mb-3 text-gray-300">These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions.</p>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <Lock className="w-5 h-5 text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white m-0">11. Privacy Policy & Data Usage</h2>
                  </div>
                  
                  <div className="prose prose-invert max-w-none text-gray-300">
                    <p className="mb-4 text-gray-300">
                      <strong className="text-white">What Personal Information We Collect:</strong> To provide our Services, we collect contact information (name, address, email, phone number), property and installation details (wall type, gate codes), and necessary payment data to process transactions.
                    </p>
                    <p className="mb-4 text-gray-300">
                      <strong className="text-white">How We Use Your Personal Information:</strong> We use your information exclusively to schedule appointments, perform installations, process your payments, and communicate with you regarding your service status or warranty requests.
                    </p>
                    <p className="mb-4 text-gray-300">
                      <strong className="text-white">Who We Share Your Personal Information With:</strong> We do not sell or rent your personal data. We only share information with trusted third-party service providers (such as payment processors) or independent subcontractors necessary to complete your specific installation.
                    </p>
                    <p className="mb-3 text-gray-300">
                      <strong className="text-white">SMS/Text Messaging Consent:</strong> By opting in and providing your phone number, you consent to receive text messages from us regarding your scheduled services, estimates, and appointments. You may opt out at any time by replying "STOP". SMS consent is not shared with third parties or affiliates.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;