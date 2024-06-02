import { Rating, Star } from '@smastrom/react-rating';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from "react";
import { Ratings } from "../context/ratings";

const myStyles = {
    itemShapes: Star,
    itemStrokeWidth: 0,
    activeFillColor: 'LightSeaGreen',
    inactiveFillColor: '#99F6E4',
}

export const UserRating = (props) => {

    const item = props.data;

    const [rating, setRating] = useState(Ratings.getRating(item.id, item.type));
    const queryClient = useQueryClient();

    const { mutateAsync: upsertRating } = useMutation({
        mutationKey: ["rated"], scope: "rated", onSuccess: () => queryClient.invalidateQueries({ queryKey: ['rated'] }),
        mutationFn: ({ id, type, rating }) => Ratings.upsertRating(id, type, rating)
    });
    const { mutateAsync: deleteRating } = useMutation({
        mutationKey: ["rated"], scope: "rated", onSuccess: () => queryClient.invalidateQueries({ queryKey: ['rated'] }),
        mutationFn: ({ id, type }) => Ratings.deleteRating(id, type)
    });

    useEffect(() => {
        if (rating === Ratings.getRating(item.id, item.type)) {
            return;
        }

        if (rating === 0) {
            deleteRating({ id: item.id, type: item.type });
        } else {
            upsertRating({ id: item.id, type: item.type, rating });
        }
    }, [rating]);

    return (
        <Rating style={{ maxWidth: 225 }} value={rating / 2} onChange={rating => setRating(rating * 2)} itemStyles={myStyles} />
    );
}