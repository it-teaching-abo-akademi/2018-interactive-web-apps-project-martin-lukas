import React, {Component} from "react";

class AddStockForm extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            symbol: '',
            value: parseFloat("0.00"),
            quantity: ''
        };

        this.state = this.initialState;
    }

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    submitForm = () => {
        if (this.state.symbol !== '' && this.state.quantity !== '' && !isNaN(this.state.quantity)) {
            this.props.handleSubmit(this.state);
            this.setState(this.initialState);
        }
    };

    render() {
        return (
            <form className="stock-form">
                <label>Symbol:</label>
                <input
                    type="text"
                    name="symbol"
                    className="symbol-input-field"
                    value={this.state.symbol}
                    onChange={this.handleChange} />
                <label>Quantity:</label>
                <input
                    type="text"
                    name="quantity"
                    className="quantity-input-field"
                    value={this.state.quantity}
                    onChange={this.handleChange}/>
                <input
                    type="button"
                    value="Add"
                    onClick={this.submitForm} />
            </form>
        );
    }
}

export default AddStockForm;