import { useQuery } from "@tanstack/react-query"
import { fetchPopularMovies } from "./query"
import { ColumnDisplay } from "../../components/card-display";

export const PopularMovies = () => {
    const { data: popMovieData, isLoading: isLoadingPopMovies } = useQuery({ queryKey: ["movies-popular"], queryFn: fetchPopularMovies });
    return (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {isLoadingPopMovies ? (
                <div>Loading...</div>
            ) : (
                <ColumnDisplay data={popMovieData.results} />
            )}
        </div>
    )
}