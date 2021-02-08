import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import HeadsetTwoToneIcon from '@material-ui/icons/HeadsetTwoTone';

const useStyles = makeStyles({
    title: {
        marginLeft: '8px'
    }
})

export default function Header() {
    const classes = useStyles();

    return (
        <AppBar position="fixed">
            <Toolbar>
                <HeadsetTwoToneIcon />
                <Typography className={classes.title} variant="h6" component="h1">
                    Apollo Music Share
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
