import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export const ColumnDisplay = (props) => {
    return (
        props.data.map(function (item, i) {
            return <div key={item.id}>
                <Link to={`/${item.type}/${item.id}`} >
                    <Card className="w-96 bg-#1b1b1c">
                        <CardHeader floated={false} className="h-auto">
                            <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="movie-poster" />
                        </CardHeader>
                        <CardBody className="text-center">
                            <Typography variant="h4" className="mb-2 text-#c9c9c9">
                                {item.title}
                            </Typography>
                            <Typography color="blue-gray" className="font-medium" textGradient>
                                {item.overview.slice(0, 350) + "..."}
                            </Typography>
                        </CardBody>
                    </Card>
                </Link>
            </div>
        })
    );
}