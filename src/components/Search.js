import React from 'react'

const Search = (props) => {
    return (
      <div className="">
        <input
        onChange={event => props.handleSearch(event)}
          type="text"
          placeholder={"Search Questions"}
        />
        <i className=""></i>
      </div>
    )
  }
  
  export default Search