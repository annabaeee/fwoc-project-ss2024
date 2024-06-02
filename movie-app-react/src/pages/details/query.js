import { Api } from "../../api/api";

export const fetchDetails = async (id, type) => {
    const res = await Api.fetchJson(`${type}/${id}?language=en-US`);
    res.type = type;
    return res;
}

