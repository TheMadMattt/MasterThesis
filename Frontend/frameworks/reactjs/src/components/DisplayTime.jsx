import {makeStyles} from "@material-ui/core/styles";
import {Badge, Dialog, DialogTitle, IconButton, List, ListItem} from "@material-ui/core";
import React, {useState} from "react";
import {FormatNumber} from "../utils/FormatNumber";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
    displayTimeContainer: {
        padding: "0 10px",
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

    const time = timer && (timer.timesList[timer.rowsNumber].averageTime > 0 ?
        timer.timesList[timer.rowsNumber].averageTime :
        timer.timesList[timer.rowsNumber].totalTime);

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
            <Badge color="secondary" badgeContent={timer && timer.timesList[timer.rowsNumber].times.length}>
                <IconButton variant="contained" color="primary" onClick={() => handleDialog(true)}>
                    <ExpandMoreIcon/>
                </IconButton>
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
        padding: "0 15px 15px 15px"
    }
})

const TimeListDialog = (props) => {
    const { onClose, open, timer, title } = props;

    const classes = usePadding();

    return (
        <Dialog onClose={() => onClose(false)} open={open}>
            <div className={`flex-column flex-center ${classes.padding}`}>
                <DialogTitle>{title}</DialogTitle>
                <p><b>Average time: </b>{timer ? FormatNumber(timer.timesList[timer.rowsNumber].averageTime, decimalPlaces) : '0'} ms</p>
                {
                    timer ? <TimeList times={timer.timesList[timer.rowsNumber].times}/> : <p>No times to show.</p>
                }
            </div>
        </Dialog>
    );
}

