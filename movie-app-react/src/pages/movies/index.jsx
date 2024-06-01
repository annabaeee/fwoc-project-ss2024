import { useQuery } from "@tanstack/react-query"
import { fetchPopularMovies } from "./query"
import { ColumnDisplay } from "../../components/card-display";
import { useState } from "react";
import { Ratings } from "../../context/ratings";

export const PopularMovies = () => {
    const [isLoadingRatings, setLoadingRatings] = useState(Ratings.isLoading);
    Ratings.setLoading = setLoadingRatings;

    const { data: popMovieData, isLoading: isLoadingPopMovies } = useQuery({ queryKey: ["movies-popular"], queryFn: fetchPopularMovies });
    return (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {isLoadingPopMovies || isLoadingRatings ? (
                <div>Loading...</div>
            ) : (
                popMovieData.map(item => <ColumnDisplay data={item} key={item.id}/>)
            )}
        </div>
    )
}