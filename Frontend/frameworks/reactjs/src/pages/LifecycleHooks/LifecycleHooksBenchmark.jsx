import React, {Component} from "react";
import Timer from "../../utils/Timer";
import {Button} from "@material-ui/core";
import {buildData} from "../../utils/DummyDataService";
import "./LifecycleHooks.css";
import {MatSelect} from "./components/MatSelect";
import DummyDataList from "./components/DummyDataList";
import DisplayTimeList from "./components/DisplayTimeList";

export default class LifecycleHooksBenchmark extends Component {
    isCreating = false;
    isAppending = false;
    createTimer = new Timer('createDummyData');
    appendTimer = new Timer('appendDummyData');
    deleteAllRowsTimer = new Timer('deleteAllDummyData');

    state = {
        dummyData: [],
        rowsNumber: 1000,
        createTimer: null,
        appendTimer: null,
        deleteAllRowsTimer: null
    };

    createRows() {
        this.setState({dummyData: []}, () => {
            this.createTimer.startTimer();
            this.setState({dummyData: buildData(this.state.rowsNumber)}, () => {
                this.createTimer.stopTimer();
                this.setState({createTimer: this.createTimer});
            });
        });
    }

    appendRows() {
        this.setState({dummyData: buildData(this.state.rowsNumber)}, () => {
            this.appendTimer.startTimer();
            this.setState(prevState => ({
                dummyData: prevState.dummyData.concat(buildData(this.state.rowsNumber))
            }), () => {
                this.appendTimer.stopTimer();
                this.setState({appendTimer: this.appendTimer});
            });
        });
    }

    removeAllRows() {
        this.setState({dummyData: buildData(this.state.rowsNumber)}, () => {
            this.deleteAllRowsTimer.startTimer();
            this.setState({dummyData: buildData(this.state.rowsNumber)}, () => {
                this.deleteAllRowsTimer.stopTimer();
                this.setState({deleteAllRowsTimer: this.deleteAllRowsTimer});
            });
        });
    }

    delay(ms) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    handleRowsNumberChange(rowsNumber) {
        this.setState({rowsNumber});
    }

    clearDummyData() {
        this.setState({dummyData: []});
    }

    render() {
        return (
            <div>
                <div className="actions">
                    <div>
                        <MatSelect rowsNumber={this.state.rowsNumber}
                                   handleChange={(e) => this.handleRowsNumberChange(e.target.value)}/>
                    </div>
                    <Button variant="contained" color="primary" className="ButtonMargin"
                            onClick={() => this.createRows()}>Create {this.state.rowsNumber} rows</Button>
                    <Button variant="contained" color="primary" className="ButtonMargin"
                            onClick={() => this.appendRows()}>Append {this.state.rowsNumber} rows</Button>
                    <Button variant="contained" color="primary" className="ButtonMargin"
                            onClick={() => this.removeAllRows()}>Remove all rows</Button>
                    <Button variant="contained" color="primary"
                            onClick={() => this.clearDummyData()}>Clear</Button>
                </div>
                <div className="result-container">
                    <DisplayTimeList {...this.state}/>
                </div>
                <DummyDataList dummyData={this.state.dummyData}/>
            </div>
        );
    }
}
