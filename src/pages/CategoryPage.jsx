import { useParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

// Definer kategori-indhold
const categoryContent = {
  bordkort: {
    title: "Bordkort",
    description:
      "Vores kreative bordkort tilføjer et personligt præg til enhver fest eller middag. Disse unikke 3D-printede bordkort kan tilpasses med navne og temaer, der passer til din begivenhed. De er lavet af holdbare materialer og har et elegant design, der gør dem til en perfekt dekoration. Uanset om det er til bryllupper, fødselsdage eller andre festligheder, vil disse bordkort imponere dine gæster. Skab en uforglemmelig atmosfære med vores stilfulde bordkort, der ikke blot er praktiske, men også en fryd for øjet. Gør dit arrangement særligt med et strejf af kreativitet."
  },
  kontor: {
    title: "Kontor",
    description:
      "Gør din arbejdsdag mere effektiv med vores smarte kontorprodukter. Vi tilbyder alt fra praktiske 3D-printede blyantholdere til unikke navneskilte og kabelholdere, der hjælper med at skabe struktur på skrivebordet. Alle produkter kan tilpasses efter dine ønsker og behov."
  }
  // Tilføj flere kategorier her
};

function CategoryPage() {
  const { slug } = useParams();

  // Slå op i objektet, eller brug en default hvis slug ikke findes
  const content = categoryContent[slug] || {
    title: "Produkter",
    description: "Her finder du et udvalg af vores produkter. Vælg en kategori for at læse mere."
  };

  const filteredProducts = products.filter(
    (product) => product.category === slug
  );

  return (
    <div className="bg-dark-gray min-h-[100vh] mt-[90px] mx-auto px-0">
      <div className="max-w-5xl mx-auto px-4 py-20">
        <h1 className="!text-sm font-bold mb-2.5 text-gold">{content.title}</h1>
        <p className="text-base text-white mb-5">{content.description}</p>
        {filteredProducts.length === 0 ? (
          <p>Ingen produkter fundet i denne kategori.</p>
        ) : (
          <div className="grid grid-cols-1 max-w-5xl md:grid-cols-3 gap-8 mt-10 items-stretch">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <div className="w-full bg-gold py-20 flex justify-center">
        <div className="flex flex-col md:flex-row items-center justify-evenly gap-10 max-w-5xl w-full px-0">
          <div className="flex-1 text-center md:text-left !max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Har du brug for hjælp?
            </h2>
            <p className="text-lg text-white mb-6 md:mb-0">
              Uanset om du er klar til at bestille, har spørgsmål til et produkt – eller bare mangler et kreativt input, står vi altid klar til at hjælpe dig.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="/kontakt"
              className="inline-block border-2 border-white text-white font-bold px-15 py-4 rounded hover:bg-dark hover:border-dark hover:text-white transition"
            >
              Skriv til os!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
