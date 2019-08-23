import React, { Component } from 'react'


export default class ProductDelete extends Component {
    state = {
        counter: 3,
        canReload: false
    }


    componentDidMount() {
        //console.log('On mount ', this.state.counter);
        console.log(this.props);
        //this.props.history.goBack();
    }

    shouldComponentUpdate() {
        return this.state.counter > 1;
    }

    componentDidUpdate() {
        //console.log('[componentDidUpdate] _ current counter:', this.state.counter);

    }

    incrementCounter() {
        this.setState({
            counter: this.state.counter + 1
        })
    }
    decrementCounter() {
        this.setState({
            counter: this.state.counter - 1
        })
    }

    reload() {
        this.setState({
            canReload: true
        })
    }


    render() {

        return (
            <div>
                <h1>Counter : {this.state.counter}</h1>
                <button onClick={this.incrementCounter.bind(this)} >+</button>
                <button onClick={this.decrementCounter.bind(this)} disabled={this.state.counter <= 1}>-</button>
                <br />
                <button style={{ backgroundColor: 'red' }} onClick={this.decrementCounter.bind(this)}>R</button>

            </div>
        )
    }
}
