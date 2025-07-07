import { useRef, useState } from "react";
import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import product3 from "../assets/product3.jpg";
import product4 from "../assets/product4.jpg";
import product5 from "../assets/product5.jpg";

const products = [
  { image: product1, label: "Nyhed", labelColor: "bg-green-500", title: "Produkt 1" },
  { image: product2, label: "Populær", labelColor: "bg-red-500", title: "Produkt 2" },
  { image: product3, label: null, labelColor: "", title: "Produkt 3" },
  { image: product4, label: null, labelColor: "", title: "Produkt 4" },
  { image: product5, label: "Limited", labelColor: "bg-blue-500", title: "Produkt 5" }
];

// **Let styring her:**
const CARD_WIDTH = 800;
const CARD_HEIGHT = 400;
const IMAGE_HEIGHT = 350;
const CARD_GAP = 48; // Afstand mellem kort
const VISIBLE_CARDS = 3;

export default function ProductShowcase() {
  const clonesBefore = products.slice(-VISIBLE_CARDS);
  const clonesAfter = products.slice(0, VISIBLE_CARDS);
  const carouselItems = [...clonesBefore, ...products, ...clonesAfter];

  const [index, setIndex] = useState(VISIBLE_CARDS);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);

  function next() {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(prev => prev + 1);
  }

  function prev() {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(prev => prev - 1);
  }

  function onTransitionEnd() {
    let newIndex = index;
    if (index === 0) {
      newIndex = products.length;
      updateNoAnim(newIndex);
    }
    if (index === products.length + VISIBLE_CARDS) {
      newIndex = VISIBLE_CARDS;
      updateNoAnim(newIndex);
    }
    setIsAnimating(false);
  }

  function updateNoAnim(newIndex) {
    if (containerRef.current) {
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateX(-${newIndex * (CARD_WIDTH + CARD_GAP)}px)`;
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = "";
        }
      });
    }
    setIndex(newIndex);
  }

  const transformValue = `translateX(-${index * (CARD_WIDTH + CARD_GAP)}px)`;

  return (
    <section className="py-8">
      <div
        className="max-w-[1800px] mx-auto flex flex-col items-center relative"
      >
        {/* PIL VENSTRE */}
        <button
          onClick={prev}
          disabled={isAnimating}
          className="w-14 h-14 rounded-full border flex items-center justify-center hover:bg-gray-100 text-2xl transition absolute left-0 top-1/2 -translate-y-1/2 z-10"
          style={{ top: '400px', left: '550px', position: 'absolute' }}
          aria-label="Forrige"
        >←</button>

        {/* CAROUSEL */}
        <div
          className="overflow-hidden"
          style={{
            width: (CARD_WIDTH + CARD_GAP) * VISIBLE_CARDS - CARD_GAP,
            height: CARD_HEIGHT
          }}
        >
          <div
            ref={containerRef}
            className="flex"
            style={{
              gap: `${CARD_GAP}px`,
              width: `${carouselItems.length * (CARD_WIDTH + CARD_GAP)}px`,
              transform: transformValue,
              transition: isAnimating ? "transform 0.6s cubic-bezier(.55,0,.1,1)" : "none"
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {carouselItems.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl flex flex-col items-center relative"
                style={{
                  width: `${CARD_WIDTH}px`,
                  height: `${CARD_HEIGHT}px`,
                  // Border er fjernet! (ingen border)
                }}
              >
                {p.label && (
                  <span className={`absolute top-6 left-6 px-3 py-1 text-xs font-bold text-white rounded ${p.labelColor}`}>
                    {p.label}
                  </span>
                )}
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full object-cover rounded-xl"
                  style={{
                    height: IMAGE_HEIGHT,
                    minHeight: IMAGE_HEIGHT,
                    maxHeight: IMAGE_HEIGHT
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* PIL HØJRE */}
        <button
          onClick={next}
          disabled={isAnimating}
          className="w-14 h-14 rounded-full border flex items-center justify-center hover:bg-gray-100 text-2xl transition absolute right-0 top-1/2 -translate-y-1/2 z-10"
          style={{ top: '400px',  right: '550px', position: 'absolute' }}
          aria-label="Næste"
        >→</button>
      </div>
    </section>
  );
}
