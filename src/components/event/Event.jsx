import React from 'react';
import { Link } from 'react-router-dom';

const path = 'https://brian95348.github.io/html5-css3/assets'

function Event(props) {
  const { image, title, date, tickets, id } = props;
  var color;
  if (tickets < 1) {
    color = 'grey';
  } else {
    color = '#ff9933';
  }

  return (
    <div className="event">
      <div className="event__container">
        <div className="event__image">
          <img className="event__pic" src={`${path}/${image}`} alt="event-display" />
        </div>
        <div className="event__content">
          <div className="event__text">
            <h1 className="event__title">
              {title.length < 51 ? title : title.substring(0, 49).concat('...')}
            </h1>
            <div className="event__div">
              <p className="event__p">{date}</p>
              <p className="event__p">
                Tickets Available:{' '}
                <span className={tickets ? 'event__tickets' : ''}>
                  {tickets ? tickets : 'N/A'}
                </span>
              </p>
            </div>
          </div>
          <Link
            to={`${id}`}
            style={{ color, borderColor: color }}
            className={`event__icon ${!tickets ? 'event__disabled' : ''}`}
          >
            <img
              className="event__img"
              src={tickets ? `${path}/book.png` : `${path}/sold-out.png`}
              alt="booking-icon"
              width="14px"
              height="16px"
            />
            <span className="event__note">
              {tickets ? 'Book Event' : 'SOLD OUT'}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Event);
