import React from 'react'
import {connect} from "react-redux";
import {getDashboard} from "../../store/actions/dashboardActions";
import MetricsViewer from "./metrics/metricsViewer"
import {Col, Row} from "react-bootstrap";
import _ from "lodash";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.props.fetchDashboard(this.props.id);

        console.log(`getting layout for ${this.props.id}`);

        const originalLayouts = getFromLS("layouts", "dashboard" + (this.props.id || "")) || {lg:generateLayout()};

        this.state = {
            layouts: JSON.parse(JSON.stringify(originalLayouts))
        };
    }

    onLayoutChange(layout, layouts) {
        console.log(`layout changed for ${this.props.id} `);
        //console.log(layouts);
        saveToLS("layouts", layouts, "dashboard" + (this.props.id || ""));
        this.setState({layouts});
    }

    render() {
        const dashboard = this.props.dashboard;
        const metrics = this.props.metrics;

        let dashboardMetrics = this.getDashboardMetrics(dashboard, metrics);

        return (
            <React.Fragment>
                <Row className="text-center">
                    <Col>
                        <h2>{dashboard.name ? dashboard.name : ""}</h2>
                    </Col>
                </Row>
                <MetricsViewer metrics={dashboardMetrics} layouts={this.state.layouts}  onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}></MetricsViewer>
            </React.Fragment>
        );
    }

    getDashboardMetrics(dashboard, metrics) {
        let dashboardMetrics = [];
        if (dashboard && dashboard.metricsDetails && metrics) {
            dashboardMetrics = metrics.filter(metric => {
                const metricDetail = dashboard.metricsDetails.find(metricDetail => metric.id === metricDetail.id);
                if (metricDetail && metricDetail.id) {
                    metric.details = metricDetail.details;
                    return true;
                }
                return false;
            });

        } else if (metrics.length>0) {
            dashboardMetrics = metrics;
        }
        return dashboardMetrics;
    }
}

function generateLayout() {
    return _.map(_.range(0, 25), function (item, i) {
        var y = Math.ceil(Math.random() * 4) + 1;
        return {
            x: (_.random(0, 5) * 2) % 12,
            y: Math.floor(i / 6) * y,
            w: 2,
            h: 2,
            i: i.toString()
        };
    });
}

function getFromLS(key, dashboardId) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem(dashboardId)) || {};
        } catch (e) {
            /*Ignore*/
        }
    }
    return ls[key];
}

function saveToLS(key, value, dashboardId) {
    if (global.localStorage) {
        global.localStorage.setItem(
            dashboardId,
            JSON.stringify({
                [key]: value
            })
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    //console.log(state);
    return {
        dashboard: state.dashboard.dashboard,
        metrics: state.metrics.metrics,
        id: ownProps.match.params.id
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDashboard: (id) => dispatch(getDashboard(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
