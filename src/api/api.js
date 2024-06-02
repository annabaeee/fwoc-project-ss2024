// 

export const Api = {
    isLoading: true,
    url: "https://api.themoviedb.org/3/",
    defaultOptions: {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
        }
    },
    /** Merge options with API default options and headers */
    fetch: (path, options) => {
        const mergedOptions = { ...Api.defaultOptions, ...options };
        if (options && options.headers) {
            mergedOptions.headers = { ...Api.defaultOptions.headers, ...options.headers };
        }
        return fetch(Api.url + path, mergedOptions);
    },
    
    /** Return parsed object from JSON */
    fetchJson: (path, options) => Api.fetch(path, options).then(res => res.json()),
    
    /** Fetch the .results field from the json result, with added .type and .title */
    fetchResults: (path, options) => Api.fetch(path, options).then(res => Api.getResults(res)),
    
    /** Fetch ratings with added status code */
    fetchRated: (path, options) => Api.fetch(path, options).then(res => {
        if (res.status === 404 || res.status === 401) {
            return Promise.resolve({ status: res.status, results: [] });
        }
        return Api.getResults(res).then(results => ({ status: res.status, results }));
    }),
    
    /** Adds .type and .title to results, depending on the request url (tv/movie) */
    getResults: (response) => response.json().then(result => {
        const results = result.results;
        if (response.url.includes('/tv')) {
            results.forEach(item => {
                item.type = "tv";
                item.title = item.name;
            });
        } else if (response.url.includes('/movie')) {
            results.forEach(item => {
                item.type = "movie";
            });
        }
        return results;
    }),

}