import React,{useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import {useGlobalContext} from '../../../GlobalContext'
import Modal from '../../../components/modal/Modal'
import {nameValidator,emailValidator,numOfSeatsValidator} from './validators'


const path = 'https://brian95348.github.io/html5-css3/assets'

const EventBooking = () => {
  const [formData, setFormData] = useState({names:{name:''},email:'',phone:'',seats:1})
  const [formErrors, setFormErrors] = useState({name:{}})
  const [isBtnDisabled,setIsBtnDisabled] = useState(false)
  const {names,email,phone,seats} = formData
  const {id} = useParams()
  const {events,updateTicketCount,eventsDispatch} = useGlobalContext()
  const eventDetail = events.list.find( event => {
    return event.id === Number(id)
  })

  if(!eventDetail) return <div>404 Not Found</div>

  const {title, tickets,image} = eventDetail

  const handleOnChange = (e) => {
    const {name, value, id} = e.target
    if (name==='name') {
      setFormData({...formData,names:{...formData.names,[id]:value}})
      nameValidator(value) ? setFormErrors({...formErrors,[name]:{...formErrors.name, [id]:'Only letters and spaces are allowed'}}) : delete formErrors['name'][`${id}`]
    } else {
      setFormData({...formData,[name]:value})
      if (name==='email'){
        emailValidator(value) ? setFormErrors({...formErrors,[name]:'Invalid email'}) : delete formErrors[name]
      } else {
        numOfSeatsValidator(value,tickets) ? setFormErrors({...formErrors,[name]:'Number of seats selected is more than available seats'}) : delete formErrors[name]
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsBtnDisabled(true)
    updateTicketCount(id,seats)
    eventsDispatch({type:"OPEN_MODAL"})
    console.log(`${seats} tickets booked for: ${Object.values(names).join(', ')}`);
    setFormData({names:{name:''},email:'',phone:'',seats:1})
  }

  return (
      <section >
        <article className='form' >
          <div className='form__headings' >
            <h1 className='form__h1' >{title}</h1>
            <p>Number of available seats: {tickets}</p>
            {events.isModalOpen && <Modal message={'Ticket(s) Booked'} />}
          </div>
          <div className='form__content'>
            <div className='form__image'>
              <img className='form__img' src={`${path}/${image}`} alt="form-display" />
            </div>
            <form onSubmit={handleSubmit} className='form__text'>
              <div className='form__fields' >
                <div className='form__item' >
                  <label htmlFor="name">Name:</label>
                  <input className="form__input" type="text" id="name" required name="name"
                    placeholder="Please enter your name" value={names.name} onChange={handleOnChange}
                  />
                </div>
                {formErrors['name'] ? <p className="form__error">{formErrors['name']['name'] ? formErrors['name']['name'] : ''}</p>: ''}
                <div className='form__item' >
                  <label htmlFor="email">Email:</label>
                  <input className="form__input" type="email" id="email" required value={email} onChange={handleOnChange}
                    placeholder="Please enter your email" name="email"
                  />
                </div>
                {<p className="form__error">{formErrors['email']}</p>}
                <div className='form__item' >
                  <label htmlFor="phone">Phone No:</label>
                  <input className="form__input" required type="tel" id="phone" value={phone} name="phone"
                    onChange={handleOnChange} placeholder="Please enter your phone number"
                  />
                </div>
                <div className='form__item' >
                  <label htmlFor="seats">Number of seats:</label>
                  <select className="form__select" name='seats' required onChange={handleOnChange} >
                    {Array.from(Array(6))
                      .map((e,i)=>i+1)
                      .map(num => {
                        return <option key={num} value={num}>{num}</option>
                      })}
                  </select>
                </div>
                { <p className="form__error">{formErrors['seats']}</p>}
                {Array.from(Array(Number(seats)))
                  .map((e,i)=>i+1)
                  .map(num => {
                    if(num !== 1 && seats <= tickets) {
                      return (
                      <div key={num} >
                          <div className='form__item' >
                            <label htmlFor="phone">{`Name of attendee ${num}`}</label>
                            <input className="form__input" id={num} required type="text" value={names.num} name="name"
                              onChange={handleOnChange} placeholder={`Please enter name of attendee #${num}`}
                            />
                          </div>
                          {<p className="form__error">{formErrors['name'] ? formErrors['name'][`${num}`] :''}</p>}
                      </div>
                    )
                  }
                  })}
              </div>
              <div className='form__btns' >
                <button className={`form__btn form__submit ${(isBtnDisabled || (Object.keys(formErrors).length > 1 && !Object.keys(formErrors['name']))) ? 'form__disabled' : null}`}
                 type='submit'>Submit</button>
                <Link to='/' className={`form__btn form__cancel ${isBtnDisabled ? 'form__disabled' : null}`} >Cancel</Link>
              </div>
            </form>
          </div>
        </ article>
      </section>
  )
}

export default EventBooking
