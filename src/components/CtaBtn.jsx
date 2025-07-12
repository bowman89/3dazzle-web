// src/components/Button.jsx
export default function CtaBtn({ children, onClick, className = "" }) {

  return (
    <button
      className={`inline-flex items-center justify-center
      text-white
      bg-gold
      border-2 border-gold
      rounded-[2px]
      font-poppins font-semibold
      uppercase tracking-wide
      text-base
      px-[30px] py-[10px]
      min-h-[50px]
      transition-all duration-150 ease-in-out
      shadow
      hover:bg-gold-hover hover:border-gold-hover
      focus:outline-none focus:ring-2 focus:ring-gold
      ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

