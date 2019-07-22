import React from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import icons from '../side-effects/font-awesome';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navigation from "./layout/navbar";
import Dashboard from "../components/dashboard/dashboard"
import {connect} from "react-redux";
import {getDashboard} from "../store/actions/dashboardActions";
import {getMetrics} from "../store/actions/metricAction";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

library.add(...icons);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.props.fetchMetrics();
    }

    render() {
        return (
            <BrowserRouter>
                <Navigation/>
                <Switch >
                    <Route  path='/dashboard/:id' component={Dashboard}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMetrics: () => dispatch(getMetrics()),
        fetchDashboard: (id) => dispatch(getDashboard(id))
    }
};

export default connect(null, mapDispatchToProps)(App);
