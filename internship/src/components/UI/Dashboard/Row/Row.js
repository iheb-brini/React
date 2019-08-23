import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


export default (props) => {
    let data = [];


    useEffect(() => {
    })

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
            <NavLink to={{
                pathname: props.match.url + '/details/' + props.row['id']
            }}>
                <Button variant="primary">DETAILS</Button>
            </NavLink>
            <NavLink to={props.match.url + '/update/' + props.row['id']}>
                <Button variant="warning">EDIT</Button>
            </NavLink>
                <Button variant="danger" onClick={() => props.clicked(props.row['id'])}>DELETE</Button>
            {/* <NavLink to={props.match.url + '/delete/'}>
            </NavLink> */}
        </td >))
    return (
        <tr>
            {data}
        </tr>
    )
}

