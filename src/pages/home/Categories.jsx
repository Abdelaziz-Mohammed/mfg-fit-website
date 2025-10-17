import { categoryImg1, categoryImg2, categoryImg3 } from "../../assets/index";

const categories = [
  {
    id: 1,
    name: "Equipments",
    image: categoryImg1,
  },
  {
    id: 2,
    name: "Clothing",
    image: categoryImg2,
  },
  {
    id: 3,
    name: "Customized",
    image: categoryImg3,
  },
];

function Categories() {
  return (
    <div className="bg-light-bg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-6 mx-auto w-fit">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col items-center justify-center gap-2">
              <img
                src={category.image}
                alt={category.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-neutral-300"
              />
              <h3 className="text-sm text-gray-600">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
