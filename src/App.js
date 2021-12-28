import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Nav from './components/nav/Nav'
import EventsList from './views/events/list/EventsList'
import EventBooking from './views/events/bookings/EventBooking'
import './sass/main.scss'


function App() {
  return (
    <Router>
        <div className='App' >
          <Nav />
        <Switch>
          <Route path="/" exact ><EventsList/></Route>
          <Route path="/:id" exact children={<EventBooking/>} ></Route>
        </Switch>
        </div>
    </Router>
  )
}

export default App
