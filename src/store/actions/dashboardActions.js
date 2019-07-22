export const getDashboard = (dashboardId) => {
    return (dispatch) => {
        if(dashboardId) {
            fetch("http://localhost:3000/dashboards/" + dashboardId)
                .then((response) => response.json())
                .then((data) => {
                    //console.log(data);
                    return dispatch({type: "FETCH_DASHBOARD", dashboard: data});

                }).catch((error) => {
                return dispatch({type: 'FETCH_DASHBOARD_ERROR', error})
            })
        }
    }
};

export const getDashboardNames = () => {
    return (dispatch) => {
        return fetch("http://localhost:3000/dashboardNames")
            .then((response) => response.json())
            .then((response) => {
                //console.log(response);
                return dispatch({type: "FETCH_DASHBOARD_NAMES", dashboardNames: response});
            })
            .catch((error) => {
                dispatch({type: 'FETCH_DASHBOARD_NAMES_ERROR', error})
            })

    }
};

export const addToDashboard = (id, metricId) => {
    return (dispatch) => {
        var payload = {
            id: metricId
        };

        var data = new FormData();
        data.append( "json", JSON.stringify( payload ) );

        fetch("http://localhost:3000/dashboards/"+id,
            {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
    }
}
