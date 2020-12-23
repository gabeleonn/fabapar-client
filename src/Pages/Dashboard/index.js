import React from 'react';

import {
    Card,
    DashboardWrapper,
    CardCount,
    CardTitle,
    CardCounter,
    ChartWidget,
    DashboardInner,
} from './DashboardElements';

const Dashboard = () => {
    const BarChart = {
        options: {
            theme: {
                mode: 'light',
                palette: 'palette2',
                monochrome: {
                    enabled: true,
                    color: '#F79862',
                    shadeTo: 'light',
                    shadeIntensity: 0.65,
                },
            },
            chart: {
                id: 'barchart',
                foreColor: '#fff',
            },
            xaxis: {
                categories: [
                    1991,
                    1992,
                    1993,
                    1994,
                    1995,
                    1996,
                    1997,
                    1998,
                    1999,
                ],
            },
        },
        series: [
            {
                name: 'series-1',
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
            },
        ],
    };

    const PieChart = {
        series: [44, 55, 13, 43, 22],
        options: {
            theme: {
                mode: 'light',
                palette: 'palette10',
                monochrome: {
                    enabled: true,
                    color: '#F79862',
                    shadeTo: 'light',
                    shadeIntensity: 0.65,
                },
            },
            chart: {
                id: 'piechart',
                width: 300,
                type: 'pie',
                foreColor: '#fff',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        },
    };

    return (
        <DashboardInner>
            <DashboardWrapper>
                <CardCount>
                    <CardTitle>Title</CardTitle>
                    <CardCounter>5</CardCounter>
                </CardCount>
                <CardCount>
                    <CardTitle>Title</CardTitle>
                    <CardCounter>5</CardCounter>
                </CardCount>
                <CardCount>
                    <CardTitle>Title</CardTitle>
                    <CardCounter>5</CardCounter>
                </CardCount>
                <CardCount>
                    <CardTitle>Title</CardTitle>
                    <CardCounter>5</CardCounter>
                </CardCount>
                <CardCount>
                    <CardTitle>Title</CardTitle>
                    <CardCounter>5</CardCounter>
                </CardCount>
                <CardCount>
                    <CardTitle>Title</CardTitle>
                    <CardCounter>5</CardCounter>
                </CardCount>
                <Card>
                    <ChartWidget
                        options={BarChart.options}
                        series={BarChart.series}
                        width="100%"
                        type="bar"
                    />
                </Card>
                <Card>
                    <ChartWidget
                        options={PieChart.options}
                        series={PieChart.series}
                        width="100%"
                        type="pie"
                    />
                </Card>
            </DashboardWrapper>
        </DashboardInner>
    );
};

export default Dashboard;
