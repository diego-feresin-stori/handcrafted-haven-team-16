import CallToAction from "@/components/CallToAction";
import FeaturedProducts from "@/components/FeaturedProducts";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SellerSpotlight from "@/components/SellerSpotlight";
import UserInfo from "@/components/UserInfo";
import LogoutButton from "@/components/AuthButton";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Features />
        <FeaturedProducts />
        <SellerSpotlight />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
