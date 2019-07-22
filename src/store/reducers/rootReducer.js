import {combineReducers} from 'redux'
import dashboardReducer from "./dashboardReducer";
import metricsReducer from "./metricReducer";

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    metrics: metricsReducer
});

export default rootReducer;
