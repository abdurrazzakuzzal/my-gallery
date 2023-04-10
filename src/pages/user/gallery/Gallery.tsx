'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import styles from '@/styles/Home.module.css';
import { Avatar, Box, Button, Divider, Stack } from '@mui/material';
import Link from 'next/link';
import { Upload } from "@mui/icons-material";
import getDoument from "@/firebase/firestore/getData";
import { Web3Storage } from "web3.storage";
import { web3StrorageToken } from "@/config/web3";

const Gallery = () => {
    const auth = useAuthContext()
    const router = useRouter()

    const [imageList, setImageList] = useState([
        {
            img: "",
            cid: ""
        }
    ]);

    const stringToColor = (string: string) => {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    const stringAvatar = (name: string) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.slice(0, 2)}`,
        };
    }

    const getAllImage = async () => {
        const token = web3StrorageToken ? web3StrorageToken : ""
        const { result, error } = await getDoument("uploaded_images", "");
        if (error) {
            return console.log(error)
        }

        let list: any[] = [];
        result?.forEach((item) => {
            if (item?.uid === auth?.uid) {
                list.push({
                    img: `https://dweb.link/ipfs/${item?.cid}/${item?.file_name}`,
                    cid: item?.cid
                })
            }
        })
        setImageList(list)

        // const client = new Web3Storage({ token })
        // const res = await client.get(result ? result[0]?.cid : "")
        // const files = res && await res.files()
        // console.log(files)
    }

    React.useEffect(() => {
        setImageList(itemData)
        if (auth == null) router.push("/")
        getAllImage()
    }, [auth])

    return (
        <Box sx={{ my: 2 }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Avatar
                    {...stringAvatar(auth?.email ? auth?.email : "unknown")}
                    sx={{ width: 56, height: 56 }}
                />
                <Link href={"/user/upload-image"}>
                    <Button variant="contained" startIcon={<Upload />}>
                        Upload New Image
                    </Button>
                </Link>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
                <ImageList className={styles.imageList} variant="masonry" cols={3} gap={8}>
                    {imageList?.map((item, i) => (
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

export default Gallery;