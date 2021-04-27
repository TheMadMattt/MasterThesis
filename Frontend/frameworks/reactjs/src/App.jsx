import React, {Component} from "react"
import './App.css';
import NavigationBar from "./components/NavigationBar";
import Routes from "./routes/Routes";
import {Switch, Route} from "react-router-dom"
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

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
                            {Routes.map(route => (
                                route.component &&
                                <Route exact path={route.path} key={route.path} component={route.component}/>
                            ))}
                        </Switch>
                    </div>
                </div>
            </MuiThemeProvider>

        );
    }
}

export default App;
