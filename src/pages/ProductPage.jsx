import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useState, useMemo } from "react";
import CtaBtn from "../components/CtaBtn";
import popUpIcon from "../assets/pop-up.png";

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
  console.log(productId, product); // Tilføj denne linje

  // Hooks – kaldes altid øverst!
  const [names, setNames] = useState("");  // kun til navne-produkter
  const [qty, setQty] = useState(1);       // kun til alm. produkter
  const [showModal, setShowModal] = useState(false); // til modal

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
      <div className="w-full mx-auto px-50 py-20 mt-20">
        <div className="flex flex-col md:flex-row gap-12 bg-dark px-10 py-10 items-center rounded shadow">

{/* Venstre: billede */}
          <div className="w-full md:w-1/2 flex flex-col h-full justify-stretch">
            <img
  src={product.image}
  alt={product.name}
  className="object-cover rounded shadow w-full md:max-w-[600px] md:min-w-[350px] md:max-h-[400px] md:min-h-[350px]"
  style={{ minHeight: "350px" }}
/>

          </div>

{/* Højre: info */}
          <div className="max-w-xl md:w-1/2 flex flex-col justify-start">
            <h1 className="!text-4xl font-bold mb-4 text-gold">{product.name}</h1>
            <p className="mb-2 text-base font-medium text-white">{product.description}</p>
            {product.details && (
              <ul className="my-3 text-sm text-muted list-disc pl-6">
                {product.details.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            )}
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-gold"></label>
{/* Knappen der åbner modal */}
              <button
                className="w-[200px] bg-dark border-1 border-gold text-white rounded px-3 py-2 hover:border-gold-hover hover:text-white transition cursor-pointer"
                onClick={() => setShowModal(true)}
                type="button"
              >
                {nameQty > 0 ? "Ret navne" : "Indtast navne"}
                <img
                  src={popUpIcon}
                  alt=""
                  className="w-4 h-4 ml-4 inline-block align-middle"
                />
              </button>
              <p className="!text-xs  text-muted mt-1">
                {nameQty > 0
                  ? `${nameQty} bordkort tilføjes • ${unitPrice} kr/stk • Samlet: ${totalPrice} kr`
                  : "Ingen navne indtastet"}
              </p>
            </div>
            <CtaBtn
              className={`max-w-90 font-semibold px-6 py-3 rounded mb-4 transition
                ${
                  nameQty === 0
                    ? "bg-zinc-800 !text-muted !border-dark-gray !rounded !cursor-not-allowed !hover:bg-zinc-800 !hover:text-white"
                    : "bg-gold text-white hover:bg-gold hover:text-black"
                }
              `}
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
              {nameQty > 0
                ? `Læg i kurven for ${totalPrice} kr.`
                : "Indtast mindst ét navn"}
            </CtaBtn>
            <div className="mt-2 text-sm text-muted space-y-1">
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
          <div className="w-full mx-auto mt-0 text-base bg-dark text-gray-700 p-10">
            <h2 className="!text-2xl font-bold mb-2 text-white">Om produktet</h2>
            <p className="text-muted">{product.longDescription}</p>
          </div>
        )}

{/* Modal – kun synlig hvis showModal */}
        {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-dark p-8 rounded shadow-lg w-full max-w-md relative">
            <h3 className="text-lg font-semibold mb-2 text-gold">Indtast navne (ét per linje)</h3>
            <textarea
              className="border px-3 py-2 rounded w-full min-h-[120px] text-white placeholder-neutral-500"
              placeholder={`fx:\nMikkel\nHans`}
              value={names}
              onChange={e => setNames(e.target.value)}
              style={{ resize: "none" }}
            />
            <p className="text-sm text-white mt-3">
              {nameQty > 0
                ? `${nameQty} bordkort tilføjes • ${unitPrice} kr/stk • Samlet: ${totalPrice} kr`
                : "Indtast navne ovenfor"}
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={() => setShowModal(false)}
                type="button"
              >
                Luk
              </button>
              <button
                className="bg-gold text-black px-4 py-2 rounded font-semibold hover:bg-yellow-500"
                onClick={() => setShowModal(false)}
                type="button"
              >
                Gem navne
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    );
  }

  // ----------- ALMINDELIGT PRODUKT -----------
return (
  <div className="w-full mx-auto px-50 py-20 mt-20">
    <div className="flex flex-col md:flex-row gap-12 bg-dark px-10 py-10 items-center rounded shadow">

      {/* Venstre: billede */}
      <div className="w-full md:w-1/2 flex flex-col h-full justify-stretch">
        <img
  src={product.image}
  alt={product.name}
  className="object-cover rounded shadow w-full md:max-w-[600px] md:min-w-[350px] md:max-h-[400px] md:min-h-[350px]"
  style={{ minHeight: "350px" }}
/>

      </div>

      {/* Højre: info */}
      <div className="max-w-xl md:w-1/2 flex flex-col justify-start">
        <h1 className="!text-4xl font-bold mb-4 text-gold">{product.name}</h1>
        <p className="mb-2 text-base font-medium text-white">{product.description}</p>
        {product.details && (
          <ul className="my-3 text-sm text-muted list-disc pl-6">
            {product.details.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        )}

        {/* Antalvælger + CtaBtn (samme bredde/layout som navneprodukt) */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="px-2 py-1 border border-muted text-muted bg-dark-gray rounded"
            >
              -
            </button>
            <span className="w-8 text-center text-white font-mono inline-block">
            {qty}
            </span>

            <button
              onClick={() => setQty(q => q + 1)}
              className="px-2 py-1 border border-muted text-muted bg-dark-gray rounded"
            >
              +
            </button>
            <CtaBtn
              className="max-w-90 font-semibold px-6 py-3 rounded transition"
              onClick={() =>
                addToCart({
                  ...product,
                  qty,
                  price: product.price,
                })
              }
            >
              Føj til indkøbskurven
            </CtaBtn>
          </div>
        </div>
        <div className="mt-2 text-sm text-muted space-y-1">
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
      <div className="w-full mx-auto mt-0 text-base bg-dark text-gray-700 p-10">
        <h2 className="!text-2xl font-bold mb-2 text-white">Om produktet</h2>
        <p className="text-muted">{product.longDescription}</p>
      </div>
    )}
  </div>
);

}

export default ProductPage;
