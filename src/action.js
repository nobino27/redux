export const Handle_Chat_Submition = 'Handle_Chat_Submition'
export const Update_Size = 'Update_Size';
export const Component_Did_Mount = 'Component_Did_Mount';

export function handleChatSubmition(prev,messege) {
    return {
        type: Handle_Chat_Submition,
        prev,
        messege
    }
}

export function updateSize(chatHeight,totalHeight) {
    return {
        type: Update_Size,
        chatHeight,
        totalHeight
    }
}

export function componentDidMount(size) {
    return {
        type: Component_Did_Mount,
        size
    }
}