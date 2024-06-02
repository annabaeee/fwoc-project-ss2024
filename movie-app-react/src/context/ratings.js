import { Api } from '../api/api'

export const Ratings = {
    isLoading: true,
    session_id: "",
    setLoading: null,
    isInitializing: false,
    init: async () => {
        if (Ratings.isInitializing || !Ratings.isLoading) return;
        Ratings.isInitializing = true;

        // If local storage session expired, create new guest session
        // otherwise use guest session id from local storage
        let localSession = JSON.parse(localStorage.getItem("session"));

        // Clear local storage, session and rated items will be added back
        localStorage.clear();

        const expired = (localSession === null) || Date.parse(localSession.expires_at) <= Date.now();
        if (expired) {
            localSession = await Api.fetchJson("authentication/guest_session/new");
        }

        localStorage.setItem("session", JSON.stringify(localSession));
        Ratings.session_id = localSession.guest_session_id;
        const allRated = await Ratings.getAllRated();

        // Sync local storage and ratings from API
        for (let item of allRated) {
            localStorage.setItem(`${item.type}${item.id}`, item.rating.toString());
        }

        Ratings.isLoading = false;
        if (Ratings.setLoading !== null) {
            Ratings.setLoading(false);
        }

        Ratings.isInitializing = false;
        console.log("initialized");
    },

    getAllRated: async () => {
        const ratedMovies = await Api.fetchResults(`guest_session/${Ratings.session_id}/rated/movies?language=en-US&sort_by=created_at.asc`);
        const ratedShows = await Api.fetchResults(`guest_session/${Ratings.session_id}/rated/tv?language=en-US&sort_by=created_at.asc`);
        return [...ratedMovies, ...ratedShows];
    },

    // insert or update rating both in local store and in the API
    upsertRating: async (id, type, rating) => {
        localStorage.setItem(`${type}${id}`, rating.toString());
        await Api.fetchJson(`${type}/${id}/rating?guest_session_id=${Ratings.session_id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json;charset=utf-8",
            },
            body: `{"value": ${rating}}`,
        });
    },

    // delete rating both in local storage and in the API
    deleteRating: async (id, type) => {
        localStorage.removeItem(`${type}${id}`);
        await Api.fetchJson(`${type}/${id}/rating?guest_session_id=${Ratings.session_id}`, {
            method: "DELETE"
        });
    },

    getRating: (id, type) => Number.parseFloat(localStorage.getItem(`${type}${id}`)) || 0

}

if (Ratings.isLoading && !Ratings.isInitializing) {
    Ratings.init();
}
