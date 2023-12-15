import { memo, useState } from "react"
import { useFormik } from "formik";

const SearchSuivi = ({ search, loading }) => {

  const formik = useFormik({

    initialValues: {
      searchsuivi: ''
    },

    onSubmit: (values) => {
      search(values.searchsuivi);
      formik.handleReset();
    },

    validate: (values) => {
      let errors = {};
      if (!values.searchsuivi) {
        errors.searchsuivi = "Ce champ est obligatoire";
      }
      return errors
    }

  })


  return (
    <div className='d-flex align-items-center flex-column mt-4'>
      <h3 className='mb-4'>Entrer un numero de suivi</h3>
      <div>
        <input
          type="text"
          className="form-control"
          name="searchsuivi"
          id="searchsuivi"
          value={formik.values.searchsuivi}
          onChange={formik.handleChange}
          style={{ width: '265px', border: formik.touched.searchsuivi && formik.errors.searchsuivi ? "1px solid red" : "" }}
        />
        {formik.touched.searchsuivi && formik.errors.searchsuivi ? (
          <div className="text-danger mb-4"><p style={{ fontSize: "15px" }}>{formik.errors.searchsuivi}</p></div>
        ) : null}
      </div>
      <button className="btn btn-outline-primary mt-2" onClick={formik.submitForm} >
        {!loading ? "Search" : (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </button>
    </div>
  )
}

export default memo(SearchSuivi);
