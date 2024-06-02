import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const LoadingSkeleton = () => {
    return (
        [1, 2, 3, 4, 5, 6].map(i =>
            <Stack key={i} className='flex flex-col text-gray-700 shadow-md bg-#1b1b1c items-center'>
                <Skeleton variant="rounded" width={360} height={528} sx={{ bgcolor: 'grey.800' }} />
                <Skeleton variant="text" sx={{ fontSize: '4rem', bgcolor: 'grey.800' }} width={360} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', bgcolor: 'grey.800' }} width={360} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', bgcolor: 'grey.800' }} width={360} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', bgcolor: 'grey.800' }} width={360} />
                <Skeleton variant="rounded" width={350} height={90} sx={{ bgcolor: 'grey.800', marginTop: '10px', marginBottom: '20px'}} />
            </Stack>
        )
    );
}