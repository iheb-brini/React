import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';

export default (props) => {

    const [tbody, settbody] = useState((<tbody></tbody>));

    useEffect(() => {
        settbody(<tbody>
            <tr>
                <td>Name</td>
                <td><input type="text" value={props.details.name}/></td>
            </tr>
            <tr>
                <td>Price</td>
                <td>{props.details.price}</td>
            </tr>
            <tr>
                <td>Description</td>
                <td>{props.details.description}</td>
            </tr>
            <tr>
                <td>Category</td>
                <td>{props.details.category_name}</td>
            </tr>
            <tr>
                <td>Image</td>
                <td>no image ...</td>
            </tr>
        </tbody>);
    }, []);

    const back = () => {
        props.history.push(props.match.url);
    }

    return (
        <Table responsive striped bordered hover variant onClick={back}>
            {tbody}
        </Table>
    )
}

