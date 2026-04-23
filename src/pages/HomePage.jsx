
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SpecialOfferBanner from '@/components/SpecialOfferBanner';
import PromoBanner from '@/components/PromoBanner';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Reviews from '@/components/Reviews';
import Gallery from '@/components/Gallery';
import AboutUs from '@/components/AboutUs';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PinnedBookingButton from '@/components/PinnedBookingButton';

const HomePage = () => {
  const navigate = useNavigate();

  const pageTitle = "Pro Mount USA – TV Installation Experts";
  const pageDescription = "Professional TV installation services by Pro Mount USA - Expert mounting, wiring, and setup.";
  const ogImage = "https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/0f528654c61947b5ae15a3a1f8194f4d.png";
  const ogUrl = "https://www.promountusa.com";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      
      <div className="min-h-screen bg-navy-900">
        <Header />
        <main>
          <div id="home">
            <Hero />
          </div>
          <div className="mt-16">
            <SpecialOfferBanner onOpenBooking={() => navigate('/booking')} />
          </div>
          <div className="mt-16">
            <PromoBanner />
          </div>
          <Services id="services" />
          <div className="mt-16">
            <WhyChooseUs />
          </div>
          <Reviews id="reviews" />
          <Gallery id="gallery" onOpenBooking={() => navigate('/booking')} />
          <AboutUs id="about" />
          <FAQ id="faq" />
          <Contact id="contact" />
        </main>
        <Footer />
        <PinnedBookingButton />
      </div>
    </>
  );
};

export default HomePage;
