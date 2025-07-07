import heroImg from "../assets/heroImg.png";

function HeroSection() {
  return (
    <section className="text-[#201F21] body-font">
      <div className="container mx-auto flex px-5 py-16 my-16 md:flex-row flex-col items-center gap-38">
        {/* Tekstkolonne */}
        <div className="flex-1 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-5xl text-3xl mb-4 font-medium text-[#201F21]">
            Unikke 3D print til din hverdag – fra pynt til personlig indretning og gamersetuppet
          </h1>
          <p className="mb-8 leading-relaxed text-[#5E5E5E] ">
            Hos 3Dazzle tror vi på, at smarte og personlige 3D print kan gøre hverdagen både sjovere og lettere. Vores mission er at gøre 3D print tilgængeligt for alle – uanset om du drømmer om kreative dekorationer, praktiske løsninger til hjemmet eller noget unikt til gamersetuppet.
            Her finder du funktionelle og dekorative designs, der hjælper med at skabe orden, tilføre personlighed og løse små og store udfordringer i hverdagen.
            Med 3Dazzle får du unikke 3D prints, der er skabt med omtanke og passion for både det praktiske og det kreative.
          </p>
          <div className="flex justify-center">
          <button className="relative inline-flex text-[#201F21] bg-[#F0D700] border-0 py-2 px-6 focus:outline-none rounded text-lg font-bold group overflow-hidden transition-shadow duration-200 hover:shadow-lg cursor-pointer">
            <span className="relative z-10">Se udvalget!</span>
          </button>
          </div>
        </div>
        {/* Billedkolonne */}
        <div className="flex-1 flex items-center justify-center">
          <img
            className="w-full max-w-2xl rounded-xl object-cover"
            alt="hero"
            src={heroImg}
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
