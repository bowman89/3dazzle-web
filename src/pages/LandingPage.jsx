import HeroSection from "../components/HeroSection"
import ProductShowcase from "../components/ProductShowcase"
import WhyUs from "../components/WhyUs"
// src/pages/LandingPage.jsx

function LandingPage() {
  return ( 
    <div className="max-w-screen-2xl mx-auto px-4">
      <HeroSection />
      <ProductShowcase />
      <WhyUs />
    </div>
    
    
  )
}
export default LandingPage
