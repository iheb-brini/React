import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


export default (props) => {
    let data = [];


    useEffect(() => {
    })
    
    data = Object.keys(props.row).map(key => {
        if ((key !== 'id') && key !== 'category_id' && key!=='created' && props.row[key]) {
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

            
    // REPLACE LATER ON
    let hard_coded_data = [];

    hard_coded_data[0] = data[2];
    hard_coded_data[1] = data[4];
    hard_coded_data[2] = data[3];        
    hard_coded_data[3] = data[0];        
    hard_coded_data[4] = data[data.length-1];        

    return (
        <tr>
            {hard_coded_data}
        </tr>
    )
}

