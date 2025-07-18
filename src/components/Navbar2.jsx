import { Link, NavLink } from "react-router-dom";
import NavLogo from "../assets/3DAZZLE-SVG.svg?react";
import { productGroups } from "./productGroups";

// Navlinks array (Kontakt har special styling)
const NavLinks = [
  { name: "Forside", to: "/dev-home2" },
  { name: "Om", to: "/dev-om2" },
  { name: "Kontakt", to: "/dev-kontakt2", special: true },
];

// Genbruglig className-funktion
const navLinkClasses = ({ isActive, special }) => {
  if (special) {
    // Styling KUN til Kontakt
    return [
      "text-white text-base font-poppins px-[30px] py-[10px] rounded border border-white font-medium transition-colors duration-200",
      isActive
        ? "bg-gold border-gold text-dark"
        : "hover:bg-gold hover:text-white hover:border-gold"
    ].join(" ");
  }
  // Styling til almindelige links med VERTIKAL underline-animation
  return [
    "relative px-1 pb-1 transition-colors duration-200",
    "after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:rounded after:transition-transform after:duration-400 after:origin-bottom",
    isActive
      ? "text-gold after:bg-gold after:scale-y-100"
      : "hover:text-gold hover:font-sm after:bg-gold after:scale-y-0 hover:after:scale-y-100"
  ].join(" ");
};

function Navbar2() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 text-white bg-dark body-font p-5 shadow">
      <div className="flex items-center justify-between max-w-[1920px] h-[50px] mx-auto relative px-4 md:px-8 lg:px-16">
        {/* LOGO TILFØJET HER */}
        <Link to="/dev-home2" className="flex items-center title-font font-medium text-white">
          <NavLogo className="h-10 w-auto" />
        </Link>

        <nav>
  <div className="flex items-center gap-6 text-sm font-light relative text-white">
    
    
    {/* Forside */}
    <NavLink
      to="/dev-home2"
      className={({ isActive }) =>
        navLinkClasses({ isActive, special: false })
      }
    >
      Forside
    </NavLink>

      {/* --- PRODUKTER DROPDOWN START --- */}
<div className="relative group">
  <NavLink
    to="/dev-produkter"
    className={({ isActive }) => navLinkClasses({ isActive, special: false })}
  >
    Produkter
  </NavLink>
        {/* DROPDOWN */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 bg-white text-dark rounded shadow-xl opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-50 border border-gray-300 p-8 flex gap-8"
          style={{ pointerEvents: "auto" }}>
          {/* Dropdown-content fra productGroups */}
          {productGroups.map((group) => (
            <div key={group.title} className="min-w-[200px]">
              <h4 className="font-semibold !text-xs uppercase mb-3 tracking-wide border-b border-gray-300">{group.title}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="block text-sm text-gray-700 hover:text-gold py-1"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* --- PRODUKTER DROPDOWN SLUT --- */}
    
    {/* Om */}
    <NavLink
      to="/dev-about"
      className={({ isActive }) =>
        navLinkClasses({ isActive, special: false })
      }
    >
      Om
    </NavLink>


    {/* Kontakt */}
    <NavLink
      to="/dev-kontakt2"
      className={({ isActive }) =>
        navLinkClasses({ isActive, special: true })
      }
    >
      Kontakt
    </NavLink>
  </div>
</nav>

      </div>
    </header>
  );
}

export default Navbar2;
