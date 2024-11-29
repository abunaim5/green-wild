"use client"

import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useCategories = () => {
    const [categories, setCategories] = useState<{_id: string, name: string}[]>([]);
    const [categoryLoading, setCategoryLoading] = useState(true);
    // const [error, setError] = useState(null);

    const axiosPublic = useAxiosPublic();

    // fetch all categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosPublic.get('/categories');
                setCategories(res.data.categories);
                setCategoryLoading(false);
            } catch (err) {
                console.error(err)
                setCategoryLoading(false);
            }
        };

        fetchCategories();
    }, [axiosPublic]);

    return { categories, categoryLoading };
};

export default useCategories;