import React, {Component} from "react";
import Table from "./Table";
import AddStockForm from "./AddStockForm";

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
    }

    removeStock = index => {
        this.setState({
            data: this.state.data.filter((stock, i) => {
                return i !== index;
            })
        });
    };

    handleSubmit = stock => {
        let that = this;
        let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock.symbol}&outputsize=compact&apikey=${API}`;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let result = JSON.parse(xhr.responseText);
                    const tsObj = result["Time Series (Daily)"];
                    if (typeof tsObj !== "undefined") {
                        const dates = Object.keys(tsObj);
                        stock.value = parseFloat(tsObj[dates[0]]["4. close"]).toFixed(2);
                        stock.symbol = stock.symbol.toUpperCase();
                        let newData = that.state.data;
                        let exists = false;
                        newData.forEach(function (st) {
                            if (st.symbol === stock.symbol) {
                                exists = true;
                                st.value = stock.value;
                                st.quantity = stock.quantity;
                            }
                        });
                        if (!exists) {
                            newData = [...that.state.data, stock];
                        }
                        if (newData.length <= 50) {
                            that.setState({
                                data: newData
                            });
                        }
                        that.props.updateStockCookie(that.props.name, newData);
                    }
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.send();
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
                    <button
                        className="del-portfolio"
                        onClick={() => this.props.removePortfolio(this.props.name)}
                    />
                </div>
                <Table
                    data={this.state.data}
                    removeStock={this.removeStock}
                />
                <p className="total-sum">Total value of <b>{this.props.name}</b>: {this.totalStockValue()}</p>
                <AddStockForm handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default Portfolio;