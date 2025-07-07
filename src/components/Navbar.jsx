import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 text-[#5E5E5E] bg-[#F5F5f5] body-font p-5 shadow ">
      <div className="flex items-center justify-between w-full relative">
        <Link to="/" className="flex title-font font-medium items-center text-[#1C1C1C] mb-4 md:mb-0">
          <span className="ml-3 text-xl">3Dazzle</span>
        </Link>

        {/* Center menu */}
        <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-6">
          
          {/* Kategorier */}
          <div className="relative group">
            <a className="hover:text-[#1C1C1C] hover:underline cursor-pointer">Kategorier ▾</a>
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-60 rounded-md shadow-lg bg-[#F5F5f5] ring-opacity-5 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-20">
              <a href="#" className="block px-4 py-2 text-text hover:bg-overlay hover:text-[#1C1C1C] hover:underline rounded-md">Navneskilte & Bordkort</a>
              <a href="#" className="block px-4 py-2 text-text hover:bg-overlay hover:text-[#1C1C1C] hover:underline rounded-md">GamerTag & Headset-holder</a>
              <a href="#" className="block px-4 py-2 text-text hover:bg-overlay hover:text-[#1C1C1C] hover:underline rounded-md">Kabelholder & Småting</a>
              <a href="#" className="block px-4 py-2 text-text hover:bg-overlay hover:text-[#1C1C1C] hover:underline rounded-md">Gaveidéer</a>
            </div>
          </div>

          {/* Temaer */}
          <div className="relative group">
            <a className="hover:text-[#1C1C1C] hover:underline cursor-pointer">Temaer & Begivenheder ▾</a>
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-60 rounded-md shadow-lg bg-[#F5F5f5] ring-opacity-5 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-20">
              <a href="#" className="block px-4 py-2 text-text hover:bg-overlay hover:text-[#1C1C1C] hover:underline rounded-md">Bryllup</a>
              <a href="#" className="block px-4 py-2 text-text hover:bg-overlay hover:text-[#1C1C1C] hover:underline rounded-md">Konfirmation</a>
              <a href="#" className="block px-4 py-2 text-text hover:bg-overlay hover:text-[#1C1C1C] hover:underline rounded-md">Fødselsdag</a>
              <a href="#" className="block px-4 py-2 text-text hover:bg-overlay hover:text-[#1C1C1C] hover:underline rounded-md">Gaming</a>
            </div>
          </div>

          {/* Galleri */}
          <div className="relative group">
            <a className="hover:text-[#1C1C1C] hover:underline cursor-pointer">Galleri</a>
          </div>

          {/* Om 3Dazzle */}
          <div className="relative group">
            <a className="hover:text-[#1C1C1C] hover:underline cursor-pointer">Om 3Dazzle ▾</a>
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-60 rounded-md shadow-lg bg-[#F5F5f5] ring-opacity-5 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-20">
              <Link to="/about" href="#" className="block px-4 py-2 text-text hover:bg-overlay hover:text-[#1C1C1C] hover:underline rounded-md">Hvem er vi?</Link>
              <a href="#" className="block px-4 py-2 text-text hover:bg-overlay hover:text-[#1C1C1C] hover:underline rounded-md">Pris & Fragt</a>
              <a href="#" className="block px-4 py-2 text-text hover:bg-overlay hover:text-[#1C1C1C] hover:underline rounded-md">Om produktionen</a>
            </div>
          </div>

          {/* Kontakt */}
          <div className="relative group">
            <Link to="/contact" className="hover:text-[#1C1C1C] hover:underline cursor-pointer">
              Kontakt
            </Link>
          </div>
        </nav>

        {/* Cart Button */}
        <button className="inline-flex items-center bg-[#F5F5f5] border-0 py-1 px-3 focus:outline-none rounded text-[#1C1C1C] hover:text-[#1C1C1C] text-base mt-4 md:mt-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="w-7 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 0 0 7.5 17h9m0 0a1 1 0 1 0 0-2m0 2a1 1 0 1 1 0-2" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
