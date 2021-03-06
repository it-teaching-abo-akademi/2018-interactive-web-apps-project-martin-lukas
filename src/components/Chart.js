import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

const API = "R2XFYH8AEAQTGTHE";

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: [],
                datasets: [],
            }
        }
    }

    componentDidMount() {
        let that = this;
        let data = this.props.data;
        let symbols = [];
        let colors = [];
        for (let i = 0; i < data.length; i++) {
            symbols.push(data[i].symbol);
            colors.push(this.getRandomColor());
        }
        // AJAX request loop. Sets state to the responses.
        // TODO There is a problem with timing I think. Not everytime do all the responses get rendered into the graph.
        for (let i = 0; i < symbols.length; i++) {
            let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbols[i]}&outputsize=compact&apikey=${API}`;
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let result = JSON.parse(xhr.responseText);
                        const tsObj = result["Time Series (Daily)"];
                        if (typeof tsObj !== "undefined") {
                            let dates = Object.keys(tsObj);
                            let dataset = {
                                data: [],
                                label: symbols[i],
                                fill: false,
                                borderColor: colors[i]
                            };
                            for (let j = 0; j < dates.length; j++) {
                                dataset.data.push(parseFloat(tsObj[dates[j]]["4. close"]).toFixed(2));
                            }
                            that.setState({
                                data: {
                                    labels: dates,
                                    datasets: [...that.state.data.datasets, dataset]
                                }
                            });
                        }
                    } else {
                        console.error(xhr.statusText);
                    }
                }
            };
            xhr.send();
        }
    }

    getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    render() {
        return (
            <div className="chart">
                <Line
                    data={this.state.data}
                    options={{
                        maintainAspectRatio: false,
                        title: {
                            display: true,
                            text: 'Comparison of stock values',
                            fontSize: 20
                        },
                        elements: {
                            point:{
                                radius: 0
                            },
                            line:{
                                borderWidth: 2
                            }
                        },
                        animation: {
                            duration: 0
                        },
                        showLines: true,
                        fill: false
                    }}
                    legend={{
                        display: true,
                        position: "left"
                    }}
                />
            </div>
        );
    }
}

export default Chart;
