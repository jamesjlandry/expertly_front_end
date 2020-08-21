import React from 'react'

const Search = (props) => {
    return (
      <div className="searchBar">
        <input
        onChange={event => props.handleSearch(event)}
          type="text"
          placeholder={"Search Questions"}
        />
      </div>
    )
  }
  
  export default Search