import React, {Component} from "react";
import Table from "./Table";
import AddStockForm from "./AddStockForm";
// import {setCookie, getCookie, eraseCookie} from './utils';

const API = "R2XFYH8AEAQTGTHE";

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            submitted: false
        };
    }

    componentDidUpdate() {
        if (this.state.submitted) {
            let that = this;
            let data = this.state.data;
            let newestStock = null;
            const len = data.length;
            if (len !== 0) {
                newestStock = data[len - 1];
            }
            if (newestStock !== null) {
                let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${newestStock.symbol}&outputsize=compact&apikey=${API}`;
                let xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            let result = JSON.parse(xhr.responseText);
                            console.log(result);
                            const tsObj = result["Time Series (Daily)"];
                            const dates = Object.keys(tsObj);
                            newestStock.value = parseFloat(tsObj[dates[0]]["4. close"]).toFixed(2);
                            data[len-1] = newestStock;
                            that.props.updateStockCookie(that.props.name, data);
                            that.setState({
                                data: data,
                                submitted: false
                            });
                        } else {
                            console.error(xhr.statusText);
                        }
                    }
                };
                xhr.send();
            }
        }
    }

    removeStock = index => {
        this.setState({
            data: this.state.data.filter((stock, i) => {
                return i !== index;
            })
        });
    };

    handleSubmit = stock => {
        stock.symbol = stock.symbol.toUpperCase();
        let exists = false;
        this.state.data.forEach(function(st) {
            if (st.symbol === stock.symbol) {
                exists = true;
            }
        });
        if (!exists) {
            this.setState({
                data: [...this.state.data, stock],
                submitted: true
            });
        }
    };

    totalStockValue = () => {
        let sum = 0;
        let data = this.state.data;
        for (let i = 0; i < data.length; i++) {
            sum += parseFloat(data[i].value) * parseInt(data[i].quantity);
        }
        return sum.toFixed(2);
    };

    render() {
        return (
            <div className="portfolio-element">
                <div className="portfolio-header">
                    <p className="portfolio-name">{this.props.name}</p>
                    <button onClick={() => this.props.removePortfolio(this.props.name)}>X</button>
                </div>
                <Table
                    data={this.state.data}
                    removeStock={this.removeStock}
                />
                <p className="total-sum">Total value of {this.props.name}: {this.totalStockValue()}</p>
                <AddStockForm handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default Portfolio;