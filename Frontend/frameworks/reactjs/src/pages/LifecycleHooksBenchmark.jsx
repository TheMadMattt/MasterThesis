import React, {Component} from "react";
import {Functional} from "../components/User";
import {Button} from "@material-ui/core";

const repeats = 400;
const arraySize = 100;

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
    update = [];

    state = {
        users: [],
        dts: [],
        update: []
    };

    componentDidMount() {
        this.setState({ users: getUsers() });
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
    }

    delay(ms) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    startUpdatingBenchmark = async() => {
        this.update = [];
        for (let i=0; i < 10; i++){
            this.isUpdating = true;
            const index = this.getRandomInt(0, arraySize);
            this.startTime = performance.now();
            const users = [...this.state.users];
            users[index] = {
                ...users[index],
                hobby: users[index].hobby += " UPDATED"
            };
            this.setState({ users: users });
            await this.delay(0);
        }
        let sum = 0;
        for(let i = 0; i < this.dts.length; i++ ){
            sum += this.update[i]
        }
        const avg = sum/this.update.length;
        alert(`
        Render Performance ArraySize: ${arraySize} Repeats: ${repeats}
        PureComponent: ${avg} ms
      `);
        this.setState({update: this.update});
    }

    startBenchmark = async() => {
        this.dts = [];
        for (let i=0; i < 10; i++){
            this.isCreating = true;
            this.startTime = performance.now();
            this.setState({ users: getUsers() });
            await this.delay(0);
        }
        let sum = 0;
        for(let i = 0; i < this.dts.length; i++ ){
            sum += this.dts[i]
        }

        const avg = sum/this.dts.length;
        alert(`
        Render Performance ArraySize: ${arraySize} Repeats: ${repeats}
        PureComponent: ${avg} ms
      `);
        this.setState({dts: this.dts});
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
                    <Button variant="contained" color="primary" onClick={() => this.startBenchmark()}>Run benchmark</Button>
                    <Button variant="contained" color="primary" onClick={() => this.startUpdatingBenchmark()}>Run update benchmark</Button>
                </div>
                <div>
                    <h1>Create</h1>
                    {this.state.dts.map((dt, index) => <li key={index}>{dt}</li>)}
                </div>
                <div>
                    <h1>Update</h1>
                    {this.state.update.map((dt, index) => <li key={index}>{dt}</li>)}
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
