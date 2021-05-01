import React, {Component} from "react";
import "./Home.css"
import { getFCP, getLCP, getTTFB } from 'web-vitals';
import {Button} from "@material-ui/core";
import {DisplayLoadingTimes} from "./components/DisplayLoadingTimes";
import {FormatNumber} from "../../utils/FormatNumber";

const fcpTitle = "First Contentful Paint (FCP)";
const lcpTitle = "Largest Contentful Paint (LCP)";
const ttfbTitle = "Time To First Byte (TTFB)";
const pageLoadingTitle = "Page loading time";

class Home extends Component {
    reloadsCount = 0;
    timer = null;
    constructor(props) {
        super(props);
        this.state = {
            fid: 0,
            fcp: 0,
            lcp: 0,
            ttfb: 0,
            pageLoaded: 0,
            pageLoadedList: [],
            fcpList: [],
            lcpList: [],
            clsList: [],
            ttfbList: []
        }
        this.reloadsCount = +localStorage.getItem("reloadsCounter")
    }

    componentDidMount() {
        getTTFB(ttfb => {
            const perfData = ttfb.entries[0];
            const pageLoaded = perfData.duration;
            let pageLoadedList = JSON.parse(localStorage.getItem("pageLoaded_react"));
            let ttfbList = JSON.parse(localStorage.getItem("ttfb_react"));
            if (pageLoadedList === null) {
                pageLoadedList = [];
            }
            if (ttfbList === null) {
                ttfbList = [];
            }
            pageLoadedList.push(pageLoaded);
            ttfbList.push(ttfb.value)
            localStorage.setItem("pageLoaded_react", JSON.stringify(pageLoadedList));
            localStorage.setItem("ttfb_react", JSON.stringify(ttfbList));
            this.setState({ttfb, pageLoaded, pageLoadedList, ttfbList});
        });
        getFCP(fcp => {
            let fcpList = JSON.parse(localStorage.getItem("fcp_react"));
            if (fcpList === null) {
                fcpList = [];
            }
            fcpList.push(fcp.value);
            localStorage.setItem("fcp_react", JSON.stringify(fcpList));
            this.setState({fcp, fcpList});
        }, true);
        getLCP(lcp => {
            let lcpList = JSON.parse(localStorage.getItem("lcp_react"));
            if (lcpList === null) {
                lcpList = [];
            }
            lcpList.push(lcp.value);
            localStorage.setItem("lcp_react", JSON.stringify(lcpList));
            this.setState({lcp, lcpList});
        }, true);
        this.timer = setTimeout(() => this.reload(), 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    runBenchmark() {
        this.reloadsCount = 5;
        this.clearLocalStorage();
        this.reload();
    }

    clearLocalStorage() {
        localStorage.clear();
        this.setState({ fcpList: [], lcpList: [], ttfbList: [], pageLoadedList: []});
    }

    reload() {
        if(this.reloadsCount > 0) {
            localStorage.setItem("reloadsCounter", (--this.reloadsCount).toString());
            window.location.reload();
        }
    }

    render() {
        return (
            <div className="Home flex-column">
                <div>
                    <p><b>{fcpTitle}:</b> {FormatNumber(this.state.fcp.value, 5)} ms</p>
                    <p><b>{lcpTitle}:</b> {FormatNumber(this.state.lcp.value, 5)} ms</p>
                    <p><b>{ttfbTitle}:</b> {FormatNumber(this.state.ttfb.value, 5)} ms</p>
                    <p><b>{pageLoadingTitle}:</b> {FormatNumber(this.state.pageLoaded, 5) } ms</p>
                </div>
                <div className="flex-row flex-center">
                    <DisplayLoadingTimes title={fcpTitle} times={this.state.fcpList}/>
                    <DisplayLoadingTimes title={lcpTitle} times={this.state.lcpList}/>
                    <DisplayLoadingTimes title={ttfbTitle} times={this.state.ttfbList}/>
                    <DisplayLoadingTimes title={pageLoadingTitle} times={this.state.pageLoadedList}/>
                </div>
                <div className="ButtonMargin">
                    <Button variant="contained"
                            color="primary"
                            onClick={() => this.runBenchmark()}>Run benchmark</Button>

                    <Button variant="contained"
                            className="red-btn"
                            onClick={() => this.clearLocalStorage()}>Clear local storage</Button>

                    <Button variant="contained"
                            color="primary"
                            onClick={() => this.runBenchmark()}>Save to excel</Button>
                </div>
            </div>
        )
    }
}

export default Home;
