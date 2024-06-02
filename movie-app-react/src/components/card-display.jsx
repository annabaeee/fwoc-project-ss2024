import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { UserRating } from "./user-rating";

export const CardDisplay = (props) => {

    const item = props.data;
    const imageSrc = item.poster_path === null
        ? "/placeholder.png"
        : `https://image.tmdb.org/t/p/w500/${item.poster_path}`;

    return (
        <Link to={`/${item.type}/${item.id}`} >
            <Card className="bg-#1b1b1c">
                <CardHeader floated={false} className="card-header">
                    <img src={imageSrc} alt="movie-poster" className="card-image" />
                </CardHeader>
                <CardBody className="text-center text-gray-300">
                    <Typography variant="h4" className="mb-2">
                        {item.title}
                    </Typography>
                    <div className="h-32">
                        <Typography color="gray" className="font-medium" textGradient>
                            {item.overview.slice(0, 200) + "..."}
                        </Typography>
                    </div>
                </CardBody>
                <CardFooter className="flex flex-col items-center space-y-4">
                    <div className="text-gray-300">
                        {`Vote average: ${+(item.vote_average / 2).toFixed(1)}`}
                    </div>
                    <UserRating data={item} key={item.id} />
                </CardFooter>
            </Card>
        </Link>
    );
}