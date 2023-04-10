import * as React from 'react';
import { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import styles from '@/styles/Home.module.css';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import Link from 'next/link';

import getDoument from "@/firebase/firestore/getData";
import { web3StrorageToken } from "@/config/web3";


export default function Home() {

    const [imageList, setImageList] = useState([
        {
            img: "",
            cid: "",
        }
    ]);

    const getAllImage = async () => {
        const token = web3StrorageToken ? web3StrorageToken : ""
        const { result, error } = await getDoument("uploaded_images", "");
        if (error) {
            return console.log(error)
        }

        let list: any[] = [];
        result?.forEach((item) => {
            list.push({
                img: `https://dweb.link/ipfs/${item?.cid}/${item?.file_name}`,
                cid: item?.cid
            })
        })
        setImageList(list)
    }

    React.useEffect(() => {
        setImageList(itemData)
        getAllImage()
    }, [])

    return (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
            <ImageList className={styles.imageList} variant="masonry" cols={3} gap={8}>
                {imageList.map((item, i) => (
                    <ImageListItem key={i}  >
                        <Link href={`/view/${item.cid}`}>
                            <img
                                className={styles.imageItem}
                                src={`${item.img}?w=161&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.cid}
                                loading="lazy"
                                width={"100%"}
                                height={"100%"}
                                style={{ borderRadius: "20px" }}
                            />
                        </Link>
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
}

const itemData = [
    {
        img: "https://i.pinimg.com/originals/1c/13/f3/1c13f3fe7a6bba370007aea254e195e3.gif",
        cid: '',
    },
    {
        img: "https://i.pinimg.com/originals/1c/13/f3/1c13f3fe7a6bba370007aea254e195e3.gif",
        cid: '',
    },
    {
        img: "https://i.pinimg.com/originals/1c/13/f3/1c13f3fe7a6bba370007aea254e195e3.gif",
        cid: '',
    },
    {
        img: "https://i.pinimg.com/originals/1c/13/f3/1c13f3fe7a6bba370007aea254e195e3.gif",
        cid: '',
    },
    {
        img: "https://i.pinimg.com/originals/1c/13/f3/1c13f3fe7a6bba370007aea254e195e3.gif",
        cid: '',
    },
    {
        img: "https://i.pinimg.com/originals/1c/13/f3/1c13f3fe7a6bba370007aea254e195e3.gif",
        cid: '',
    },
    {
        img: "https://i.pinimg.com/originals/1c/13/f3/1c13f3fe7a6bba370007aea254e195e3.gif",
        cid: '',
    },
    {
        img: "https://i.pinimg.com/originals/1c/13/f3/1c13f3fe7a6bba370007aea254e195e3.gif",
        cid: '',
    },
    {
        img: "https://i.pinimg.com/originals/1c/13/f3/1c13f3fe7a6bba370007aea254e195e3.gif",
        cid: '',
    },
    {
        img: "https://i.pinimg.com/originals/1c/13/f3/1c13f3fe7a6bba370007aea254e195e3.gif",
        cid: '',
    },
    {
        img: "https://i.pinimg.com/originals/1c/13/f3/1c13f3fe7a6bba370007aea254e195e3.gif",
        cid: '',
    },
    {
        img: "https://i.pinimg.com/originals/1c/13/f3/1c13f3fe7a6bba370007aea254e195e3.gif",
        cid: '',
    },
];
