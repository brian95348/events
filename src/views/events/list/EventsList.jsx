import React, { useEffect, useState } from 'react';
import Event from '../../../components/event/Event';
import Spinner from '../../../components/spinner/spinner';
import { useGlobalContext } from '../../../GlobalContext';

const path = 'https://brian95348.github.io/html5-css3/assets'

function EventsList() {
  const { events, fetchEvents } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const eventsList = () => {
    return events.list.filter(({ title }) => {
      return title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  return (
    <>
      <section className="search-bar">
        <article className="search-bar__container">
          <article className="search-bar__content">
            <input
              className="search-bar__input"
              type="text"
              name=""
              placeholder="Search By Event Title ..."
              onChange={handleChange}
              value={searchTerm}
            />
            <img src={`${path}/search.png`} alt="" width="16px" height="17px" />
          </article>
        </article>
      </section>
      <article className="body-container">
        {events.loading ? (
          <Spinner loading={events.loading} />
        ) : eventsList().length === 0 ? (
          <div>No Results Found!</div>
        ) : (
          <section className="events">
            <div className="events__header">
              <h1 className='events__h1'>EVENTS ({eventsList().length}) </h1>
            </div>
            <div className="events__list">
              {eventsList().map((event) => {
                return <Event key={event.id} {...event} />;
              })}
            </div>
          </section>
        )}
      </article>
    </>
  );
}

export default EventsList;
