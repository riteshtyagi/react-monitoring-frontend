import React from 'react';
import {Bar, Doughnut, HorizontalBar, Line, Pie} from "react-chartjs-2";
import {Card} from "react-bootstrap";
import AddToDashboard from "./addToDashboardDropdown";
import ReactSpeedometer from "react-d3-speedometer"

const ChartViewer = ({metric}) => {
    const {type, values} = metric;
    const data = {
        speedometerData:{
            maxLabel: values.maxValue,
            currentValue: values.value,
            startColor: values.startColor ? values.startColor.toLowerCase() : "",
            endColor: values.endColor ? values.endColor.toLowerCase() : "",
            segmentColors: values.segmentColors ? values.segmentColors : ["GREEN","RED","YELLOW"],
            segments: values.segments ? values.segments : 3
        },
        chartData: {
            labels: values.labels,
            datasets: [
                {
                    label: metric.name,
                    backgroundColor: values.labels ? dynamicColors(values.labels.length) : [],
                    hoverBackgroundColor: values.labels ? dynamicColors(values.labels.length): [],
                    borderColor: 'rgba(255,99,132,0.3)',
                    borderWidth: 1,
                    hoverBorderColor: 'rgba(255,99,132,0.3)',
                    data: values.data
                }
            ]
        }

    };

    return <Card className="text-center h-100 border-primary">
        <AddToDashboard metric={metric.id}/>
        <Card.Body className="h-100">
            <Card.Title className="text-dark">{metric.name}</Card.Title>
            {getChartWithData(type, data.chartData, data.speedometerData)}
        </Card.Body>
    </Card>
};


function getChartWithData(type, chartData, speedometerData) {
    const className="h-100";
    switch (type) {
        case 'BARCHART':
            chartData.datasets.forEach(dataset => singleColorChart(dataset));
            return (
                <Bar className={className} data={chartData}></Bar>
            );
        case "PIECHART":
            return (
                <Pie className={className} data={chartData}></Pie>
            );
        case 'LINECHART':
            return (
                <Line className={className} data={chartData}></Line>
            );
        case "DOUGHNUT":
            return (
                <Doughnut className={className} data={chartData}></Doughnut>
            );
        case 'HORIZONTALBARCHART':
            chartData.datasets.forEach(dataset => singleColorChart(dataset));
            return (
                <HorizontalBar className={className} data={chartData}></HorizontalBar>
            );
        case 'SPEEDOMETER':
            return (
                <ReactSpeedometer
                    maxValue={speedometerData.maxLabel}
                    value={speedometerData.currentValue}
                    needleColor="black"
                    startColor={speedometerData.startColor}
                    segments={speedometerData.segments}
                    segmentColors={speedometerData.segmentColors}
                    endColor={speedometerData.endColor}
                    needleTransitionDuration={4000}
                    needleTransition="easeElastic"
                />
            );
        default:
            return (
                <Bar className={className} data={chartData}></Bar>
            );
    }
}

function singleColorChart(dataset) {
    dataset.backgroundColor = dynamicColors(1)[0];
    dataset.hoverBackgroundColor = dynamicColors(1)[0];
}

var dynamicColors = function (size) {
    let dynamicColors = [];
    for (let i = 0; i < size; i++) {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        dynamicColors.push("rgba(" + r + "," + g + "," + b + "," + 0.3  +")");
    }
    return dynamicColors;
};

export default ChartViewer;
