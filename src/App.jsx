import { Provider } from 'react-redux'
import './App.css'
import store from './state/store'
import Todo from './components/Todo'
import { ToastContainer } from 'react-toastify'
function App() {

    return (
        <Provider store={store}>
            <ToastContainer 
                autoClose={2000}
            />
            <Todo />
        </Provider>
    )
}

export default App
