import { useQuery } from "@tanstack/react-query"
import { fetchTrending } from "./query"
import { CardDisplay } from "../../components/card-display";
import { Ratings } from "../../context/ratings";
import { useState } from "react";
import { LoadingSkeleton } from "../../components/skeleton";

export const Home = () => {
    const [isLoadingRatings, setLoadingRatings] = useState(Ratings.isLoading);
    Ratings.setLoading = setLoadingRatings;

    const { data: results, isLoading } = useQuery({ queryKey: ["trending"], queryFn: fetchTrending });
    return (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            { isLoading || isLoadingRatings ? (
                <LoadingSkeleton />
            ) : (
                results.map(item => <CardDisplay data={item} key={item.id}/>)
            )}
        </div>
    )
}