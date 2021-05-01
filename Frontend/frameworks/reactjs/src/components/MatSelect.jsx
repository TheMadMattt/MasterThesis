import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginBottom: "20px"
    },
}));

export const MatSelect = ({title, initialValue, selectDropdownList, handleChange}) => {
    const classes = useStyles();

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>{title}</InputLabel>
            <Select
                value={initialValue}
                onChange={handleChange}
                MenuProps={{
                    disableScrollLock: true
                }}
                label={title}
            >
                {selectDropdownList.map((rows, index) =>
                    <MenuItem key={index} value={rows}>{rows}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}
