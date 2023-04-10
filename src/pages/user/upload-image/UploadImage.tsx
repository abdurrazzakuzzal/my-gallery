'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { IImageUpload, IUserAuth } from '@/types/user.interface';
import * as Yup from 'yup';
import logIn from '@/firebase/auth/login';
import { useRouter } from 'next/navigation';
import { Close, Upload } from '@mui/icons-material';
import addData from '@/firebase/firestore/addData';
import { useAuthContext } from '@/context/AuthContext';

import { Web3Storage } from 'web3.storage'
import { web3StrorageToken } from '@/config/web3';
import { Card, CardContent, CircularProgress, Stack } from '@mui/material';
import swal from 'sweetalert';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string()
        .required('Required'),
});

const UploadImage = () => {

    const router = useRouter();
    const auth = useAuthContext();
    const initialValues: IImageUpload = {
        uid: '', cid: '', title: '', description: '', file: ""
    };

    const [token, setToken] = useState('');
    const [file, setfile] = useState<any>();
    const [isLoading, setisLoading] = React.useState<boolean>(false);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setisLoading(true);
            const client = new Web3Storage({ token })
            const cid = await client.put(file);

            console.log(cid)

            const data = {
                cid: cid,
                uid: auth?.uid,
                title: values?.title,
                description: values.description,
                file_name: file[0]?.name
            }
            const { result, error } = await addData('uploaded_images', cid, data)

            if (error) {
                swal({
                    text: "Upload Failed!",
                    icon: "error",
                });
                setisLoading(false);
                return console.log(error)
            }

            swal({
                text: "Upload Successful!",
                icon: "success",
            });
            router.push("/user/gallery");
            setisLoading(false);
        },
    })

    useEffect(() => {
        setToken(web3StrorageToken ? web3StrorageToken : "")
    }, []);

    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Card sx={{ width: "400px" }}>
                <CardContent>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Upload Image
                        </Typography>
                        <form style={{ marginTop: "10px" }} onSubmit={formik.handleSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Title"
                                error={formik.touched.title && formik.errors.title ? true : false}
                                helperText={formik.touched.title && formik.errors.title}
                                {...formik.getFieldProps("title")}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Description"
                                multiline
                                rows={4}
                                error={formik.touched.description && formik.errors.description ? true : false}
                                helperText={formik.touched.description && formik.errors.description}
                                {...formik.getFieldProps("description")}
                            />

                            <input type="file" className='inputfile' name="file" id="file" onChange={e => setfile(e.target.files)} />
                            <label htmlFor="file">Choose a file</label>

                            <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={3}>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    color='error'
                                    sx={{ mt: 3, mb: 2 }}
                                    startIcon={<Close />}
                                    onClick={() => router.push('/user/gallery')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    startIcon={<Upload />}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <CircularProgress size={25} color='inherit' /> : "Upload"}
                                </Button>

                            </Stack>
                        </form>

                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default UploadImage;