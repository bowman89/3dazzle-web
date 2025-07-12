import heroImage from "../assets/hero-image.jpeg";
import CtaBtn from "../components/CtaBtn";

function HeroSection2() {
  return (
    <section
      className="relative w-screen h-screen flex items-center justify-center overflow-x-visible p-0 m-0"
      style={{
        margin: 0,
        padding: 0,
      }}
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
      {/* Indhold */}
      <div className="relative z-10 flex flex-col items-start text-white px-8 max-w-2xl">
        <h1 className="mb-2 text-5xl font-bold">Unikke 3D prints</h1>
        <h2 className="mb-6 text-2xl font-semibold">
          Gør festen, gaven og hverdagen mere personlig med 3D print
        </h2>
        <CtaBtn>
          Se Produkter
        </CtaBtn>
      </div>
    </section>
  );
}

export default HeroSection2;
