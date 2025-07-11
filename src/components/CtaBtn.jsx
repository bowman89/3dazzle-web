// src/components/Button.jsx
export default function CtaBtn({ children, onClick, className = "" }) {
  return (
    <button
      className={`relative inline-flex text-zinc-800 bg-yellow-300 border-0 py-2 px-6 focus:outline-none rounded text-lg font-bold group overflow-hidden transition-shadow duration-200 hover:shadow-lg cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
