import React, { Component } from 'react';

let operationStartTime = null
let operationEndTime = null

const repeats = 1;
const arraySize = 1000;

const componentsToTest = [
    'Component',
    'Component',
    'Component',
    'Component',
    'Component'
];

export default class RandomUserGeneratorBenchmark extends Component {
    componentUnderTestIndex = -1;
    componentUnderTest = null;
    renderCount = -1;
    times = [];
    isBenchmarkRunning = false;
    isRemoving = false;

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            selectedTest: 0,
            divElementsForLoop: [],
            divElementsMap: 0,
            results: [],
            dogsz: 1,
            randomText: 'asd',
            times: []
        };
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        operationEndTime = performance.now()
        console.log('Operation took ' + (operationEndTime - operationStartTime) + ' milliseconds')
        ++this.renderCount;
        this.dt += performance.now() - this.startTime;
        if (this.renderCount % repeats === 0) {
            if (this.componentUnderTestIndex > -1) {
                this.times.push(this.dt);
            }
            ++this.componentUnderTestIndex;
            this.dt = 0;
            this.componentUnderTest = componentsToTest[this.componentUnderTestIndex];
        }
        if (this.componentUnderTest) {
            if(this.isCreating) {
                setTimeout(() => {
                    this.startTime = performance.now();
                    this.setState({ divElementsMap: arraySize });
                }, 0);
            }
            if(this.isRemoving) {
                this.setState({ divElementsMap: arraySize });
                setTimeout(() => {
                    this.startTime = performance.now();
                    this.setState({ divElementsMap: 0 });
                }, 0);
            }
        } else {
            if (this.isBenchmarkRunning) {
                this.setState({times: this.times});
                this.isBenchmarkRunning = false;
            }
        }
    }

    // 1
    addMap() {
        this.isBenchmarkRunning = true;
        this.isCreating = true;
        this.renderCount = -1;
        operationStartTime = performance.now()
        this.setState({
            divElementsMap: arraySize
        })
    }

    // 2
    editOneMap() {
        operationStartTime = performance.now()
        this.myRef.current.textContent = Math.random()
        this.setState({
            randomText: Math.random()
        })
    }

    // 3
    editAllMap() {
        operationStartTime = performance.now()
        this.setState({
            dogsz: Math.random()
        })
    }

    // 4
    removeOneMap() {
        operationStartTime = performance.now()
        let asd = this.state.divElementsMap
        this.setState({
            divElementsMap: asd - 1
        })
    }

    // 5
    removeAllMap() {
        this.isBenchmarkRunning = true;
        this.isRemoving = true;
        this.renderCount = -1;
        operationStartTime = performance.now()
        this.setState({
            divElementsMap: arraySize
        })
    }

    dogs(i) {
        return this.state.dogsz * i
    }

    render() {
        return (
            <div className="Benchmark">
                <p>B) Array map</p>
                <button onClick={() => this.addMap()}>1 Add</button>
                <button onClick={() => this.editOneMap()}>2 Edit one</button>
                <button onClick={() => this.editAllMap()}>3 Edit all</button>
                <button onClick={() => this.removeOneMap()}>4 Remove one</button>
                <button onClick={() => this.removeAllMap()}>5 Remove all</button>

                <div>
                    <ul>
                        {this.state.times.map((time, index) =>
                            <li key={index}>{time}</li>
                        )}
                    </ul>
                </div>

                <div>
                    {this.state.divElementsForLoop}
                </div>

                <div
                    id="divElementsMap">
                    {
                        [...Array(this.state.divElementsMap)].map(
                            (e, i) =>
                                <div
                                    id={i}
                                    key={i}
                                    ref={this.myRef}>
                                    <p>Div {this.dogs(i)} {Math.random()}</p>
                                </div>
                        )
                    }
                    <p>{ this.state.randomText }</p>
                </div>
            </div>
        );
    }
}
