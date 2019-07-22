import React from 'react';
import {Card} from "react-bootstrap";
import AddToDashboard from "./addToDashboardDropdown";

const StatusViewer = ({metricId, title, status}) => {
    const color = findColorClass(status);
    return <Card className={color + ' text-center h-100 border-dark'}>
        <AddToDashboard metric={metricId}/>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
        </Card.Body>
    </Card>
};


function findColorClass(status) {
    switch (status) {
        case 'RED':
            return 'bg-danger';
        case 'GREEN':
            return 'bg-success';
        case 'AMBER':
            return 'bg-warning';
        default:
            return 'bg-success';
    }
}


export default StatusViewer;
