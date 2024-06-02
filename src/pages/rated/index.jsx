import { useQuery, useIsMutating } from "@tanstack/react-query";
import { fetchRated } from "./query";
import { CardDisplay } from "../../components/card-display";
import { useState } from "react";
import { Ratings } from "../../context/ratings";
import { LoadingSkeleton } from "../../components/skeleton";

export const Rated = () => {
    const [isLoadingRatings, setLoadingRatings] = useState(Ratings.isLoading);
    Ratings.setLoading = setLoadingRatings;

    const calculateRefetchInterval = (query) => {
        // Wait a few seconds after the last rating update before stopping the refetch
        const ratings_updated = localStorage.getItem("ratings_updated");
        // No ratings changes yet
        if (ratings_updated === null) return false;
        const elapsed = Date.now() - Number.parseInt(ratings_updated);
        // At least a few seconds have passed since a rating change
        if (elapsed > 7000)  return false;

        // Otherwise, refresh every second
        return 1000;
    }

    const { data, isLoading, isFetching } = useQuery({ queryKey: ["rated"], refetchInterval: calculateRefetchInterval, queryFn: fetchRated });

    return (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading || isLoadingRatings ? (
                <LoadingSkeleton />
            ) : (
                data.results.length === 0
                    ? <h1 className="text-4xl font-bold text-gray-600">No ratings yet.</h1>
                    : data.results.map(item => <CardDisplay data={item} key={item.id} />)
            )}
        </div>
    );
}