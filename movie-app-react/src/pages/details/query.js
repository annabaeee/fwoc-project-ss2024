export const fetchMovieDetails = async (id, type) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
        {
            headers: {
                Authorization:
                    `Bearer ${import.meta.env.VITE_API_TOKEN}`
            },
        }
    )

    return res.json();
}