// src/pages/ProductListPage.jsx
import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

// Kategori-array som objekter (label, value)
const allCategories = [
  { label: "Alle", value: "Alle" },
  { label: "Gamer", value: "gamer" },
  { label: "Kontor", value: "kontor" },
  { label: "Dekoration", value: "dekoration" },
  { label: "Navneskilte", value: "bordkort" }, // matcher products
  { label: "Organisering", value: "organisering" }
];

function ProductListPage() {
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [priceRange, setPriceRange] = useState([0, 500]);

  // Filtrer produkter
  const filteredProducts = products.filter((p) => {
    const categoryOk =
      selectedCategory === "Alle" || p.category === selectedCategory;
    const priceOk = p.price >= priceRange[0] && p.price <= priceRange[1];
    return categoryOk && priceOk;
  });

  return (
    <section className="w-full min-h-[90vh] flex flex-col mt-20">
      <h1 className="text-gold text-3xl font-bold mb-6">Udforsk vores sortiment</h1>

      {/* HORISONTAL FILTER BAR */}
      <div className="w-full mb-8">
        <div className="flex flex-col md:flex-row justify-center md:items-end md:gap-8 gap-4 bg-dark-gray p-4 shadow">
          {/* Kategori knapper */}
          <div>
            <label className="block text-gold font-bold text-sm mb-2"></label>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat.value}
                  className={`px-3 py-1 rounded font-semibold border transition 
                    ${selectedCategory === cat.value
                      ? "bg-gold text-dark border-gold"
                      : "bg-dark-gray text-white border-dark-gray hover:bg-gold hover:text-dark hover:border-gold"}`}
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          {/* Pris slider */}
          <div className="md:ml-8 flex flex-col">
            <label className="block text-gold font-bold text-sm mb-2">Pris</label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gold">{priceRange[0]} kr</span>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={priceRange[1]}
                onChange={e => setPriceRange([0, Number(e.target.value)])}
                className="w-[120px] accent-gold"
              />
              <span className="text-xs text-gold">{priceRange[1]} kr</span>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUKTER - grid */}
      <main className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.length === 0 && (
            <div className="col-span-3 text-white opacity-70 text-center py-10">
              Ingen produkter matcher dine filtre.
            </div>
          )}
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </main>
    </section>
  );
}

export default ProductListPage;
