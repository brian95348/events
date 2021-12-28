import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import EventsContextProvider from './GlobalContext'


ReactDom.render(
  <EventsContextProvider>
    <React.StrictMode>
        <App/>
    </React.StrictMode>
  </EventsContextProvider >,
  document.getElementById('root')
);
