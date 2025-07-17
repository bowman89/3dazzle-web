import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useState, useMemo } from "react";

// Rabattrin kun for bordkort
function calcUnitPrice(qty) {
  if (qty >= 50) return 22;
  if (qty >= 25) return 28;
  if (qty >= 10) return 32;
  return 35;
}

function ProductPage() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);

  // Hooks – kaldes altid øverst!
  const [names, setNames] = useState("");  // kun til navne-produkter
  const [qty, setQty] = useState(1);       // kun til alm. produkter

  const nameList = useMemo(
    () =>
      names
        .split("\n")
        .map((n) => n.trim())
        .filter(Boolean),
    [names]
  );
  const nameQty = nameList.length;
  const unitPrice = calcUnitPrice(nameQty);
  const totalPrice = nameQty * unitPrice;

  const addToCart = (item) => {
    alert(JSON.stringify(item, null, 2));
  };

  if (!product) return <div>Produktet findes ikke</div>;

  // ----------- NAVNE-PRODUKT -----------
  if (product.nameInput) {
    return (
      <div className="max-w-6xl mx-auto px-4 mt-32">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Venstre: billede */}
<div className="w-full md:w-1/2 flex flex-col h-full justify-stretch">
  <img
    src={product.image}
    alt={product.name}
    className={
      "object-cover rounded shadow w-full h-auto " +
      (product.nameInput ? "md:max-h-[600px] md:min-h-[350px]" : "md:max-h-[350px]")
    }
    style={product.nameInput ? { minHeight: "350px" } : {}}
  />
</div>


          {/* Højre: info */}
          <div className="w-full md:w-1/2 flex flex-col justify-start">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="mb-2 text-base font-medium">{product.description}</p>
            {product.details && (
              <ul className="my-3 text-sm text-gray-800 list-disc pl-6">
                {product.details.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            )}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Skriv ét navn per linje</label>
              <textarea
                className="border px-3 py-2 rounded w-full min-h-[80px]"
                placeholder={`fx:\nMikkel\nHans\nMalene`}
                value={names}
                onChange={e => setNames(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">
                {nameQty > 0
                  ? `${nameQty} bordkort tilføjes • ${unitPrice} kr/stk • Samlet: ${totalPrice} kr`
                  : "Indtast navne ovenfor"}
              </p>
            </div>
            <button
              className="bg-black text-white font-semibold px-6 py-3 rounded hover:bg-gold hover:text-black transition mb-4"
              disabled={nameQty === 0}
              onClick={() =>
                addToCart({
                  ...product,
                  qty: nameQty,
                  unitPrice,
                  price: totalPrice,
                  customNames: nameList,
                })
              }
            >
              Læg i kurven for {nameQty > 0 ? `${totalPrice} kr` : "–"}
            </button>
            <div className="mt-2 text-sm text-gray-700 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-lg">✔️</span>
                Levering: 2-5 hverdage • Produceret i Danmark
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-lg">✔️</span>
                30 dages returret • Fragt fra 45 kr.
              </div>
            </div>
          </div>
        </div>
        {/* Full width sektion under grid: Lang beskrivelse */}
        {product.longDescription && (
          <div className="max-w-6xl mx-auto mt-12 text-base text-gray-700 px-0">
            <h2 className="text-2xl font-bold mb-2">Om produktet</h2>
            <p>{product.longDescription}</p>
          </div>
        )}
      </div>
    );
  }

  // ----------- ALMINDELIGT PRODUKT -----------
  return (
    <div className="max-w-5xl mx-auto px-4 mt-32">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Venstre: billede */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md rounded shadow mb-4"
          />
        </div>
        {/* Højre: info */}
        <div className="w-full md:w-1/2 flex flex-col justify-start">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="mb-2 text-base font-medium">{product.description}</p>
          {product.details && (
            <ul className="my-3 text-sm text-gray-800 list-disc pl-6">
              {product.details.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          )}
          {/* Antalvælger */}
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => setQty(q => Math.max(1, q-1))} className="px-2 py-1 border rounded">-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(q => q+1)} className="px-2 py-1 border rounded">+</button>
            <button
              className="bg-black text-white font-semibold px-6 py-2 rounded ml-4 hover:bg-gold hover:text-black transition"
              onClick={() =>
                addToCart({
                  ...product,
                  qty,
                  price: product.price,
                })
              }
            >
              Føj til indkøbskurven
            </button>
          </div>
          <div className="mt-2 text-sm text-gray-700 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-lg">✔️</span>
              Levering: 2-5 hverdage • Produceret i Danmark
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-lg">✔️</span>
              30 dages returret • Fragt fra 45 kr.
            </div>
          </div>
        </div>
      </div>
      {/* Full width sektion under grid: Lang beskrivelse */}
      {product.longDescription && (
        <div className="max-w-6xl mx-auto mt-12 text-base text-gray-700 px-4">
          <h2 className="text-2xl font-bold mb-2">Om produktet</h2>
          <p>{product.longDescription}</p>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
