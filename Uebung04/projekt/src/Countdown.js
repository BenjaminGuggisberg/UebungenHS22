import React, {Component} from "react";

class Countdown extends Component {
    constructor(props) {
        super(props);

        this.title = props.title 
        this.state = {count: this.props.countdown};
        
        this.decrease = this.decrease.bind(this);
        this.update = this.update.bind(this);
        
            
    }

    update() {
        this.setState({count: this.state.count-1});
        if (this.state.count <= 1) {
            this.setState({t: "fertig!"});
            this.setState({count: ""});
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    decrease() {
        this.setState({count: this.state.count - 1})  //  kann auch mit {count: this.props.countdown} beschrieben werden
        if (this.interval != null) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(this.update, 1000)
    }

    render(){
        return(<>
        <h4>Countdown: {this.props.countdown} Sekunden</h4>
        {this.state.count}<br/><br/>
        <button onClick={this.decrease}>Click!</button>
        </>)
    }
}

export default Countdown;



   
