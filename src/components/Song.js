import React, { useContext, useEffect, useState } from 'react';
import {
    Card, CardMedia,
    Typography,
    CardContent,
    CardActions,
    IconButton,
    makeStyles
} from '@material-ui/core';
import { PlayArrow, Save, Pause } from '@material-ui/icons';
import { useMutation } from '@apollo/client';

import { SongContext } from '../App';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';



const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(3)
    },
    songInfoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    songInfo: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    thumbnail: {
        objectFit: 'cover',
        width: 140,
        height: 140
    }
}))



function Song({ song }) {
    const { id } = song;
    const classes = useStyles();

    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE);

    const { state, dispatch } = useContext(SongContext);
    const [currentSongPlaying, setCurrentSongPlaying] = useState(false)
    const { title, artist, thumbnail } =  song;

    useEffect(() => {
       const isSongPlaying = state.isPlaying && id === state.song.id;
       setCurrentSongPlaying(isSongPlaying);
    }, [id, state.song.id, state.isPlaying]);

    const handleTooglePlay = () => {
        dispatch({ type: "SET_SONG", payload: { song }});
        dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
    };


    const handleAddOrRemoveFromQueue = () => {
        addOrRemoveFromQueue({
                variables: { input: { ...song, __typename: 'Song' }}
            })
    }

    return (
        <Card className={classes.container}>
            <div className={classes.songInfoContainer}>
                <CardMedia image={thumbnail} className={classes.thumbnail}/>
                <div className={classes.songInfo}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            { title }
                        </Typography>
                        <Typography variant="body1" component="p" color="textSecondary">
                            { artist }
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={handleTooglePlay} size="small" color="primary">
                            {currentSongPlaying ? <Pause /> : <PlayArrow/>}
                        </IconButton>
                        <IconButton onClick={handleAddOrRemoveFromQueue} size="small" color="secondary">
                            <Save />
                        </IconButton>
                    </CardActions>
                </div>
            </div>
        </Card>
    )
}

export default Song;
