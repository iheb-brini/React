import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import classes from './Dashboard.css';
import Row from './Row/Row';

export default (props) => {

    let tbody = (
        <tbody></tbody>
    )
    if (props.records)
        if (Object.keys(props.records).length) {
            const rows = Object.keys(props.records).map(key => {
                return <Row
                    clicked={props.clicked}
                    {...props}
                    key={key}
                    row={props.records[key]}
                />
            })
            tbody = (
                <tbody>
                    {rows}
                </tbody>
            )
        }

    useEffect(() => {

    });


    return (
        <Table responsive striped bordered hover variant className={classes.Dashboard}>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            {tbody}
        </Table>
    )
}

