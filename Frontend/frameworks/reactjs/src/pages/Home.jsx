import React, {Component} from "react";
import "./Home.css"
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
import {Button} from "@material-ui/core";

const Profiler = React.Profiler

class Home extends Component {
    reloadsCount = 0;
    timer = null;
    constructor(props) {
        super(props);
        this.state = {
            cls: 0,
            fid: 0,
            fcp: 0,
            lcp: 0,
            ttfb: 0,
            pageLoaded: 0
        }
        this.reloadsCount = +localStorage.getItem("reloadsCounter")
    }

    componentDidMount() {
        getTTFB(ttfb => {
            const perfData = ttfb.entries[0];
            const pageLoaded = perfData.duration;
            let pageLoadedList = JSON.parse(localStorage.getItem("pageLoaded"));
            if (pageLoadedList === null) {
                pageLoadedList = [];
            }
            pageLoadedList.push(pageLoaded);
            localStorage.setItem("pageLoaded", JSON.stringify(pageLoadedList));
            this.setState({ttfb, pageLoaded});
        });
        getFCP(fcp => {
            let fcpList = JSON.parse(localStorage.getItem("fcp"));
            if (fcpList === null) {
                fcpList = [];
            }
            fcpList.push(fcp.value);
            localStorage.setItem("fcp", JSON.stringify(fcpList));
            this.setState({fcp});
        }, true);
        getLCP(lcp => {
            let lcpList = JSON.parse(localStorage.getItem("lcp"));
            if (lcpList === null) {
                lcpList = [];
            }
            lcpList.push(lcp.value);
            localStorage.setItem("lcp", JSON.stringify(lcpList));
            this.setState({lcp});
        }, true);
        getCLS(cls => {
            let clsList = JSON.parse(localStorage.getItem("cls"));
            if (clsList === null) {
                clsList = [];
            }
            clsList.push(cls.value);
            localStorage.setItem("cls", JSON.stringify(clsList));
            this.setState({cls});
        }, true);
        getFID(fid => this.setState({fid}), true);
        this.timer = setTimeout(() => this.reload(), 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    runBenchmark() {
        this.reloadsCount = 4;
        localStorage.removeItem("fcp");
        localStorage.removeItem("lcp");
        localStorage.removeItem("cls");
        localStorage.removeItem("pageLoaded");
        this.reload();
    }

    reload() {
        if(this.reloadsCount > 0) {
            localStorage.setItem("reloadsCounter", (--this.reloadsCount).toString());
            window.location.reload();
        }
    }

    callback(id, phase, actualTime, baseTime, startTime, commitTime) {
        console.log(id, phase, actualTime, baseTime, startTime, commitTime)
    }

    render() {
        return (
            <Profiler id="benchmark-react" onRender={this.callback}>
                <div className="Home">
                    <div>
                        <h1>Home</h1>
                        <p>First Contentful Paint (FCP): {this.state.fcp.value} ms</p>
                        <p>First Input Delay (FID): {this.state.fid.value} ms</p>
                        <p>Largest Contentful Paint (LCP): {this.state.lcp.value} ms</p>
                        <p>Time To First Byte (TTFB): {this.state.ttfb.value} ms</p>
                        <p>Page loading time: {this.state.pageLoaded } ms</p>
                    </div>
                    <Button variant="contained"
                            color="primary"
                            onClick={() => this.runBenchmark()}>Run benchmark</Button>
                </div>
            </Profiler>
        )
    }
}

export default Home;
