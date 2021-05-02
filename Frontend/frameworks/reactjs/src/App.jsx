import React, {Component} from "react"
import './App.css';
import NavigationBar from "./components/NavigationBar";
import {Switch, Route} from "react-router-dom"
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {RoutesForRouter} from "./routes/Routes";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1e2438'
        },

    },
});

class App extends Component {

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <div className="App">
                        <NavigationBar/>
                        <Switch>
                            {RoutesForRouter.map(route => (
                                <Route exact path={route.route} key={route.route} component={route.component}/>
                            ))}
                        </Switch>
                    </div>
                </div>
            </MuiThemeProvider>

        );
    }
}

export default App;
