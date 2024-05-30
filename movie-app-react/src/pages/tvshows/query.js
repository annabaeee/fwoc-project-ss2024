export const fetchTvShows = async () => {
    const res = await fetch(
        'https://api.themoviedb.org/3/tv/popular',
        {
            headers: {
                Authorization:
                    `Bearer ${import.meta.env.VITE_API_TOKEN}`
            },
        }
    )

    const response = await res.json();
    response.results.forEach(item => {
        item.type = "tv";
        item.title = item.name;
    });
    return response;
}