import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { Logout } from "@mui/icons-material";
import logout from "@/firebase/auth/logout";
import { useRouter } from "next/navigation";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar } from "@mui/material";

const Header = () => {

    const router = useRouter();
    const auth = useAuthContext();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const LogoutHandle = async () => {
        setAnchorEl(null);
        const { result, error } = await logout();

        if (error) {
            return console.log(error)
        }

        return router.push("/")
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent">
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link href={"/"}> MyGallery</Link>
                    </Typography>

                    {
                        auth?.uid ? (
                            <>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <Avatar
                                        sx={{ width: 40, height: 40, background: "lightblue" }}
                                    >
                                        {auth?.email?.slice(0, 2)}
                                    </Avatar>
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={() => {
                                        router.push("/user/gallery");
                                        setAnchorEl(null);
                                    }}>My account</MenuItem>
                                    <MenuItem onClick={LogoutHandle}>
                                        <Typography color="error"  sx={{ mr: 1 }}>Logout</Typography>
                                        <Logout color="error" />
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Link href={"/auth/login"}>
                                <Button variant="contained" color="primary" sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "50px"
                                }}>
                                    <PersonIcon fontSize="small" />
                                    <Typography variant="body2">
                                        My Account
                                    </Typography>
                                </Button>
                            </Link>
                        )
                    }

                </Toolbar>
            </AppBar >
        </Box >
    )
}

export default Header;