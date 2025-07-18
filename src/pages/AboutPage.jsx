// src/pages/AboutPage.jsx
import { useState } from "react";
import Thomas from "../assets/thomas.png";
import adviceWhite from "../assets/advice-white.png";
import fastResponse from "../assets/fast-response.png";
import handHeart from "../assets/hand-heart.png";

// FlipCard-komponent (ingen export her!)
function FlipCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false);
  const isImage =
    typeof icon === "string" &&
    (icon.endsWith(".png") ||
      icon.endsWith(".svg") ||
      icon.startsWith("/"));

  return (
    <div
      className="relative cursor-pointer transition-transform duration-300 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{ minHeight: 120 }}
    >
      {/* Gul overlay der animeres op nedefra */}
      <div
        className={`
          absolute left-0 bottom-0 w-full rounded-xl z-100
          bg-gold transition-all duration-400
          ${hovered ? "h-full opacity-100 pointer-events-auto" : "h-0 opacity-0 pointer-events-none"}
        `}
        style={{
          transitionProperty: "height, opacity",
        }}
      >
        {/* Tekst vises kun ved hover */}
        <div
          className={`flex flex-col items-center justify-center h-full p-6 transition-opacity duration-200 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-white text-sm text-center">{desc}</p>
        </div>
      </div>

      {/* Forside: ikon + titel */}
      <div
        className={`
          relative z-20 flex flex-col items-center justify-center p-6 h-full
          border border-dark bg-dark rounded-xl
          transition-opacity duration-300
          ${hovered ? "opacity-100" : "opacity-100"}
        `}
      >
        <div className="text-3xl mb-2">
          {isImage ? (
            <img
              src={icon}
              alt=""
              className="w-12 h-12 object-contain mx-auto"
            />
          ) : (
            icon
          )}
        </div>
        <h3 className="text-gold font-bold mb-2 text-lg">{title}</h3>
      </div>

      {/* Spacing div så kortet holder samme højde */}
      <div className="w-full min-h-[120px] opacity-0 pointer-events-none"></div>
    </div>
  );
}


// Kun export af AboutPage
function AboutPage() {
  return (
    <section className="w-full mt-20 py-20">
      {/* HERO */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-gold text-4xl font-bold mb-4">Mød din 3D-specialist fra Nordjylland</h1>
        <p className="text-white text-lg">Unikke 3D-print til hverdag og fest – personlig service, lokale løsninger.</p>
      </div>

      {/* 2-KOLONNE INTRO (full bleed bg) */}
      <div className="w-full bg-dark shadow mb-20 py-0">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-stretch px-6">
          {/* Venstre kolonne: tekst */}
          <div className="md:pl-12 flex flex-col justify-center">
            <h2 className="text-gold text-4xl font-bold mb-4">Hvem står bag?</h2>
            <p className="text-white text-lg mb-2">
              Hej! Jeg hedder Thomas, og jeg er manden bag 3Dazzle. Jeg startede denne lille hobbyshop ud fra min fascination for 3D-print og glæden ved at skabe noget unikt – både til hverdag og særlige lejligheder. Her handler det om kvalitet, personlig service og kreative løsninger, hvor der altid er plads til dine idéer.
            </p>
          </div>
          {/* Højre kolonne: billede */}
          <div className="flex items-end h-[500px]">
            <img
              src={Thomas}
              alt="Thomas fra 3Dazzle"
              className="w-full h-full object-cover rounded shadow-lg mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Fordel ved at være lille */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-gold text-2xl font-semibold mb-2">Fordelen ved at være lille</h2>
        <p className="text-white text-lg">
          Hos 3Dazzle får du personlig rådgivning og fleksibilitet, du ikke finder hos de store printerfarme. Jeg er ærlig om, at dette er mit passionerede sideprojekt – men det betyder, at hver eneste kunde og hver opgave får min fulde opmærksomhed. Her taler du direkte med mig, og jeg hjælper dig hele vejen fra idé til færdigt 3D-print.
        </p>
      </div>

      {/* USP/INFO-BOKSE (flip cards) */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-20 ">
        <FlipCard
          icon={adviceWhite}
          title="Personlig rådgivning"
          desc="Jeg står altid klar til at hjælpe – uanset om det handler om valg af materiale, funktion eller idéudvikling. Skriv endelig, så får du hurtig og ærlig vejledning direkte fra mig."
        />
        <FlipCard
          icon={fastResponse}
          title="Hurtig respons"
          desc="Du får altid svar hurtigt – jeg prioriterer din henvendelse og hjælper dig videre, så du slipper for at vente."
        />
        <FlipCard
          icon={handHeart}
          title="Nærvær og tryghed"
          desc="Hvert eneste 3D-print bliver lavet med omhu og passion. Her er der tid til detaljen, og jeg går aldrig på kompromis med kvaliteten."
        />
      </div>

      {/* GALLERI 
      <div className="w-full mx-auto grid grid-cols-2 gap-4 mb-20 bg-dark">
        <div>
          <img src="/img/bordkort.png" alt="" className="rounded shadow" />
          <p className="text-muted text-xs mt-2">Bordkort til bryllup</p>
        </div>
      </div>
      */}

      {/* CTA */}
      <div className="w-full bg-gold py-20 flex justify-center">
        <div className="flex flex-col md:flex-row items-center justify-evenly gap-10 max-w-5xl w-full px-0">
          <div className="flex-1 text-center md:text-left !max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Nysgerrig på mulighederne?
            </h2>
            <p className="text-lg text-white mb-6 md:mb-0">
              Send en besked – jeg svarer hurtigt og hjælper dig videre!
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="/kontakt"
              className="inline-block border-2 border-white text-white font-bold px-15 py-4 rounded hover:bg-dark hover:border-dark hover:text-white transition"
            >
              Kontakt mig!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
