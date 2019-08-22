import React from 'react'
import { Button } from 'react-bootstrap';

const row = (props) => {
    let data = [];

    data = Object.keys(props.row).map(key => {
        if ((key !== 'id') && key !== 'category_id') {
            return (
                <td key={key}>{props.row[key]}</td>
            )
        }
        return null;
    })

    data.push((
        <td key={props.row['id']}>
            <Button onClick={() => props.details(props.row['id'])} variant="primary">DETAILS</Button>
            <Button onClick={() => props.updated(props.row['id'])} variant="warning">EDIT</Button>
            <Button onClick={() => props.deleted(props.row['id'])} variant="danger">DELETE</Button>
        </td>))
    return (
        <tr>
            {data}
        </tr>
    )
}

export default row
