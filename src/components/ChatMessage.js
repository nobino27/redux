import React from 'react';

export class ChatMessage extends React.Component {
    constructor(props){
        super(props);
        
    }

    formatTime(time){
        return `${time.getHours()}:${time.getMinutes()} - ${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`;
    }

    render(){
        return (
            <div className="message">
                <span className="message-text">{this.props.message.content}</span>
                <div className="message-time">{this.formatTime(this.props.message.time)}</div>
            </div>
        );
    }
}