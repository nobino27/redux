import React from 'react';

export class ChatForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {value: ''}

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        var message = {
            content: this.state.value,
            time: new Date()
        };
        this.setState({value: ''});
        this.props.handleSubmition(message);
    }

    onChange(e){
        this.setState({value: e.target.value});
    }

    render(){
        return (
            <div className="chat-form" ref={element => {this.divRef = element}}>
                <form onSubmit={this.onSubmit}>
                    <fieldset className="input-wrapper">
                        <input type="text" value={this.state.value} onChange={this.onChange} autoFocus/>
                        <button type="submit" className="send-button fa fa-send" />
                    </fieldset>
                </form>
            </div>
        );
    }
}