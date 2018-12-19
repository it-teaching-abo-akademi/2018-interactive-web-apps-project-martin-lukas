import React, {Component} from "react";
import Popup from 'reactjs-popup';
import Chart from './Chart';

class ChartPopup extends Component {
    render() {
        return(
            <Popup
                trigger={<button className="button">Show graph</button>}
                modal
                closeOnDocumentClick
            >
                <Chart data={this.props.data} />
            </Popup>
        );
    }
}

export default ChartPopup;