import React from 'react'

const Search = (props) => {
    return (
      
        <input
          className="searchbar"
          onChange={event => props.handleSearch(event)}
          type="text"
          placeholder={"Search Questions"}
        />
      
    )
  }
  
  export default Search