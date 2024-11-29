"use client"

import Image from "next/image";

const AnimalCard = (animals: {animal: {name: string, image: string}}) => {
    console.log(animals);
    return (
        <div className="flex flex-col items-center w-full">
             <Image src={animals.animal.image} alt="asd" width={160} height={191} priority />
             <h1 className="text-white uppercase">{animals.animal.name}</h1>
        </div>
    );
};

export default AnimalCard;