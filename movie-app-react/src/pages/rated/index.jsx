import { useQuery, useIsMutating } from "@tanstack/react-query";
import { fetchRated } from "./query";
import { CardDisplay } from "../../components/card-display";
import { useState } from "react";
import { Ratings } from "../../context/ratings";
import { LoadingSkeleton } from "../../components/skeleton";

export const Rated = () => {
    const [isLoadingRatings, setLoadingRatings] = useState(Ratings.isLoading);
    Ratings.setLoading = setLoadingRatings;

    const { data: results, isLoading } = useQuery({ queryKey: ["rated"], queryFn: fetchRated });
    const isMutatingRatings = useIsMutating({ mutationKey: ['rated'] });

    return (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading || isLoadingRatings || isMutatingRatings ? (
                <LoadingSkeleton />
            ) : (
                results.map(item => <CardDisplay data={item} key={item.id} />)
            )}
        </div>
    );
}