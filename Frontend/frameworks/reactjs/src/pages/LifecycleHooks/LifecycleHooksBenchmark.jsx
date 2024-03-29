import React, {Component} from "react";
import Timer from "../../utils/Timer";
import {Button} from "@material-ui/core";
import {buildData, random} from "../../utils/DummyDataService";
import "./LifecycleHooks.css";
import DummyDataList from "./components/DummyDataList";
import {MatSelect} from "../../components/MatSelect";
import DisplayTimesLifecycle from "./components/DisplayTimesLifecycle";
import excelService from "../../utils/ExcelService";
import GetAppIcon from '@material-ui/icons/GetApp';

const rowsNumberList = [1000, 2000, 5000, 10000];

export default class LifecycleHooksBenchmark extends Component {
    createTimer = new Timer('createTimer');
    updateAllTimer = new Timer('updateAllTimer')
    appendTimer = new Timer('appendTimer');
    removeAllTimer = new Timer('removeAllTimer');
    selectRandomTimer = new Timer('selectRandomTimer');
    updateRandomTimer = new Timer('updateRandomTimer');
    removeRandomTimer = new Timer('removeRandomTimer');
    swapTimer = new Timer('swapTimer');

    state = {
        dummyData: [],
        selectedDummyData: null,
        rowsNumber: 1000,
        createTimer: null,
        appendTimer: null,
        removeAllTimer: null,
        updateAllTimer: null,
        selectRandomTimer: null,
        updateRandomTimer: null,
        removeRandomTimer: null,
        swapTimer: null
    };

    componentDidMount() {
        this.setTimersRowsNumber(this.state.rowsNumber);
    }

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


    swapRows() {
        this.setState({dummyData: buildData(this.state.rowsNumber)}, () => {
            this.swapTimer.startTimer();
            const dummyData = this.state.dummyData;
            this.setState({ dummyData: [dummyData[dummyData.length-1], ...dummyData.slice(1, dummyData.length-1),
                    dummyData[0]] }, () => {
                this.swapTimer.stopTimer();
                this.setState({swapTimer: this.swapTimer});
            });
        });
    }

    removeAllRows() {
        this.setState({dummyData: buildData(this.state.rowsNumber)}, () => {
            this.removeAllTimer.startTimer();
            this.setState({dummyData: buildData(this.state.rowsNumber)}, () => {
                this.removeAllTimer.stopTimer();
                this.setState({removeAllTimer: this.removeAllTimer});
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
            this.removeRandomTimer.startTimer();
            const id = random(data.length);


            this.setState({ dummyData: [...data.slice(0, id), ...data.slice(id + 1)] }, () => {
                this.removeRandomTimer.stopTimer();
                this.setState({removeRandomTimer: this.removeRandomTimer});
            });
        });
    }

    handleRowsNumberChange(rowsNumber) {
        this.setTimersRowsNumber(rowsNumber);
        this.setState({rowsNumber});
    }

    clear() {
        window.location.reload();
    }

    setTimersRowsNumber(rowsNumber) {
        const timers = [this.createTimer, this.updateAllTimer, this.appendTimer, this.removeAllTimer,
            this.selectRandomTimer, this.removeRandomTimer, this.updateRandomTimer, this.swapTimer];

        timers.forEach(timer => {
            timer.setRowsNumber(rowsNumber);
        })
    }

    saveTimesToExcel() {
        const timers = [this.createTimer, this.updateAllTimer, this.appendTimer, this.removeAllTimer,
            this.selectRandomTimer, this.removeRandomTimer, this.updateRandomTimer, this.swapTimer];

        excelService.saveTimersToExcel(timers, "LIFECYCLE-HOOKS-REACT");
    }

    render() {
        const selectedItem = this.state.selectedDummyData;
        return (
            <div>
                <div className="actions">
                    <div>
                        <MatSelect name="rowNumber" title="Row number"
                                   initialValue={this.state.rowsNumber}
                                   handleChange={(e) => this.handleRowsNumberChange(e.target.value)}
                                   selectDropdownList={rowsNumberList}/>
                    </div>
                    <div className="flex-row operations">
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.createRows()}>Create {this.state.rowsNumber} rows</Button>
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.updateAllRows()}>Update {this.state.rowsNumber} rows</Button>
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.appendRows()}>Append 1000 rows</Button>
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.swapRows()}>Swap first and last row</Button>
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
                        <Button variant="contained" color="primary" className="ButtonMargin"
                                onClick={() => this.clear()}>Clear</Button>
                        <Button variant="contained" color="default" startIcon={<GetAppIcon />}
                                onClick={() => this.saveTimesToExcel()}>
                            Save times to excel
                        </Button>
                    </div>
                </div>
                <div className="result-container">
                    <DisplayTimesLifecycle {...this.state}/>
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
