import React, {useState} from "react";
import {Button} from "@material-ui/core";
import {PostFormDialog} from "./PostForm";
import apiService from '../../../api/JSONPlaceholderApi';

export const PostBtn = ({cb, isEditing = false, postId}) => {
    const [open, setOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = (post) => {
        setOpen(false);
        if (post) {
            cb(post);
        }
    }

    const getPost = () => {
        apiService.getPost(postId).then(post => {
            setSelectedPost(post.data);
            setOpen(true);
        });
    }

    const props = { onClose: handleDialogClose, open, isEditing, selectedPost}

    return (
        <>
            <Button variant="contained"
                    color="primary"
                    className="ButtonMargin"
                    onClick={isEditing ? getPost : handleDialogOpen}>
                {isEditing ? 'Edit post' : 'Add post'}
            </Button>
            <PostFormDialog {...props} />
        </>
    )
}
