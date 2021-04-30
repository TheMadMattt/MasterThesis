import {makeStyles} from "@material-ui/core/styles";
import {Badge, Button, Dialog, DialogTitle, List, ListItem} from "@material-ui/core";
import React, {useState} from "react";
import {FormatNumber} from "../utils/FormatNumber";

const useStyles = makeStyles({
    displayTimeContainer: {
        padding: "10px",
        textAlign: "center",
        border: "2px solid black",
        margin: "5px"
    },
    timeContainer: {
        marginBottom: "15px"
    }
});

const decimalPlaces = 5;

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
            <div className={classes.timeContainer}>
                <h3><strong>{title}</strong></h3>
                {timer ? FormatNumber(time, decimalPlaces) : 0 } ms
            </div>
            <Badge color="secondary" badgeContent={timer && timer.times.length}>
                <Button variant="outlined" color="primary" onClick={() => handleDialog(true)}>CLICK</Button>
            </Badge>
            <TimeListDialog {...props}/>
        </div>
    )
}

const TimeList = ({times}) => (
    <List>
        {times.map((time, index) => (
            <ListItem key={index}>{ FormatNumber(time, decimalPlaces) } ms</ListItem>
        ))}
    </List>
)

const usePadding = makeStyles({
    padding: {
        padding: "15px"
    }
})

const TimeListDialog = (props) => {
    const { onClose, open, timer, title } = props;

    const classes = usePadding();

    const handleClose = () => {
        onClose(false);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <div className={`flex-column flex-center ${classes.padding}`}>
                <DialogTitle>{title}</DialogTitle>
                <p><b>Average time: </b>{timer ? FormatNumber(timer.averageTime, decimalPlaces) : '0'} ms</p>
                {
                    timer ? <TimeList times={timer.times}/> : <p>No times to show.</p>
                }
            </div>
        </Dialog>
    );
}

