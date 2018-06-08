import React from 'react';
import {ChatMessage} from './ChatMessage';

export class ChatMessageContainer extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        var messages = this.props.messages;
        var list = messages.map(message => 
            <ChatMessage key={message.time.getTime().toString()} message={message} />
        );
        var myImg = require('../image/me.jpg');

        return (
            <div className="message-container" style={{height: this.props.height}}>
                <div className="intro">
                    <span className="avatar"><a href="https://fb.com/linkin.kuun"><img src={myImg}/></a></span>
                    <h1>Talk to Yourself <div>by <a href="https://fb.com/linkin.kuun">Thang Nguyen</a></div></h1>
                    <p>Hi! I am you. Talk to me and I will not answer AT ALL.</p>
                </div>
                <div className="messages">
                    {list}
                </div>
            </div>
        );
    }
}