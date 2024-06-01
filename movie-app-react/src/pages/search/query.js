import { Api } from "../../api/api";

export const fetchSearchResults = async (input) => {
    const movies = await Api.fetchResults(`search/movie?query=${input}&include_adult=false&language=en-US`);
    const shows = await Api.fetchResults(`search/tv?query=${input}&include_adult=false&language=en-US`);
    const results = [...movies, ...shows];
    return results;
}