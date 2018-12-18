import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Portfolio from './Portfolio';
import AddPortfolioForm from './AddPortfolioForm';
import {setCookie, getCookie, eraseCookie} from './utils';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolios: props.data
        };
    }

    componentDidUpdate() {
        setCookie("portfolios", JSON.stringify(this.state.portfolios));
    };

    removePortfolio = name => {
        this.setState({
            portfolios: this.state.portfolios.filter((portfolio) => {
                return portfolio.name !== name;
            })
        });
    };

    handleSubmit = portfolio => {
        let exists = false;
        this.state.portfolios.forEach(function(portf) {
            if (portf.name === portfolio.name) {
                exists = true;
            }
        });
        if (!exists) {
            const newPortfolios = [...this.state.portfolios, portfolio];
            this.setState({
                portfolios: newPortfolios
            });
        }
    };

    updateStockCookie = (name, newStockData) => {
        let ports = this.state.portfolios;
        for (let i = 0; i < ports.length; i++) {
            if (ports[i].name === name) {
                ports[i].data = newStockData;
            }
        }
        setCookie("portfolios", JSON.stringify(ports));
    };

    render() {
        const objects = this.state.portfolios.map((portfolio) => {
            return (
                <Portfolio
                    name={portfolio.name}
                    data={portfolio.data}
                    key={portfolio.name}
                    removePortfolio={this.removePortfolio}
                    updateStockCookie={this.updateStockCookie}
                />
            );
        });
        return (
            <div className="global">
                <AddPortfolioForm handleSubmit={this.handleSubmit} />
                <div className="portfolios-container">
                    {objects}
                </div>
            </div>
        );
    }
}
let cookie = getCookie("portfolios");
if (cookie == null) {
    cookie = [];
} else {
    cookie = JSON.parse(cookie);
}
ReactDOM.render(<App data={cookie}/>, document.getElementById("root"));