export const getMetrics = () => {
    return (dispatch) => {
        fetch("http://localhost:3000/metrics")
            .then((response) => response.json())
            .then((data) => {
                return dispatch({type: "FETCH_METRICS", metrics: data});
            })
            .catch((error) => {
                return dispatch({type: 'FETCH_METRICS_ERROR', error})
            })
    }
};
