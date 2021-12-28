import {createContext, useContext, useReducer} from 'react'
import {data} from './events'

const FETCH_EVENTS_REQUEST = "FETCH_EVENTS_REQUEST"
const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS"
const UPDATE_AVAILABLE_TICKETS_COUNT = "UPDATE_AVAILABLE_TICKETS_COUNT"
const OPEN_MODAL = "OPEN_MODAL"
const CLOSE_MODAL = "CLOSE_MODAL"

const eventsContext = createContext()
const initialState = {loading:true,list:[],error:'',isModalOpen:false}

const eventsReducer = (state,action) => {
  switch (action.type) {
        case FETCH_EVENTS_REQUEST:
            return {
                ...state,
                loading:true
            };
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                loading:false,
                list:action.payload,
            };
        // error case is impossible in this case (no network request)
        case UPDATE_AVAILABLE_TICKETS_COUNT:
          const {id,bookedTicketsCount} = action.payload
          const eventDetail = state.list.find( event => {
            return event.id === Number(id)
          })
          const updatedEvent = {...eventDetail,tickets:eventDetail.tickets - bookedTicketsCount}
          const asIsValues = [...state.list.filter(event => event.id !== Number(id))]
          return {
            ...state,
            list:[...asIsValues,updatedEvent]
          };
       case OPEN_MODAL:
              return {
                  ...state,
                  isModalOpen: true
              };
        case CLOSE_MODAL:
            return {
                ...state,
                isModalOpen: false
            };
        default:
            return state;
    }
}

const EventsContextProvider = ({children}) => {
  const [events,eventsDispatch] = useReducer(eventsReducer,initialState)

  const fetchEvents = () => {
    eventsDispatch({type:FETCH_EVENTS_REQUEST})
    // simulating an async ajax call
    setTimeout(()=>{
        eventsDispatch({type:FETCH_EVENTS_SUCCESS, payload:data})
    },500)
  }

  const updateTicketCount = (id,bookedTicketsCount) => {
    eventsDispatch({type:UPDATE_AVAILABLE_TICKETS_COUNT,payload:{id,bookedTicketsCount}})
  }

  return <eventsContext.Provider value={{fetchEvents,events,updateTicketCount,eventsDispatch}} >
            {children}
         </eventsContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(eventsContext)
}

export default EventsContextProvider
