"use client"

import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
// import { debounce } from "lodash";

const useAnimals = ({category}: {category: string}) => {
    console.log(category);
    const [animals, setAnimals] = useState<{_id: string, name: string, image: string}[]>([]);
    const [animalLoading, setAnimalLoading] = useState(true);
    // const [error, setError] = useState(null);

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const res = await axiosPublic.get(`/animals?filter=${category}`);
                setAnimals(res.data.animals || []);
                setAnimalLoading(false);
            } catch (err) {
                console.error(err)
                setAnimalLoading(false);
            }
        };

        fetchAnimals();
    }, [axiosPublic, category]);


    return {animals, animalLoading};
};

export default useAnimals;