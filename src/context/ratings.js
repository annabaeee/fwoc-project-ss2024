import { Api } from '../api/api'

export const Ratings = {
    /** True if the guest session and ratings are still not initialized */
    isLoading: true,
    /** Guest session id */
    session_id: "",
    setLoading: null,
    /** True if initialization is in progress */
    isInitializing: false,

    /** One-time init for guest session and initializing local storage */
    init: async () => {
        if (Ratings.isInitializing || !Ratings.isLoading) return;
        Ratings.isInitializing = true;

        // Try to use guest session id from local storage
        let localSession = JSON.parse(localStorage.getItem("session"));

        // Clear local storage - session and rated items will be added back
        localStorage.clear();

        //console.log(JSON.stringify(localSession));

        let userRatings = { status: 401, results: [] };
        if (localSession && localSession.guest_session_id){
            Ratings.session_id = localSession.guest_session_id;
            userRatings = await Ratings.getAllRated();
        }

        if (userRatings.status === 401){
            //console.log("creating new guest session");
            // No guest session or guest session is invalid, get a new one
            localSession = await Api.fetchJson("authentication/guest_session/new");
        }

        localStorage.setItem("session", JSON.stringify(localSession));
        Ratings.session_id = localSession.guest_session_id;

        // Sync local storage and ratings from API
        for (let item of userRatings.results) {
            localStorage.setItem(`${item.type}${item.id}`, item.rating.toString());
        }

        Ratings.isLoading = false;
        Ratings.isInitializing = false;
        //console.log("initialized");

        if (Ratings.setLoading !== null) {
            Ratings.setLoading(false);
        }

    },

    /** Fetch and merge all rated movies and tv shows, set 401 for invalid guest session */
    getAllRated: async () => {
        const ratedMovies = await Api.fetchRated(`guest_session/${Ratings.session_id}/rated/movies?language=en-US&sort_by=created_at.asc`);
        const ratedShows = await Api.fetchRated(`guest_session/${Ratings.session_id}/rated/tv?language=en-US&sort_by=created_at.asc`);
        return {
            status: ratedMovies.status === 401 || ratedShows.status === 401 ? 401 : 200,
            results: [...ratedMovies.results, ...ratedShows.results]
        };
    },

    /** Insert or update rating both in local store and in the API */
    upsertRating: async (id, type, rating) => {
        // Set last updated for rating list delay workaround
        localStorage.setItem("ratings_updated", Date.now().toString());
        localStorage.setItem(`${type}${id}`, rating.toString());
        await Api.fetchJson(`${type}/${id}/rating?guest_session_id=${Ratings.session_id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json;charset=utf-8",
            },
            body: `{"value": ${rating}}`,
        });
    },

    /** Delete rating both in local storage and in the API */
    deleteRating: async (id, type) => {
        // Set last updated for rating list delay workaround
        localStorage.setItem("ratings_updated", Date.now().toString());
        localStorage.removeItem(`${type}${id}`);
        await Api.fetchJson(`${type}/${id}/rating?guest_session_id=${Ratings.session_id}`, {
            method: "DELETE"
        });
    },

    /** Gets rating from local storage only */
    getRating: (id, type) => Number.parseFloat(localStorage.getItem(`${type}${id}`)) || 0

}

// One-time init
if (Ratings.isLoading && !Ratings.isInitializing) {
    Ratings.init();
}
