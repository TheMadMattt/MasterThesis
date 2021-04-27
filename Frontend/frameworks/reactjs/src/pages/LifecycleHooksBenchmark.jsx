import React, {Component} from "react";
import {Functional} from "../components/User";
import {Button} from "@material-ui/core";

const arraySize = 1000;

const Profiler = React.Profiler;

const getUsers = () =>
    Array(arraySize)
        .fill(1)
        .map((_, index) => ({
            name: 'John Doe',
            hobby: 'Painting',
            age: Math.random() // efffectively only change first element
        }));

export default class LifecycleHooksBenchmark extends Component {
    dts = [];
    isCreating = false;
    isUpdating = false;
    isRemoving = false;
    update = [];
    remove = [];
    BENCHMARK_NUMBER = 10;

    state = {
        users: [],
        dts: [],
        update: [],
        remove: [],
        avgUpdate: 0,
        avgCreate: 0,
        avgRemove: 0
    };

    componentDidMount() {
        // this.setState({ users: getUsers() });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.isCreating) {
            this.dt = performance.now() - this.startTime;
            this.dts.push(this.dt);
            this.dt = 0;
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

    delay(ms) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    startAppendingBenchmark = async() => {
        this.update = [];
        for (let i=0; i < this.BENCHMARK_NUMBER; i++){
            this.isUpdating = true;
            this.startTime = performance.now();
            this.setState(prevState => ({ users: prevState.users.concat(getUsers()) }));
            await this.delay(0);
        }
        if(this.update.length === this.BENCHMARK_NUMBER) {
            let sum = 0;
            for(let i = 0; i < this.dts.length; i++ ){
                sum += this.update[i]
            }
            const avg = sum/this.update.length;
            this.setState({update: this.update, avgUpdate: avg });
        }
    }

    startRemovingBenchmark = async() => {
        this.remove = [];
        for (let i=0; i < this.BENCHMARK_NUMBER; i++){
            this.isRemoving = true;
            this.startTime = performance.now();
            this.setState({ users: [] });
            await this.delay(0);
            this.setState({ users: getUsers() }, () => {
                this.isRemoving = true;
            })
            await this.delay(0);
        }
        if(this.remove.length === this.BENCHMARK_NUMBER) {
            let sum = 0;
            for(let i = 0; i < this.remove.length; i++ ){
                sum += this.remove[i]
            }

            const avg = sum/this.remove.length;
            this.setState({remove: this.remove, avgRemove: avg});
        }
    }

    startCreatingBenchmark = async() => {
        this.dts = [];
        for (let i=0; i < this.BENCHMARK_NUMBER; i++){
            this.isCreating = true;
            this.startTime = performance.now();
            this.setState({ users: getUsers() });
            await this.delay(0);
        }
        if(this.dts.length === this.BENCHMARK_NUMBER) {
            let sum = 0;
            for(let i = 0; i < this.dts.length; i++ ){
                sum += this.dts[i]
            }

            const avg = sum/this.dts.length;
            this.setState({dts: this.dts, avgCreate: avg});
        }
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
                    <Button variant="contained" color="primary" onClick={() => this.startCreatingBenchmark()}>Run creating benchmark</Button>
                    <Button variant="contained" color="primary" onClick={() => this.startAppendingBenchmark()}>Run update benchmark</Button>
                    <Button variant="contained" color="primary" onClick={() => this.startRemovingBenchmark()}>Run remove benchmark</Button>
                </div>
                <div>
                    <h1>Create</h1>
                    {this.state.dts.map((dt, index) => <li key={index}>{dt}</li>)}
                </div>
                <div>
                    <h1>Update</h1>
                    {this.state.update.map((dt, index) => <li key={index}>{dt}</li>)}
                </div>
                <div>
                    <h1>Remove</h1>
                    {this.state.remove.map((dt, index) => <li key={index}>{dt}</li>)}
                </div>
                <Profiler id="lifecycle" onRender={this.callback}>
                    <table>
                        <tbody>
                            {this.state.users.map((user, index) => {
                                return <Functional {...user} key={index} />;
                            })}
                        </tbody>
                    </table>
                </Profiler>
            </div>
        );
    }
}
