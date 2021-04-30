import React, {Component} from "react";
import Timer from "../../utils/Timer";
import {Button} from "@material-ui/core";
import {buildData} from "../../utils/DummyDataService";
import {DummyDataDisplay} from "../../components/DummyDataDisplay";
import "./LifecycleHooks.css";
import {MatSelect} from "./components/MatSelect";
import {DisplayTime} from "../../components/DisplayTime";

export default class LifecycleHooksBenchmark extends Component {
    isCreating = false;
    isAppending = false;
    createTimer = new Timer('createDummyData');
    appendTimer = new Timer('appendDummyData');

    state = {
        dummyData: [],
        rowsNumber: 1000,
        createTimer: null,
        appendTimer: null
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.isAppending) {
            this.appendTimer.stopTimer();
            this.isAppending = false;
            this.setState({appendTimer: this.appendTimer});
        }
        if(this.isRemoving) {
            this.removeTime = performance.now() - this.startTime;
            this.remove.push(this.removeTime);
            this.removeTime = 0;
            this.isUpdating = false;
        }
    }

    async createRows() {
        this.setState({dummyData: []});
        await this.delay(0);
        this.createTimer.startTimer();
        this.setState({dummyData: buildData(this.state.rowsNumber)}, () => {
            this.createTimer.stopTimer();
            this.setState({createTimer: this.createTimer});
        });
    }

    async appendRows() {
        const appendData = buildData(this.state.rowsNumber);
        this.setState({dummyData: appendData});
        await this.delay(0);
        this.appendTimer.startTimer();
        this.setState(prevState => ({
            dummyData: prevState.dummyData.concat(appendData)
        }), () => {
            this.appendTimer.stopTimer();
            this.setState({appendTimer: this.appendTimer});
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
                            onClick={() => this.createRows()}>Create rows</Button>
                    <Button variant="contained" color="primary"
                            onClick={() => this.clearDummyData()}>Clear</Button>
                </div>
                <div className="result-container">
                    <DisplayTime title={"Creating " + this.state.rowsNumber + " rows"}
                                 timer={this.state.createTimer}/>
                    <DisplayTime title={"Appending " + this.state.rowsNumber + " rows"}
                                 timer={this.state.appendTimer}/>
                </div>
                <div className="data-table">
                    <table>
                        <tbody>
                        {this.state.dummyData.map((data, index) =>
                            <DummyDataDisplay {...data} key={index} />
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
