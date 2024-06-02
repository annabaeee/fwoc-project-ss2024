import { Api } from "../../api/api";

export const fetchTrending = async () => {
    const movies = await Api.fetchResults("trending/movie/day?language=en-US");
    const shows = await Api.fetchResults("trending/tv/day?language=en-US");
    const results = [...movies, ...shows];
    return results;
}