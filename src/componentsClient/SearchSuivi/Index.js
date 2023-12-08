import React from 'react'

const SearchSuivi = () => {
  return (
    <div className='d-flex align-items-center flex-column mt-4'>
      <h3 className='mb-4'>Entrer un numero de suivi</h3>
      <div>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="" style={{width: '265px'}} />
      </div>
      <button type="button" className="btn btn-outline-primary mt-2">Search</button>
    </div>
  )
}

export default SearchSuivi
