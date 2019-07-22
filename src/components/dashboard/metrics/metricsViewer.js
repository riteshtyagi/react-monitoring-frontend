import React from 'react';
import StatusViewer from "./statusViewer";
import {Responsive, WidthProvider} from 'react-grid-layout';
import ChartViewer from "./chartViewer";

const ResponsiveGridLayout = WidthProvider(Responsive);

class MetricsViewer extends React.Component {

    render() {
        const metrics = this.props.metrics;
        if(metrics && metrics.length>0) {
            const metricView = this.getMetricsViewListBasedOnType(metrics);
            return (
                this.getResponsiveGrid(metricView)
            )
        }
        return null;
    }

    getMetricsViewListBasedOnType(metrics) {
        return metrics.map((metric, index) => {
            if (metric.type === "STATUS") {
                return (
                    <div key={metric.id.toString()}>
                        <StatusViewer metricId={metric.id} title={metric.name} status={metric.status}/>
                    </div>
                )
            }
            return (
                <div key={metric.id.toString()} >
                    <ChartViewer metric={metric}/>
                </div>
            )
        });
    }

    getResponsiveGrid(metricView) {
        return <ResponsiveGridLayout className="layout text-white " layouts={this.props.layouts}
                                     cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
                                     rowHeight={140}
                                     margin={[40,40]}
                                     onLayoutChange={(layout, layouts) =>
                                         this.props.onLayoutChange(layout, layouts)
                                     }
        >
            {metricView}
        </ResponsiveGridLayout>;
    }
}


export default MetricsViewer;

