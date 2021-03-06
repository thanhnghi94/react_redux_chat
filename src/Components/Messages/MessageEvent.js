import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class TransitionComponent extends React.Component {
    render() {
        let otherMessage = '';
        switch (this.props.classEvent) {
            case 'alert alert-info':
                otherMessage = 'joined';
                break;
            case 'alert alert-danger':
                otherMessage = 'left';
                break;
        }

        return (
            <div className={this.props.classEvent.concat(' MessageEvent')}>
                <p>{this.props.userName} just {otherMessage} the room!</p>
            </div>
        );
    }
}

class Example extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            userName: '',
            classEvent: ''
        };
    }

    componentDidMount() {
        this.props.socket.on('ROOM_JOIN', userName => {
            this.setState({
                show: true,
                userName,
                classEvent: 'alert alert-info'
            });

            let _this = this;
            setTimeout(() => {
                _this.setState({show: false});
            }, 2000);
        });

        this.props.socket.on('ROOM_LEFT', userName => {
            this.setState({
                show: true,
                userName,
                classEvent: 'alert alert-danger'
            });

            let _this = this;
            setTimeout(() => {
                _this.setState({show: false});
            }, 2000);
        });
    }

     render() {
         return (
             <div>
                 <ReactCSSTransitionGroup
                     transitionName="JoinLeft"
                     transitionEnterTimeout={500}
                     transitionLeaveTimeout={300}
                     >
                     {this.state.show ? <TransitionComponent userName={this.state.userName} classEvent={this.state.classEvent} /> : null}
                 </ReactCSSTransitionGroup>
             </div>
         );
     }
}

export default Example;
