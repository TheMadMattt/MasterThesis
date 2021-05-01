import React, {useState} from "react";
import {Button} from "@material-ui/core";
import {PostFormDialog} from "./PostForm";

export const PostBtn = ({cb, isEditing}) => {
    const [open, setOpen] = useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = (post) => {
        setOpen(false);
        if (post) {
            cb(post);
        }
    }

    const props = { onClose: handleDialogClose, open, isEditing}

    return (
        <>
            <Button variant="contained" color="primary" className="ButtonMargin"
                    onClick={handleDialogOpen}>Edit post</Button>
            <PostFormDialog {...props} />
        </>
    )
}
