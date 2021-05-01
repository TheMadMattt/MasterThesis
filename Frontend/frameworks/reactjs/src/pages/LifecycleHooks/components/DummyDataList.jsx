import React, {memo} from 'react';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const DummyDataItem = memo(({ id, title, description, completed }) => (
        <tr>
            <td>{ id }</td>
            <td>{ title }</td>
            <td>{ description }</td>
            <td>{ completed ? <DoneIcon/> : <ClearIcon/> }</td>
        </tr>
));

const DummyDataList = memo(({dummyData}) => {
    return (
        <div className="data-table">
            <table>
                <tbody>
                {dummyData.map((data, index) =>
                    <DummyDataItem {...data} key={index} />
                )}
                </tbody>
            </table>
        </div>
    )
});

export default DummyDataList;
