import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DisordersSection from "@/components/DisordersSection";
import HelplineSection from "@/components/HelplineSection";
import AppointmentScheduler from "@/components/AppointmentScheduler";
import CommunitySection from "@/components/CommunitySection";
import BlogSection from "@/components/BlogSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DisordersSection />
      <HelplineSection />
      <AppointmentScheduler />
      <CommunitySection />
      <BlogSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
};

export default Index;
