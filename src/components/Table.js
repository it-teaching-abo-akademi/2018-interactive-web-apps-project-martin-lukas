import React, {Component} from 'react';
import '../style.css';

class Table extends Component {
    render() {
        return (
            <div className="scroll">
            <table>
                <TableHeader />

                    <TableBody data={this.props.data} removeStock={this.props.removeStock} />

            </table>
            </div>
        );
    }
}

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Symbol</th>
                <th>Value</th>
                <th>Quantity</th>
                <th>Total value</th>
                <th>Remove</th>
            </tr>
        </thead>
    );
};

const TableBody = props => {
    let stocks = props.data.map((stock, index) => {
        let totalVal = (parseFloat(stock.quantity) * stock.value).toFixed(2);
        return (
            <tr key={index}>
                <td>{stock.symbol}</td>
                <td>{stock.value}</td>
                <td>{stock.quantity}</td>
                <td>{totalVal}</td>
                <td>
                    <button className="del-row" onClick={() => props.removeStock(index)} />
                </td>
            </tr>
        );
    });
    for (let i = props.data.length; i < 50; i++) {
        stocks.push((
            <tr className="empty-row" key={i}><td /><td /><td /><td /><td /></tr>
        ));
    }

    return <tbody>{stocks}</tbody>;
};

export default Table;