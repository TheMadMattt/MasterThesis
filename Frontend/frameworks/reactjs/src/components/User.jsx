import React from 'react';

export const Functional = ({ name, age, hobby }) => (
    <tr>
        <td>{name}</td>
        <td>{age}</td>
        <td>{hobby}</td>
    </tr>
);

export class Component extends React.Component {
    render() {
        const { name, age, hobby } = this.props;
        return (
            <div>
                <span>{name}</span>
                <span>{age}</span>
                <span>{hobby}</span>
            </div>
        );
    }
}
