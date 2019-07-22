import React from 'react';
import {NavDropdown} from "react-bootstrap";
import {connect} from "react-redux";
import {addToDashboard} from "../../../store/actions/dashboardActions";


class AddToDashboard extends React.Component{

    render(){
        const title = "Add to";
        const dashboardNames = this.props.dashboardNames;
        const dashboardItems = dashboardNames && dashboardNames.map(dashboardName => (
            <NavDropdown.Item key={dashboardName.id} onClick={(dashboardName)=>this.addToDashboard(dashboardName)}>
                {dashboardName.name}
            </NavDropdown.Item>
        ));
        return (
            <NavDropdown title={title} id="basic-nav-dropdown">
                {dashboardItems}
            </NavDropdown>
        )
    }

    addToDashboard = (dashboardName) => {

    }
}

const mapStateToProps = (state) => {
    //console.log(state.dashboard);
    return {
        dashboardNames: state.dashboard.dashboardNames
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToDashboard: () => dispatch(addToDashboard())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AddToDashboard);
