import { useQuery } from "@tanstack/react-query";
import { ColumnDisplay } from "../../components/card-display";
import { fetchSearchResults } from "./query";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Ratings } from "../../context/ratings";

export const SearchResult = () => {
    const [isLoadingRatings, setLoadingRatings] = useState(Ratings.isLoading);
    Ratings.setLoading = setLoadingRatings;

    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");

    const { data: results, isLoading } = useQuery({ queryKey: ["search", query], queryFn: () => fetchSearchResults(query) });
    return (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {isLoading || isLoadingRatings ? (
                <div>Loading...</div>
            ) : (
                results.map(item => <ColumnDisplay data={item} key={item.id} />)
            )}
        </div>
    );
}