export const Api = {
    isLoading: true,
    url: "https://api.themoviedb.org/3/",
    // guest_session_id: "",
    defaultOptions: {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
        }
    },
    fetch: (path, options) => {
        const mergedOptions = { ...Api.defaultOptions, ...options };
        if (options && options.headers) {
            mergedOptions.headers = { ...Api.defaultOptions.headers, ...options.headers };
        }
        return fetch(Api.url + path, mergedOptions);
    },
    fetchJson: (path, options) => Api.fetch(path, options).then(res => res.json()),
    fetchResults: (path, options) => Api.fetch(path, options)
        .then(response => response.status === 404 ? Promise.resolve([]) : response.json().then(result => {
            const results = result.results;
            if (path.includes('/tv') || path.startsWith('tv/')) {
                results.forEach(item => {
                    item.type = "tv";
                    item.title = item.name;
                });
            } else if (path.includes('/movie') || path.startsWith('movie')) {
                results.forEach(item => {
                    item.type = "movie";
                });
            }

            return results;
        })),
    // newGuestSession: async () => {
    //     const data = await Api.fetchJson("authentication/guest_session/new");
    // },
    
}