import React, { useContext, useState } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    IconButton,
    makeStyles,
    Slider,
    Typography
} from '@material-ui/core';
import { PlayArrow, SkipNext, SkipPrevious, Pause } from '@material-ui/icons';
import { useQuery } from '@apollo/client';
import ReactPlayer from 'react-player';

import QueuedSongList from './QueuedSongList'
import { SongContext } from '../App';
import { GET_QUEUED_SONGS } from '../graphql/queries';


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
}));


export default function SongPlayer() {
     const { data } = useQuery(GET_QUEUED_SONGS);

    const { state, dispatch } = useContext(SongContext);

    const [played, setPlayed] = useState(0);
    const [seeking, setSeeking] = useState(false);

    const classes = useStyles();

    const handleTooglePlay = () => {
        dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
    };

    const handleSliderChange = (event, newValue) => {
        setPlayed(newValue);
    };

    const handleSeekMouseDown = () => {
        setSeeking(true)
    }

    return (
        <>
            <Card variant="outlined" className={classes.container}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" component="h3">
                            {state.song.title}
                        </Typography>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            {state.song.artist}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <IconButton>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton onClick={handleTooglePlay}>
                            {state.isPlaying ? <Pause className={classes.playIcon}/> : <PlayArrow className={classes.playIcon}/>}
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
                        value={played}
                        onChange={handleSliderChange}
                        onMouseDown={handleSeekMouseDown}
                    />
                </div>
                    <ReactPlayer
                            url={state.song.url}
                            hidden
                            playing={state.isPlaying}
                            onProgress={({ played, playedSeconds }) => {
                                setPlayed(played);
                            }}
                    />
                    <CardMedia className={classes.thumbnail} image={state.song.thumbnail}/>
            </Card>
           <QueuedSongList queue={data.queue}/>
        </>
    )
}
