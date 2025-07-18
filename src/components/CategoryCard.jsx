import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link to={`/dev-category/${category.slug}`} className="group h-full block">
      <div className="bg-dark shadow-lg rounded flex flex-col h-full transition-transform duration-300 hover:scale-105">

        <div className="w-full h-60 overflow-hidden rounded-t">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-white font-bold !text-lg mb-2 pb-1 relative flex items-center">
            <span
              className="
                relative inline-block
                transition-colors duration-200
                after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-gold after:rounded
                after:w-full
                after:transition-transform after:duration-400 after:origin-bottom after:scale-y-0
                group-hover:text-gold group-hover:after:scale-y-100
              "
            >
              {category.title}
            </span>
            <span className="ml-1 text-white group-hover:text-gold duration-200">{'>'}</span>
          </h3>
          <p className="text-gray-300 text-base mb-2">
            {category.description || "Beskrivelse mangler..."}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
