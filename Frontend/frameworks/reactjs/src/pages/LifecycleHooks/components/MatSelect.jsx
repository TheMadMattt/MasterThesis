import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginBottom: "20px"
    },
}));

export const MatSelect = ({rowsNumber, handleChange}) => {
    const classes = useStyles();
    const rowsNumberList = [1000, 2000, 5000, 10000];

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Row number</InputLabel>
            <Select
                value={rowsNumber}
                onChange={handleChange}
                label="Row number"
            >
                {rowsNumberList.map((rows, index) =>
                    <MenuItem key={index} value={rows}>{rows}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}
