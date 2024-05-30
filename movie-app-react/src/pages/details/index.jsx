import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "./query";

export const DetailsPage = () => {

    const { type, id } = useParams();

    if (!id) {
        return <div>Invalid Movie ID</div>
    }

    const { data, isLoading } = useQuery({ queryKey: ["moviedetails"], queryFn: () => fetchMovieDetails(id, type) });

    if (isLoading) {
        return <div>"Loading..."</div>
    }

    const isMovie = type === 'movie';

    return (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
            <div>
                {isMovie ? data.title : data.name}
            </div>
            <div>
                {isMovie ? data.release_date : data.first_air_date}
            </div>
        </div>
    );
}