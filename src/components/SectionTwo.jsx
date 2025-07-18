import a1Printer from "../assets/a1-printer.jpg";
import CtaBtn from "./CtaBtn";
import { Link } from "react-router-dom"; // Tilføj dette!

function SectionTwo() {
  return (
    <section className="relative pt-24 pb-24 flex items-center justify-center bg-dark bg-fixed bg-center bg-cover">
      <div className="flex items-center text-white max-w-5xl gap-10 mx-auto w-full px-4">
        <div className="items-center w-1/2 space-y-4">
          <h2 className="!text-sm text-gold">GØR DINE I IDÉER TIL VIRKELIGHED</h2>
          <h1 className="!text-[32px]">Velkommen til 3DAZZLE</h1>
          <p className="text-lg">
            Hos 3DAZZLE brænder vi for 3D print – og for at gøre dine idéer til virkelighed.
            Vi designer og printer alt fra personlige bordkort til smarte gadgets – alt efter dine ønsker!
          </p>
          <Link to="/dev-alle-produkter">
            <CtaBtn className="bg-transparent">
              Udforsk vores sortiment
            </CtaBtn>
          </Link>
        </div>
        <div className="aspect-[4/3] w-full max-w-md">
          <img src={a1Printer} alt="at-printer" className="w-full h-full object-cover rounded" />
        </div>
      </div>
    </section>
  );
}

export default SectionTwo;
