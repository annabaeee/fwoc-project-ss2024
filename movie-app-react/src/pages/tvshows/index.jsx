import { useQuery } from "@tanstack/react-query"
import { fetchTvShows } from "./query"
import { ColumnDisplay } from "../../components/card-display";
import { useState } from "react";
import { Ratings } from "../../context/ratings";

export const TvShows = () => {
    const [isLoadingRatings, setLoadingRatings] = useState(Ratings.isLoading);
    Ratings.setLoading = setLoadingRatings;

    const { data: tvShowData, isLoading: isLoadingTvShows } = useQuery({ queryKey: ["tvshows-popular"], queryFn: fetchTvShows });
    return (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {isLoadingTvShows || isLoadingRatings ? (
                <div>Loading...</div>
            ) : (
                tvShowData.map(item => <ColumnDisplay data={item} key={item.id}/>)
            )}
        </div>
    )
}