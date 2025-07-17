import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard"; // Juster path hvis nødvendigt

const categories = [
  {
    slug: "bordkort",
    title: "Bordkort",
    description: "Unikke 3D-printede bordkort – perfekte til bryllup, fest eller middag.",
    image: "/img/img-dummy.png"
  },
  {
    slug: "kontor",
    title: "Kontor",
    description: "Gør arbejdsdagen sjovere med smarte 3D-printede kontorartikler.",
    image: "/img/img-dummy.png"
  },
  {
    slug: "noegleringe",
    title: "Nøgleringe",
    description: "Gør dit nøglebundt personligt med søde, sjove eller stilfulde nøgleringe.",
    image: "/img/img-dummy.png"
  },
  // Tilføj flere kategorier her
];

export default function AllCategoriesPage() {
  return (
    <div className="bg-dark-gray min-h-screen mt-[90px] px-4 py-20">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gold mb-4">Vores Produkter</h1>
        <p className="text-lg text-white">
          Udforsk vores udvalg af kreative 3D-printede løsninger – vælg en kategori for at se produkterne.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {categories.map(category => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}
