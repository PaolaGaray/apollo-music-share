import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    TextField,
    makeStyles
} from '@material-ui/core'
import { AddBoxOutlined, Link } from '@material-ui/icons';
import ReactPlayer from 'react-player';
import SoundCloudPlayer from 'react-player/lib/players/SoundCloud';
import YouTubePlayer from 'react-player/lib/players/YouTube';

import { ADD_SONG } from '../graphql/mutations';
import { useMutation } from '@apollo/client';


const useStyles = makeStyles(theme => ({
    urlInput: {
        margin: theme.spacing(1)
    },
    addSongButton: {
        margin: theme.spacing(1)
    },
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    dialog: {
        textAlign: 'center'
    },
    thumbnail: {
        width:'90%'
    }
}));


const DEFAULT_SONG = {
    duration: 0,
    title: "",
    artist: "",
    thumbnail: ""
}


export default function AddSong() {
    const classes = useStyles();

    const [addSong, { error }] = useMutation(ADD_SONG);

    const [url, setUrl] = useState('');
    const [playable, setPlayable] = useState(false);
    const [song, setSong] = useState(DEFAULT_SONG);
    const [showDialog, setShowDialog] = useState(false);


    useEffect(() => {
        const isPlayable = SoundCloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url);
        setPlayable(isPlayable);
    }, [url]);


    const handleChangeSong = (event) => {
        const { name, value } = event.target;
        setSong(prevSong => ({
            ...prevSong,
            [name]: value
        }));
    };


    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const handleEditSong = async ({ player }) => {
        const nestedPlayer = player.player.player;
        let songData;
        if(nestedPlayer.getVideoData) {
            songData = getYouTubeInfo(nestedPlayer)
        } else if (nestedPlayer.getCurrentSound) {
            songData = await getSoundCloudInfo(nestedPlayer)
        };
        setSong({ ...songData, url });
    };

    const handleAddSong = async() => {
        try {
            const { url, thumbnail, duration, title, artist } = song;
                await addSong({
                    variables: {
                        url: url.length > 0 ? url : null,
                        thumbnail: thumbnail.length > 0 ? thumbnail : null,
                        duration: duration > 0 ? duration : null,
                        title: title.length > 0 ? title : null,
                        artist: artist.length > 0 ? artist : null
                    }})
            handleCloseDialog();
            setSong(DEFAULT_SONG);
            setUrl('');
        } catch (error) {
           // console.dir("Error adding song", error);
           console.dir(error);
        }

    }


        const getYouTubeInfo = (player) => {
            const duration = player.getDuration();
            const { title, video_id, author } = player.getVideoData();
            const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
            return {
                duration,
                title,
                artist: author,
                thumbnail
            }
        };

        const getSoundCloudInfo = (player) => {
            return new Promise(resolve => {
                player.getCurrentSound(songData => {
                    if(songData) {
                        resolve ({
                            duration: Number(songData.duration / 1000),
                            title: songData.title,
                            artist: songData.user.username,
                            thumbnail: songData.artwork_url.replace('-large', '-t500x500')
                        })
                    }
                })
            })
        };

    const handleError = (field) => {
        return error && error.graphQLErrors[0].extensions.path.includes(field);
    }

    const { title, artist, thumbnail } = song;

    return (
        <div className={classes.container}>
           <Dialog
            className={classes.dialog}
            open={showDialog}
            onClose={handleCloseDialog}
           >
            <DialogTitle>Edit Song</DialogTitle>
            <DialogContent>
                <img
                    className={classes.thumbnail}
                    src={thumbnail}
                    alt="Song thumbnail"
                />
                <TextField
                    value={title}
                    onChange={handleChangeSong}
                    margin="dense"
                    name="title"
                    label="Title"
                    fullWidth
                    error={handleError('title')}
                    helperText={handleError('title') && 'Fill out field'}
                />
                <TextField
                    value={artist}
                    onChange={handleChangeSong}
                    margin="dense"
                    name="artist"
                    label="Artist"
                    fullWidth
                    error={handleError('artist')}
                    helperText={handleError('artist') && 'Fill out field'}
                />
                <TextField
                    value={thumbnail}
                    onChange={handleChangeSong}
                    margin="dense"
                    name="thumbnail"
                    label="Thumbnail"
                    fullWidth
                    error={handleError('thumbnail')}
                    helperText={handleError('thumbnail') && 'Fill out field'}
                />
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
                    <Button onClick={handleAddSong} variant="outlined" color="primary">Add Song</Button>
                </DialogActions>
            </DialogContent>
           </Dialog>
           <TextField
               className={classes.urlInput}
               onChange={event => setUrl(event.target.value)}
               value={url}
               placeholder="Add Youtube or SoundCloud Url"
               fullWidth
               margin="normal"
               type="url"
               InputProps={{
                   startAdornment: (
                       <InputAdornment position="start">
                        <Link />
                       </InputAdornment>
                   )
                }}
           />
           <Button
            disabled={!playable}
            className={classes.addSongButton}
            variant="contained"
            color="primary"
            endIcon={<AddBoxOutlined
            onClick={() => setShowDialog(true)}
            />}
           >
               Add
           </Button>

           <ReactPlayer
                url={url}
                hidden
                onReady={handleEditSong}
           />

        </div>
    )
}
