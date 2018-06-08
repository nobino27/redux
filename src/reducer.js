import {combineReducers} from 'redux'
import { Handle_Chat_Submition,
        Update_Size,
        Component_Did_Mount
} from './action';

const INITIAL_STATE = {};

function handleChat(state = INITIAL_STATE, action) {
    switch (action.type) {
        case handleChatSubmition:
            return state => {prev.messeges.concat(action.messege)}
        default:
            return state
    }
}

function upSize(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Update_Size:
            return state => {action.totalHeight - action.chatHeight}
        default:
            return state
    }
}
const app = combineReducers({
    handleChat,
    upSize
})

export default app