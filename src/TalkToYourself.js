import React from 'react';
import {ChatMessageContainer} from './components/ChatMessageContainer';
import {ChatForm} from './components/ChatForm';
import { connect } from 'react-redux'
import {store} from './store'
const store = createStore(app);
import { handleChatSubmition,
    updateSize,
    Component_Did_Mount
} from './action';
export class TalkToYourself extends React.Component {
    render(){
        return (
            <div className="container">
                <ChatMessageContainer height={this.props.containerHeight} messages={this.props.mess} />
                <ChatForm handleSubmition={this.handleChatSubmition} ref={com => {this.chatForm = com;}} />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
return {
    containerHeight : () => store.dispatch(updateSize(this.chatForm.divRef.clientHeight,window.innerHeight))
}
}
function mapStateToProps(state) {
    return {
        mess : state.messege
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TalkToYourself);