const initState = {
    metrics: []
};

const metricsReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCH_METRICS":
            return {...state, metrics: action.metrics, loading: false};
        case "FETCH_METRIC_ERROR":
            return {...state, loading: false};
        default:
            return state;
    }
};

export default metricsReducer;
