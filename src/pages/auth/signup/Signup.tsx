'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { IUserAuth } from '@/types/user.interface';
import * as Yup from 'yup';
import signUp from '@/firebase/auth/signup';
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext';
import { CircularProgress } from '@mui/material';
import swal from 'sweetalert';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(6, 'Too Short! Minimum 6 characters is required.')
        .required('Required'),
});

const Signup = () => {

    const auth = useAuthContext();
    const router = useRouter();
    const initialValues: IUserAuth = { email: '', password: '' };
    const [isLoading, setisLoading] = React.useState<boolean>(false);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setisLoading(true);
            const { result, error } = await signUp(values.email, values.password);

            if (error) {
                swal({
                    text: "Signup Failed!",
                    icon: "eroor",
                });
                setisLoading(false);
                return console.log(error)
            }

            // else successful
            swal({
                text: "Signup Successful!",
                icon: "success",
            });
            setisLoading(false);
            return router.push("/user/gallery")
        },
    })

    React.useEffect(() => {
        if (auth != null) router.push("/")
    }, [])

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                        Signup
                    </Typography>
                    <form style={{ marginTop: "10px" }} onSubmit={formik.handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            autoComplete="email"
                            error={formik.touched.email && formik.errors.email ? true : false}
                            helperText={formik.touched.email && formik.errors.email}
                            {...formik.getFieldProps("email")}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            error={formik.touched.password && formik.errors.password ? true : false}
                            helperText={formik.touched.password && formik.errors.password}
                            {...formik.getFieldProps("password")}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={25} color='inherit' /> : "Signup"}
                        </Button>
                    </form>

                    <Grid container>
                        <Grid item>
                            <Link href="/auth/login" >
                                <Typography variant="body2" color={"#0000FF"}>
                                    {"Already have an account? Login now"}
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
                        <Link href="/" style={{ display: 'flex', alignItems: "center" }} >
                            <ArrowBackIcon />
                            <Typography variant="body1" color={"#000000"} fontWeight={600}>
                                Back to Gallery
                            </Typography>
                        </Link>
                    </Box>


                </Box>
            </Grid>
        </Grid>
    );
}

export default Signup;