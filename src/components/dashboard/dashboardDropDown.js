import React from 'react';
import {NavDropdown} from "react-bootstrap";
import {connect} from "react-redux";
import {getDashboardNames} from "../../store/actions/dashboardActions";


class DashboardDropDown extends React.Component {

    constructor(props) {
        super(props);
        this.props.fetchDashboardNames();
    }

    render() {
        const title = "Dashboards";
        const dashboardNames = this.props.dashboardNames;
        const dashboardItems = dashboardNames && dashboardNames.map(dashboardName => (
            <NavDropdown.Item key={dashboardName.id} href={'/dashboard/' + dashboardName.id}>
                {dashboardName.name}
            </NavDropdown.Item>
        ));
        return (
            <NavDropdown title={title} id="basic-nav-dropdown">
                {dashboardItems}
            </NavDropdown>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dashboardNames: state.dashboard.dashboardNames,
        metrics: state.metrics,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDashboardNames: () => dispatch(getDashboardNames())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDropDown);
