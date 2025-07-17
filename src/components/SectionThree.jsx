import CategoryCard from "../components/CategoryCard";
import Bordkort from "../assets/bordkort.png";
import DeskOrganizer from "../assets/desk-organizer.png";
import HeadsetStand from "../assets/headset-stand.png";

const favorites = [
  {
    slug: "bordkort",
    title: "Kreative bordkort",
    description: "Skab et flot og unikt udtryk til festen med 3D printede bordkort. Vælg mellem forskellige designs, farver og skrifttyper.",
    image: Bordkort,
  },
  {
    slug: "penneholder",
    title: "Stilfulde penneholdere",
    description: "Hold styr på kuglepenne og småting med moderne 3D-printede holdere – både praktisk og dekorativt til skrivebordet.",
    image: DeskOrganizer,
  },
  {
    slug: "headset-stand",
    title: "Headset stander",
    description: "Få styr på dit gamer-setup eller kontoret med en 3D-printet headset stander, der både beskytter og fremhæver dit udstyr på skrivebordet.",
    image: HeadsetStand,
  }
];

function SectionThree() {
    return (
        <section className="bg-dark-gray py-20">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="!text-sm !font-semibold text-gold mb-8">UDVALGTE FAVORITTER</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {favorites.map((fav) => (
                        <CategoryCard key={fav.slug} category={fav} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SectionThree;
