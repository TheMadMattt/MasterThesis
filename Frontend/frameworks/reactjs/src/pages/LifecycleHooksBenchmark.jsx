import React, {Component} from "react";
import {Functional} from "../components/User";
import Timer from "../utils/Timer";
import {Button} from "@material-ui/core";
import {buildData} from "../utils/DummyDataService";

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

    render() {
        return (
            <div>
                <div>
                    <Button variant="contained" color="primary"
                            onClick={() => this.createRows()}>Create rows</Button>
                </div>
                <Profiler id="lifecycle" onRender={this.callback}>
                    <table>
                        <tbody>
                            {this.state.dummyData.map((data) => <Functional {...data} key={data.id} />)}
                        </tbody>
                    </table>
                </Profiler>
            </div>
        );
    }
}
