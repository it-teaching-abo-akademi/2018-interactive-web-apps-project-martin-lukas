import React, {Component} from "react";

class AddPortfolioForm extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            name: '',
            data: []
        };
        this.state = this.initialState;
    }

    // The state gets updated every time the input changes
    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    // Submit only if the field is not empty
    submitForm = () => {
        if (!(this.state.name === '')) {
            this.props.handleSubmit(this.state);
            this.setState(this.initialState);
        }
    };

    render() {
        return (
            <form onSubmit={e => { e.preventDefault(); }}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    className="name-input-field"
                    value={this.state.name}
                    onChange={this.handleChange} />
                <input
                    type="button"
                    value="Add portfolio"
                    onClick={this.submitForm} />
            </form>
        );
    }
}

export default AddPortfolioForm;