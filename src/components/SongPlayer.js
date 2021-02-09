import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    IconButton,
    makeStyles,
    Slider,
    Typography
} from '@material-ui/core';

import QueuedSongList from '../QueuedSongList'
import { PlayArrow, SkipNext, SkipPrevious } from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 15px'
    },
    content : {
        flex: '1 0 auto'
    },
    controls: {
        display:'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    playIcon: {
        height: 38,
        width: 38
    },
    thumbnail: {
        width: 150
    }
}))


export default function SongPlayer() {
    const classes = useStyles();

    return (
        <>
            <Card variant="outlined" className={classes.container}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" component="h3">
                            Title
                        </Typography>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            Artist
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <IconButton>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton>
                            <PlayArrow className={classes.playIcon}/>
                        </IconButton>
                        <IconButton>
                            <SkipNext />
                        </IconButton>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            00:01:30
                        </Typography>
                    </div>
                    <Slider
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                    />
                </div>
                    <CardMedia className={classes.thumbnail} image='https://i.ytimg.com/an_webp/TAKR_6vNJR8/mqdefault_6s.webp?du=3000&sqp=CMDBh4EG&rs=AOn4CLCUOusBJADKoBkbQ9UZpWOvnT5ecg'/>
            </Card>
           <QueuedSongList />
        </>
    )
}
