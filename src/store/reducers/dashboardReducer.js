const initState = {
    dashboard: {},
    dashboardNames: []
};

const dashboardReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCH_DASHBOARD":
            return {...state, dashboard: action.dashboard, loading: false};
        case "FETCH_DASHBOARD_ERROR":
            return {...state, loading: false};
        case "FETCH_DASHBOARD_NAMES":
            return {...state, dashboardNames: action.dashboardNames, loading: false};
        case "FETCH_DASHBOARD_NAMES_ERROR":
            return {...state, loading: false};
        default:
            return state;
    }
};

export default dashboardReducer;
