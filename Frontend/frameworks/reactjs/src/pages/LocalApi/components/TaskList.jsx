import React, {memo} from 'react';
import {Button} from "@material-ui/core";

const TaskItem = memo(({ title, description, completed }) => (
    <tr>
        <td>
            <h2>{ title }</h2>
            <div>
                <Button>Edit task</Button>
                <Button>Delete task</Button>
            </div>
        </td>
        <td>{ description }</td>
        <td>{ completed }</td>
    </tr>
));

const TaskList = memo(({tasks}) => {
    return (
        <div className="data-table">
            <table>
                <tbody>
                    {tasks.map((data, index) =>
                        <TaskItem {...data} key={index} />
                    )}
                </tbody>
            </table>
        </div>
    )
})

export default TaskList;
