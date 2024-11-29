"use client"

import AnimalCard from "@/components/AnimalCard";
import Button from "@/components/Button";
import useAnimals from "@/hooks/useAnimals";
import useCategories from "@/hooks/useCategories";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Home() {
  // const category = ['Land Animal', 'Bird', 'Fish', 'Insect']
  const [category, setCategory] = useState<string>('all')
  const { categories, categoryLoading } = useCategories();
  const { animals, animalLoading } = useAnimals({ category });

  const handleCategory = (category: string) => {
    console.log(category);
    setCategory(category)
  };

  const handleAddCategory = e => {
    e.preventDefault();
  }

  return (
    <div className="h-[100vh]">
      <div className="flex justify-between mt-16">
        <div className="flex gap-6 text-white">
          {
            categoryLoading ? <h1>Loading...</h1> : categories.map(category => <Button key={category._id} name={category.name} handleCategory={handleCategory} />)
          }
        </div>
        <div className="flex gap-6 text-white">
          <Dialog>
            <DialogTrigger className="border-[1px] rounded-full px-5 py-4 min-w-[100px] text-white">Add Animal</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Animal</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddCategory}>
                <input type="text" />
                <button type="submit">Save</button>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className="border-[1px] rounded-full px-5 py-4 min-w-[100px] text-white">Add Category</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
              </DialogHeader>
              <form className="flex flex-col">
                <input type="text" placeholder='Name' className="bg-gray-100 px-4 py-2 rounded-md" />
                <button type="submit" className="bg-black text-white rounded-md mt-4 py-2 cursor-pointer">Save</button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-8 mt-20">
        {
          animalLoading ? <h1 className="text-white">Loading...</h1> : animals.map(animal => <AnimalCard key={animal._id} animal={animal} />)
        }
      </div>
    </div>
  );
}
