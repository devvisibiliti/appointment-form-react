import './index.css'

import AppointmentForm from './components/AppointmentForm';
import  AppointmentsShow  from './components/AppointmentsShow';
import {store} from './store/store';
import { Provider } from 'react-redux';``

function App() {
  

  return (
    <Provider store={store}>
      <AppointmentForm />
      <AppointmentsShow />
    </Provider>
  )
}

export default App
