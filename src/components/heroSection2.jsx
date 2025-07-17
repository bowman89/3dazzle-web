import { Link } from "react-router-dom";
import heroImage from "../assets/hero-image.jpeg";
import CtaBtn from "../components/CtaBtn";

function HeroSection2() {
  return (
    <section
      className="relative w-full h-[80vh] flex items-center justify-center overflow-x-hidden p-0 m-0 !mt-[90px]"
    >
      {/* Fullscreen Baggrund */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: 0,
        }}
      />
      {/* Indhold container – max-w, centrering, padding */}
      <div className="relative z-10 flex flex-col items-start px-8 max-w-2xl w-full mx-auto">
        <h1 className="mb-2 text-5xl font-bold text-white">Unikke 3D prints</h1>
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Gør festen, gaven og hverdagen mere personlig med 3D print
        </h2>
        <Link to="/dev-produkter">
          <CtaBtn>
            Se Produkter
          </CtaBtn>
        </Link>
      </div>
    </section>
  );
}

export default HeroSection2;
