import React, {Component} from "react"
import './App.css';
import NavigationBar from "./components/NavigationBar";
import Routes from "./routes/Routes";
import {Switch, Route} from "react-router-dom"

class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="App">
                    <NavigationBar/>
                    <Switch>
                        {Routes.map(route => (
                            route.component &&
                            <Route exact path={route.path} key={route.path} component={route.component}/>
                        ))}
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
