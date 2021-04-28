import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export const MatSelect = ({rowsNumber, handleChange}) => {
    const classes = useStyles();

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Row number</InputLabel>
            <Select
                value={rowsNumber}
                onChange={handleChange}
                label="Row number"
            >
                <MenuItem value={1000}>1000</MenuItem>
                <MenuItem value={2000}>2000</MenuItem>
                <MenuItem value={10000}>10000</MenuItem>
            </Select>
        </FormControl>
    )
}
