import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import { Rating, Star } from '@smastrom/react-rating';
import { useMutation } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Ratings } from "../context/ratings";

const myStyles = {
    itemShapes: Star,
    itemStrokeWidth: 0,
    activeFillColor: 'LightSeaGreen',
    inactiveFillColor: '#99F6E4',
}

export const ColumnDisplay = (props) => {

    const item = props.data;

    const [rating, setRating] = useState(Ratings.getRating(item.id, item.type));
    const { mutateAsync: upsertRating } = useMutation({ mutationKey: ["upsertRating", item.id, item.type, rating], mutationFn: ({ id, type, rating }) => Ratings.upsertRating(id, type, rating) });
    const { mutateAsync: deleteRating } = useMutation({ mutationKey: ["deleteRating", item.id, item.type, rating], mutationFn: ({ id, type, rating }) => Ratings.deleteRating(id, type) });

    useEffect(() => {
        if (rating === Ratings.getRating(item.id, item.type)){
            return;
        }

        if (rating === 0) {
            deleteRating({ id: item.id, type: item.type });
        } else {
            upsertRating({ id: item.id, type: item.type, rating });
        }
    }, [rating]);

    return (
        <div>
            <Link to={`/${item.type}/${item.id}`} >
                <Card className="w-96 bg-#1b1b1c">
                    <CardHeader floated={false} className="card-header">
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="movie-poster" className="card-image" />
                    </CardHeader>
                    <CardBody className="text-center">
                        <Typography variant="h4" className="mb-2 text-#c9c9c9">
                            {item.title}
                        </Typography>
                        <div className="h-32">
                            <Typography color="blue-gray" className="font-medium" textGradient>
                                {item.overview.slice(0, 200) + "..."}
                            </Typography>
                        </div>
                    </CardBody>
                    <CardFooter className="flex flex-col justify-items-center">
                        <Rating style={{ maxWidth: 250 }} value={rating / 2} onChange={rating => setRating(rating * 2)} itemStyles={myStyles} />
                    </CardFooter>
                </Card>
            </Link>
        </div>
    );
}