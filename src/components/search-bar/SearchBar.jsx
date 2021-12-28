import React, {useState, useImperativeHandle, forwardRef } from 'react'

const path = 'https://brian95348.github.io/html5-css3/assets'

function SearchBar(props,ref) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  useImperativeHandle(ref, () => ({
    searchTerm
  }))

  return (
    <section className='search-bar'>
      <article className="search-bar__container">
          <article className="search-bar__content">
              <input className='search-bar__input' type="text" name=""
                      placeholder="Search By Event Title ..."
                      onChange = {handleChange}
                      value={searchTerm}
              />
              <img src={`${path}/search.png`}alt="search-icon"/>
          </article>
      </article>
    </section>
  )
}

export default forwardRef(SearchBar)
