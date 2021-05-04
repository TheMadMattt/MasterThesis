import React, {Component} from "react";
import Timer from "../../utils/Timer";
import "./LocalApi.css";
import apiService from '../../api/local-api.service';
import TaskList from "./components/TaskList";
import DisplayTimesLocalApi from "./components/DisplayTimesLocalApi";
import TaskOperations from "./components/TaskOperations";
import {Button, createMuiTheme, MuiThemeProvider, TextField} from "@material-ui/core";
import {MatSelect} from "../../components/MatSelect";
import {green} from "@material-ui/core/colors";

const greenBtn = createMuiTheme({
    palette: {
        primary: green,
    },
});

const taskNumberList = [1000, 2000, 5000, 10000];

export default class LocalApiBenchmark extends Component {
    addTaskTimer = new Timer('addTaskTimer');
    updateTaskTimer = new Timer('updateTaskTimer');
    getTaskTimer = new Timer('getTaskTimer');
    getTasksTimer = new Timer('getTasksTimer');
    deleteTaskTimer = new Timer('deleteTaskTimer');
    renderTimer = new Timer('renderTimer');

    state = {
        tasks: [],
        taskId: 1,
        localApiUrl: "https://localhost:44306/",
        taskCount: 1000,
        selectedTask: null,
        addTaskTimer: null,
        updateTaskTimer: null,
        getTaskTimer: null,
        getTasksTimer: null,
        deleteTaskTimer: null,
        renderTimer: null,
        isConnected: false,
        connectionError: {
            error: false,
            message: ""
        },
    };

    connect = () => {
        apiService.connect(this.state.localApiUrl, this.state.taskCount).then(response => {
            if (response.status === 200) {
                this.setState({isConnected: true, connectionError: { error: false }});
            }
        }).catch(error => {
            this.setState({ connectionError: { error: true, message: "Error connecting to api"}})
        });
    }

    disconnect = () => {
        this.setState({isConnected: false, connectionError: { error: false }});
    }

    addTask = (task) => {
        this.addTaskTimer.startTimer();
        apiService.createTask(task).then(() => {
            this.addTaskTimer.stopTimer();
            this.setState({addTaskTimer: this.addTaskTimer});
        });
    }

    updateTask = (task) => {
        this.updateTaskTimer.startTimer();
        apiService.updateTask(task).then(() => {
            this.updateTaskTimer.stopTimer();
            this.setState({updateTaskTimer: this.updateTaskTimer});
        });
    }

    getSelectedTask = () => {
        this.getTaskTimer.startTimer();
        apiService.getTask(this.state.taskId).then(task => {
            this.getTaskTimer.stopTimer();
            this.setState({selectedTask: task.data, getTaskTimer: this.getTaskTimer});
        });
    }

    deleteTask = () => {
        this.deleteTaskTimer.startTimer();
        apiService.deleteTask(this.state.taskId).then(() => {
            this.deleteTaskTimer.stopTimer();
            this.setState({deleteTaskTimer: this.deleteTaskTimer});
        });
    }

    getTasks = () => {
        this.setState({tasks: []}, () => {
            this.getTasksTimer.startTimer();
            apiService.getTasks().then(response => {
                this.getTasksTimer.stopTimer();
                this.renderTimer.startTimer();
                this.setState({ tasks: response.data, getTasksTimer: this.getTasksTimer}, () => {
                    this.renderTimer.stopTimer();
                    this.setState({renderTimer: this.renderTimer});
                });
            })
        })
    }

    clear = () => {
        window.location.reload();
    }

    handleInputValue = (e) => {
        const control = e.target;
        const { name, value } = control;
        this.setState({
            [name]: value
        });
    }

    render() {
        const selectedTask = this.state.selectedTask;
        const isConnected = this.state.isConnected;
        const connectionError = this.state.connectionError;
        return (
            <div className="json-placeholder-container">
                <div className="actions">
                    <div className="flex-row flex-center">
                        <TextField
                            name="localApiUrl"
                            label="Enter local server api url"
                            variant="outlined"
                            value={this.state.localApiUrl}
                            onChange={this.handleInputValue}
                            style={{marginBottom: "15px"}}
                            error={connectionError.error}
                            helperText={connectionError.error ? connectionError.message : ""}
                        />
                        <MatSelect name="taskCount"
                                   title="Choose task count"
                                   initialValue={this.state.taskCount}
                                   handleChange={this.handleInputValue}
                                   selectDropdownList={taskNumberList}/>
                        <MuiThemeProvider theme={greenBtn}>
                            <Button variant="contained" color="primary"
                                    onClick={this.connect}>Connect</Button>
                        </MuiThemeProvider>
                        <Button variant="contained" color="secondary"
                                onClick={this.disconnect}>Disconnect</Button>
                        <Button variant="contained" color="primary"
                                onClick={() => this.clear()}>Clear</Button>
                    </div>
                    {
                        isConnected && <TaskOperations taskId={this.state.taskId}
                                                       taskCount={this.state.taskCount}
                                                       addTask={this.addTask}
                                                       updateTask={this.updateTask}
                                                       getSelectedTask={this.getSelectedTask}
                                                       deleteTask={this.deleteTask}
                                                       getTasks={this.getTasks}/>
                    }
                </div>
                <div className="result-container">
                    <DisplayTimesLocalApi {...this.state}/>
                </div>
                <div>
                    {selectedTask &&
                    <p><b>Selected task:</b> {selectedTask.id} | {selectedTask.title} | {selectedTask.body}</p>}
                </div>
                <TaskList tasks={this.state.tasks}/>
            </div>
        );
    }
}
