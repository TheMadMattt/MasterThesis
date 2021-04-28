import React from 'react';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

export const DummyDataDisplay = ({ id, title, description, completed }) => {

    return (
        <tr>
            <td>{ id }</td>
            <td>{ title }</td>
            <td>{ description }</td>
            <td>{ completed ? <DoneIcon/> : <ClearIcon/> }</td>
        </tr>
    );
}
