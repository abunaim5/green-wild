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
import useAxiosPublic from "@/hooks/useAxiosPublic";

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function Home() {
  const [category, setCategory] = useState<string>('all');
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFileName] = useState<string>('Image');
  const { categories, categoryLoading, refetchCategory } = useCategories();
  const { animals, animalLoading } = useAnimals({ category });
  const axiosPublic = useAxiosPublic();

  // handle filter category
  const handleCategory = (category: string) => {
    setCategory(category);
  };

  // handle add category
  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!form.category.value) return;

    try {
      const res = await axiosPublic.post('/category', {
        name: form.category.value
      });
      if (res.data.success) {
        alert('success')
        refetchCategory();
        form.reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // handle file change when upload image
  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const uploadFile = e.target as HTMLInputElement;
    const file = uploadFile.files?.[0];
    setFileName(file ? file.name : 'Image');
    setFile(file ? file : null);
  };
  console.log(file);

  // handle add animal
  const handleAddAnimal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!file) return;

    // Upload Image to Imagebb hosting site
    try {
      const res = await axiosPublic.post(image_hosting_api, { image: file }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data.success) {
        const animalData = {
          name: form.animal.value,
          image: res.data.data.display_url,
          category: form.category.value
        };
        
        // Add animal to the mongoDB database
        try {
          const res = await axiosPublic.post('/animal', animalData);
          if (res.data.success) {
            alert('success');
          }
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-[100vh]">
      <div className="flex justify-between mt-16">
        <div className="flex gap-6 text-white">
          {
            categoryLoading ? <h1>Loading...</h1> : categories.map(category => <Button key={category._id} name={category.name} handleCategory={handleCategory} />)
          }
        </div>
        <div className="flex gap-6 text-white">
          <button className="border-[1px] rounded-full px-5 py-4 min-w-[100px] text-white hover:bg-[#058F34] hover:border-[#058F34] transition-all duration-500">Sort By A-Z</button>

          {/* Add Animal Modal */}
          <Dialog>
            <DialogTrigger className="border-[1px] rounded-full px-5 py-4 min-w-[100px] text-white hover:bg-[#058F34] hover:border-[#058F34] transition-all duration-500">Add Animal</DialogTrigger>
            <DialogContent aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle>Add Animal</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddAnimal} className="flex flex-col gap-4">
                <input type="text" name="animal" placeholder='Name' className="bg-gray-100 px-4 py-2 rounded-md focus:outline-none" />
                <select name="category" id="category" defaultValue='select' className="bg-gray-100 px-4 py-2 rounded-md focus:outline-none">
                  <option value='select' disabled>Select Category</option>
                  {
                    categories.map(category => <option key={category._id} value={category.name} className={category.name === 'All' ? 'hidden' : ''}>{category.name}</option>)
                  }
                </select>
                <div className="flex items-center justify-between w-full bg-gray-100 px-4 py-2 rounded-md">
                  <span>{filename}</span>
                  <label htmlFor="image" className="cursor-pointer bg-gray-300 rounded-md px-2">
                    upload
                    <input onChange={handleFileChange} type="file" id="image" name="image" className="hidden" />
                  </label>
                </div>
                <button type="submit" className="bg-black hover:bg-gray-800 text-white rounded-md mt-4 py-2 cursor-pointer">Create Animal</button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Add Category Modal */}
          <Dialog>
            <DialogTrigger className="border-[1px] rounded-full px-5 py-4 min-w-[100px] text-white hover:bg-[#058F34] hover:border-[#058F34] transition-all duration-500">Add Category</DialogTrigger>
            <DialogContent aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddCategory} className="flex flex-col">
                <input type="text" name="category" placeholder='Name' className="bg-gray-100 px-4 py-2 rounded-md focus:outline-none" />
                <button type="submit" className="bg-black hover:bg-gray-800 text-white rounded-md mt-8 py-2 cursor-pointer">Save</button>
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
