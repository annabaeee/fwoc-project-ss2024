export const fetchTrending = async () => {
    const moviesQuery = await fetch(
        'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
        {
            headers: {
                Authorization:
                    `Bearer ${import.meta.env.VITE_API_TOKEN}`
            },
        }
    )

    const movies = (await moviesQuery.json()).results;
    movies.forEach(item => item.type = "movie");

    const showsQuery = await fetch(
        'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
        {
            headers: {
                Authorization:
                    `Bearer ${import.meta.env.VITE_API_TOKEN}`
            },
        }
    )

    const shows = (await showsQuery.json()).results;
    shows.forEach(item => {
        item.type = "tv";
        item.title = item.name;
    });

    const results = [...movies, ...shows];
    return results;
}