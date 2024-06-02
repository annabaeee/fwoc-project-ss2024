import { Api } from "../../api/api";

export const fetchPopularMovies = async () => {
    const results = await Api.fetchResults('movie/popular');
    return results;
}
