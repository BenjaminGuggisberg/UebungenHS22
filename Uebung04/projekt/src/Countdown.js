import React, {Component} from "react";

class Countdown extends Component {
    constructor(props) {
        super(props);

        this.title = props.title 
        this.state = {count: this.props.countdown, t:""};
        
        this.decrease = this.decrease.bind(this);
        this.update = this.update.bind(this);
        
            
    }

    update() {
        this.setState({count: this.state.count-1});
        
        if (this.state.count == this.props.countdown) {
            this.setState({t: "time remaining:"});
        }

        if (this.state.count <= 1) {
            this.setState({t: "download finished!"});
            this.setState({count: ""});
            clearInterval(this.interval);
            this.interval = null;
        }
        // if (this.state.count == "fertig", this.state.count >= 1) {
        //     this.state.count.t.clear()
        // }
    }

    decrease() {
        this.setState({count: this.props.countdown})  //  kann auch mit {count: this.state.count} beschrieben werden - jedoch ändern sich damit auch bei jedem Klick die Zahl durch die Funktion 'decrease'
        if (this.interval != null) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(this.update, 1000)
    }

    render(){
        return(<>
        <h4>Download.exe - estimated time for download: {this.props.countdown} Seconds</h4>
        {this.state.t}<br/><br/>
        {this.state.count}<br/>
        <button onClick={this.decrease}>Click!</button>
        </>)
    }
}

export default Countdown;



   
