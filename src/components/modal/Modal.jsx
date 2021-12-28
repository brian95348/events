import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useGlobalContext} from '../../GlobalContext'

const Modal = ({message}) => {
  const {eventsDispatch} = useGlobalContext()
  const history = useHistory()

  useEffect(()=>{
    setTimeout(()=>{
      eventsDispatch({type:"CLOSE_MODAL"})
      history.push('/')
    },2000)
  },[])

  return (
    <div className='modal'>
      <p>{message}</p>
    </div>
  )
}

export default Modal
