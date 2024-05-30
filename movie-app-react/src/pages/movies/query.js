export const fetchPopularMovies = async () => {
    const res = await fetch(
        'https://api.themoviedb.org/3/movie/popular',
        {
            headers: {
                Authorization:
                    `Bearer ${import.meta.env.VITE_API_TOKEN}`
            },
        }
    )

    const response = await res.json();
    response.results.forEach(item => {
        item.type = "movie";
    });
    return response;
}