import React, {Component} from "react";
import "./Home.css"
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

class Home extends Component {
    startLoadingTime = 0;
    endLoadingTime = 0;
    firstLoading = true;
    constructor(props) {
        super(props);
        this.state = {
            cls: null,
            fid: null,
            fcp: null,
            lcp: null,
            ttfb: null,
            domCompleteLoading: null,
            pageLoading: 0
        }
        this.startTime = performance.now();
    }

    componentDidMount() {
        getCLS(cls => this.setState({cls: cls}));
        getFID(fid => this.setState({fid: fid}));
        getFCP(fcp => this.setState({fcp: fcp}));
        getLCP(lcp => this.setState({lcp: lcp}));
        getTTFB(ttfb => {
            const perfData = ttfb.entries[0];
            const domCompleteLoading = {
                value: perfData.domComplete
            };
            this.setState({ttfb: ttfb, domCompleteLoading: domCompleteLoading})
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.endLoadingTime = performance.now();
        const loadingTime = this.endLoadingTime - this.startLoadingTime;
        if (this.firstLoading) {
            this.setState({pageLoading: loadingTime});
            this.firstLoading = false;
        }
    }

    render() {
        return (
            <div className="Home">
                <div>
                    <h1>Home</h1>
                    <p>FCP: {this.state.fcp?.value} ms</p>
                    <p>FID: {this.state.fid?.value} ms</p>
                    <p>LCP: {this.state.lcp?.value} ms</p>
                    <p>TTFB: {this.state.ttfb?.value} ms</p>
                    <p>Dom complete loading: {this.state.domCompleteLoading?.value } ms</p>
                    <p>Page loading: {this.state.pageLoading} ms</p>
                </div>
            </div>
        )
    }
}

export default Home;
