import React from 'react';
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import DashboardDropDown from "../dashboard/dashboardDropDown";

const Navigation = () => {
    return (
        <Navbar bg="light" expand="lg" variant="light">
            <Navbar.Brand href="/">Aqua-Monitoring</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/alerts">Alerts</Nav.Link>
                    <DashboardDropDown/>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-6"/>
                    <Button variant="outline-dark">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Navigation;
