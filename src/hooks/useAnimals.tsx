"use client"

import { useCallback, useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useAnimals = ({category}: {category: string}) => {
    const [animals, setAnimals] = useState<{_id: string, name: string, image: string}[]>([]);
    const [animalLoading, setAnimalLoading] = useState(true);
    // const [error, setError] = useState(null);

    const axiosPublic = useAxiosPublic();

    const fetchAnimals = useCallback(async () => {
        try {
            const res = await axiosPublic.get(`/animals?filter=${category}`);
            setAnimals(res.data.animals);
            console.log(res.data.animals)
            setAnimalLoading(false);
        } catch (err) {
            console.error(err)
            setAnimalLoading(false);
        }
    }, [axiosPublic, category]);

    useEffect(() => {
        fetchAnimals();
    }, [fetchAnimals]);


    return {animals, animalLoading, refetchAnimals: fetchAnimals};
};

export default useAnimals;