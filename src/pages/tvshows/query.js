import { Api } from "../../api/api";

export const fetchTvShows = async () => {
    const res = await Api.fetchResults('tv/popular');
    return res;
}
