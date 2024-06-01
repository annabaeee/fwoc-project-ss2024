import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchDetails } from "./query";

export const DetailsPage = () => {

    const { type, id } = useParams();

    if (!id) {
        return <div>Invalid ID</div>
    }

    const { data, isLoading } = useQuery({ queryKey: ["details", id, type], queryFn: () => fetchDetails(id, type) });

    if (isLoading) {
        return <div>Loading..</div>
    }

    const isMovie = type === 'movie';

    return (
        <div className="flex-auto justify-items-start mt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
            <div>
                <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt="movie-poster" />
            </div>
            <div className="flex-auto justify-items-start space-y-10">
                <h1 className="font-bold text-6xl text-left">{isMovie ? data.title : data.name}</h1>
                <div className="flex flex-row gap-6">
                    <span className="text-left font-medium text-lg">{isMovie ? data.release_date : data.first_air_date}</span>
                    <span className="text-left font-medium text-lg">{isMovie ? `${data.runtime} minutes` : `${data.number_of_seasons} seasons`}</span>
                    <span className="text-left font-medium text-lg">{`${data.vote_average}/10`}</span>
                </div>
                <div className="text-left font-medium text-lg">{`Original Language: ${data.original_language}`}</div>
                <div className="text-left text-xl">{data.overview}</div>
            </div>
        </div>
    );
}