import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import getOneDoument from '@/firebase/firestore/getOneDoc';
import { Box, Grid, Typography } from '@mui/material';

const ViewImage = () => {

    const router = useRouter()
    const { cid } = router.query;
    const [data, setdata] = useState<any>();

    const _getData = async () => {
        const { result, error } = await getOneDoument("uploaded_images", cid ? cid : "");
        if (error) {
            return console.log(error)
        }

        setdata(result)
    }

    useEffect(() => {
        _getData()
    }, [cid]);

    return (
        <Box sx={{ my: 3 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} textAlign={"end"}>
                    <img
                        src={data?.cid ? `https://dweb.link/ipfs/${data?.cid}/${data?.file_name}` : "https://i.pinimg.com/originals/1c/13/f3/1c13f3fe7a6bba370007aea254e195e3.gif"}
                        srcSet={`https://dweb.link/ipfs/${data?.cid}/${data?.file_name}`}
                        alt={data?.cid}
                        loading="lazy"
                        width={"350px"}
                        style={{ borderRadius: "20px" }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='body2' color={"gray"} sx={{ mt: 1 }}>
                        Title
                    </Typography>
                    <Typography variant='h6'>
                        {data?.title}
                    </Typography>
                    <Typography variant='body2' color={"gray"} sx={{ mt: 3 }}>
                        Description
                    </Typography>
                    <Typography variant='h6'>
                        {data?.description}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ViewImage;
