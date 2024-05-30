import { useQuery } from "@tanstack/react-query"
import { fetchTrending } from "./query"
import { ColumnDisplay } from "../../components/card-display";

export const Home = () => {
    const { data: results, isLoading } = useQuery({ queryKey: ["trending"], queryFn: fetchTrending });
    return (    
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ColumnDisplay data={results} />
            )}
        </div>
    )
}