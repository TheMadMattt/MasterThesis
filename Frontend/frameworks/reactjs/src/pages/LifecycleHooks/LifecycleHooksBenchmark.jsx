import React, {Component} from "react";
import Timer from "../../utils/Timer";
import {Button} from "@material-ui/core";
import {buildData} from "../../utils/DummyDataService";
import {DummyDataDisplay} from "../../components/DummyDataDisplay";
import "./LifecycleHooks.css";
import {MatSelect} from "./components/MatSelect";

const Profiler = React.Profiler;

export default class LifecycleHooksBenchmark extends Component {
    isCreating = false;
    isUpdating = false;
    isAppending = false;
    isDeleting = false;
    isReading = false;
    createTimer = new Timer('createDummyData');
    updateTimer = new Timer('updateDummyData');
    appendTimer = new Timer('appendDummyData');
    deleteTimer = new Timer('deleteDummyData');
    readTimer = new Timer('readDummyData');

    state = {
        dummyData: [],
        rowsNumber: 1000
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.isCreating) {
            this.createTimer.stopTimer();
            this.isCreating = false;
        }
        if(this.isUpdating) {
            this.updateTime = performance.now() - this.startTime;
            this.update.push(this.updateTime);
            this.updateTime = 0;
            this.isUpdating = false;
        }
        if(this.isRemoving) {
            this.removeTime = performance.now() - this.startTime;
            this.remove.push(this.removeTime);
            this.removeTime = 0;
            this.isUpdating = false;
        }
    }

    createRows() {
        this.isCreating = true;
        this.createTimer.startTimer();
        const dummyData = buildData(1000);
        this.setState({dummyData});
    }

    callback(id, phase, actualTime, baseTime, startTime, commitTime, interactions) {
        console.log(id, phase, actualTime, baseTime, interactions);
        if (phase === "update") {
            let rendering = JSON.parse(localStorage.getItem("render"));
            if (rendering === null) {
                rendering = [];
            }
            rendering.push(baseTime);
            localStorage.setItem("render", JSON.stringify(rendering));
        }
    }

    handleRowsNumberChange(rowsNumber) {
        this.setState({rowsNumber});
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
                            onClick={() => this.createRows()}>Create rows</Button>
                    <Button variant="contained" color="primary"
                            onClick={() => this.createRows()}>Create rows</Button>
                </div>
                <Profiler id="lifecycle" onRender={this.callback}>
                    <table>
                        <tbody>
                            {this.state.dummyData.map((data) => <DummyDataDisplay {...data} key={data.id} />)}
                        </tbody>
                    </table>
                </Profiler>
            </div>
        );
    }
}
