"use client"

import Button from "@/components/Button";
import useCategories from "@/hooks/useCategories";

export default function Home() {
  // const category = ['Land Animal', 'Bird', 'Fish', 'Insect']
  const {categories, loading} = useCategories();
  console.log(categories);

  return (
    <div className="flex justify-between mt-16">
      <div className="flex gap-6 text-white">
        {
          loading ? <h1>Loading...</h1> : categories.map(category => <Button key={category._id} name={category.name} />)
        }
      </div>
      <div className="flex gap-6 text-white">
        <button className="border-[1px] rounded-full px-5 py-4 min-w-[100px] text-white">Add Animal</button>
        <button className="border-[1px] rounded-full px-5 py-4 min-w-[100px] text-white">Add Category</button>
      </div>
    </div>
  );
}
