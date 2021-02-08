import React from 'react';
import { Avatar, Typography, IconButton, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles({
    container: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '50px auto 50px',
        gridGap: 12,
        alignItems: 'center',
        marginTop: 10
    },
    songInfoContainer: {
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    },
    avatar: {
        width: 44,
        height: 44
    },
    text: {
        textOverflow: 'elipsis',
        overflow: 'hidden'
    }
})


export default function QueuedSong({ song }) {
    const classes = useStyles();
    const { thumbnail, artist, title } = song;

    return (
        <div className={classes.container}>
            <Avatar className={classes.avatar} src={thumbnail} alt="Song thumbnail" />
            <div className={classes.songInfoContainer}>
                <Typography className={classes.text} variant="subtitle2">
                    {title}
                </Typography>
                <Typography className={classes.text} color="textSecondary" variant="body2">
                    {artist}
                </Typography>
            </div>
            <div>
                <IconButton>
                    <Delete color="error" />
                </IconButton>
            </div>
        </div>
    )
}
