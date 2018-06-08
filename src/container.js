import react from 'react'
import {Provider} from 'react-redux'
import TalkToYourself from './TalkToYourself'
import {store} from './store'

class Demo extends react.Component {
    render() {
        return(
        <Provider store={store}>
        <TalkToYourself />
        </Provider>
        );
    }
}
export default Demo;