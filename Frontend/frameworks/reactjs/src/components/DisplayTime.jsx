import {makeStyles} from "@material-ui/core/styles";
import {Button, Dialog, DialogTitle, List, ListItem} from "@material-ui/core";
import React, {useState} from "react";

const useStyles = makeStyles({
    displayTimeContainer: {
        padding: "10px",
        textAlign: "center",
        border: "2px solid black",
        margin: "5px"
    }
});

export const DisplayTime = ({title, timer}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const time = timer && (timer.averageTime > 0 ? timer.averageTime : timer.totalTime);

    const handleDialog = (value) => {
        setOpen(value);
    };

    const props = { onClose: handleDialog, open, timer, title }

    return (
        <div className={classes.displayTimeContainer}>
            <div>
                <h3><strong>{title}</strong></h3>
                {timer ? time : 0 } ms
            </div>
            <Button variant="outlined" color="primary" onClick={() => handleDialog(true)}>CLICK</Button>
            <DisplayTimeList {...props}/>
        </div>
    )
}

const DisplayTimeList = (props) => {
    const { onClose, open, timer, title } = props;

    const handleClose = () => {
        onClose(false);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{title}</DialogTitle>
            <List>
                {timer?.times.map((time, index) => (
                    <ListItem key={index}>{time}</ListItem>
                ))}
            </List>
        </Dialog>
    );
}

