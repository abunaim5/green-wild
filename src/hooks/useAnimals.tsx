"use client"

import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useAnimals = () => {
    const [animals, setAnimals] = useState<{_id: string, name: string, image: string}[]>([]);
    const [animalLoading, setAnimalLoading] = useState(true);
    // const [error, setError] = useState(null);

    const axiosPublic = useAxiosPublic();

    // fetch all animals
    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const res = await axiosPublic.get('/animals');
                setAnimals(res.data.animals);
                setAnimalLoading(false);
            } catch (err) {
                console.error(err)
                setAnimalLoading(false);
            }
        };

        fetchAnimals();
    }, [axiosPublic]);


    return {animals, animalLoading};
};

export default useAnimals;