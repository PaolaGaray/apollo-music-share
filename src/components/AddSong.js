import React, { useState } from 'react';
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
}))


export default function AddSong() {
    const classes = useStyles();

    const [showDialog, setShowDialog] = useState(false);
    console.log(showDialog);

    const handleCloseDialog = () => {
        setShowDialog(false);
    }

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
                    src="https://i1.sndcdn.com/artworks-000670470790-ej1gvb-t500x500.jpg"
                    alt="Song thumbnail"
                />
                <TextField
                    margin="dense"
                    name="title"
                    label="Title"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="artist"
                    label="Artist"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="thumbnail"
                    label="Thumbnail"
                    fullWidth
                />
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
                    <Button variant="outlined" color="primary">Add Song</Button>
                </DialogActions>
            </DialogContent>
           </Dialog>
           <TextField
               className={classes.urlInput}
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
            className={classes.addSongButton}
            variant="contained"
            color="primary"
            endIcon={<AddBoxOutlined
            onClick={() => setShowDialog(true)}
            />}
           >
               Add
           </Button>
        </div>
    )
}
