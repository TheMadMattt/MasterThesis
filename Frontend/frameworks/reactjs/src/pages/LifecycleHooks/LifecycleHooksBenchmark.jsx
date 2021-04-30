import React, {Component} from "react";
import Timer from "../../utils/Timer";
import {Button} from "@material-ui/core";
import {buildData, random} from "../../utils/DummyDataService";
import "./LifecycleHooks.css";
import {MatSelect} from "./components/MatSelect";
import DummyDataList from "./components/DummyDataList";
import DisplayTimeList from "./components/DisplayTimeList";

export default class LifecycleHooksBenchmark extends Component {
    isCreating = false;
    isAppending = false;
    createTimer = new Timer('createDummyData');
    updateAllTimer = new Timer('updateAllRowsTimer')
    appendTimer = new Timer('appendDummyData');
    deleteAllTimer = new Timer('deleteAllDummyData');
    selectRandomTimer = new Timer('selectRandomRowTimer');
    updateRandomTimer = new Timer('updateRandomRowTimer');
    deleteRandomTimer = new Timer('deleteRandomTimer');

    state = {
        dummyData: [],
        selectedDummyData: null,
        rowsNumber: 1000,
        createTimer: null,
        appendTimer: null,
        deleteAllTimer: null,
        updateAllTimer: null,
        selectRandomTimer: null,
        updateRandomTimer: null,
        deleteRandomTimer: null
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

    updateAllRows() {
        this.setState({dummyData: buildData(this.state.rowsNumber)}, () => {
            this.updateAllTimer.startTimer();
            const newData = this.state.dummyData.slice(0);

            for (let i = 0; i < newData.length; i++) {
                const r = newData[i];

                newData[i] = {
                    id: r.id,
                    title: r.title + " UPDATED",
                    description: r.description + " UPDATED",
                    completed: !r.completed
                };
            }
            this.setState({dummyData: newData}, () => {
                this.updateAllTimer.stopTimer();
                this.setState({updateAllTimer: this.updateAllTimer});
            });
        });
    }

    appendRows() {
        this.setState({dummyData: buildData(this.state.rowsNumber)}, () => {
            this.appendTimer.startTimer();
            this.setState(prevState => ({
                dummyData: prevState.dummyData.concat(buildData(1000))
            }), () => {
                this.appendTimer.stopTimer();
                this.setState({appendTimer: this.appendTimer});
            });
        });
    }

    removeAllRows() {
        this.setState({dummyData: buildData(this.state.rowsNumber)}, () => {
            this.deleteAllTimer.startTimer();
            this.setState({dummyData: buildData(this.state.rowsNumber)}, () => {
                this.deleteAllTimer.stopTimer();
                this.setState({deleteAllTimer: this.deleteAllTimer});
            });
        });
    }

    selectRandomRow() {
        this.setState({dummyData: buildData(this.state.rowsNumber)}, () => {
            const data = this.state.dummyData
            this.selectRandomTimer.startTimer();
            const id = random(data.length);
            const selected = data[id];
            this.setState({selectedDummyData: selected}, () => {
                this.selectRandomTimer.stopTimer();
                this.setState({selectRandomTimer: this.selectRandomTimer});
            });
        });
    }

    updateRandomRow() {
        this.setState({dummyData: buildData(this.state.rowsNumber)}, () => {
            let data = this.state.dummyData
            this.updateRandomTimer.startTimer();
            const id = random(data.length);
            const selectedDummyItem = data[id];
            selectedDummyItem.title += " UPDATED";
            selectedDummyItem.description += " UPDATED";

            data[id] = selectedDummyItem;

            this.setState({dummyData: data}, () => {
                this.updateRandomTimer.stopTimer();
                this.setState({updateRandomTimer: this.updateRandomTimer});
            });
        });
    }

    removeRandomRow() {
        this.setState({dummyData: buildData(this.state.rowsNumber)}, () => {
            const data = this.state.dummyData
            this.deleteRandomTimer.startTimer();
            const id = random(data.length);


            this.setState({ dummyData: [...data.slice(0, id), ...data.slice(id + 1)] }, () => {
                this.deleteRandomTimer.stopTimer();
                this.setState({updateRandomTimer: this.updateRandomTimer});
            });
        });
    }

    handleRowsNumberChange(rowsNumber) {
        this.setState({rowsNumber});
    }

    clear() {
        window.location.reload();
    }

    render() {
        const selectedItem = this.state.selectedDummyData;
        return (
            <div>
                <div className="actions">
                    <div>
                        <MatSelect rowsNumber={this.state.rowsNumber}
                                   handleChange={(e) => this.handleRowsNumberChange(e.target.value)}/>
                    </div>
                    <div className="flex-row operations">
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.createRows()}>Create {this.state.rowsNumber} rows</Button>
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.updateAllRows()}>Update {this.state.rowsNumber} rows</Button>
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.appendRows()}>Append 1000 rows</Button>
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.removeAllRows()}>Remove all rows</Button>
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.selectRandomRow()}
                                disabled={this.state.dummyData.length <= 0}>Select random row</Button>
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.updateRandomRow()}
                                disabled={this.state.dummyData.length <= 0}>Update random row</Button>
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.removeRandomRow()}
                                disabled={this.state.dummyData.length <= 0}>Remove random row</Button>
                        <Button variant="contained" color="primary"
                                onClick={() => this.clear()}>Clear</Button>
                    </div>
                </div>
                <div className="result-container">
                    <DisplayTimeList {...this.state}/>
                </div>
                <div>
                    {selectedItem &&
                    <p><b>Selected item:</b> {selectedItem.id} | {selectedItem.title} | {selectedItem.description}</p>}
                </div>
                <DummyDataList dummyData={this.state.dummyData}/>
            </div>
        );
    }
}
