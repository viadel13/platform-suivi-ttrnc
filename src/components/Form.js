import "../assets/css/formik.css";
import { useFormik } from "formik";

const Form = () => {

  const initialValues = {
    name: '',
    email: '',
    channel: '',

  };

  const onSubmit =  values =>{
    console.log('form data', values);
  };
  
  const validate = values =>{
    let errors = {}

    if(!values.name){
      errors.name = 'Required'
    };

    if(!values.email){
      errors.email = 'Required'
    }

    if(!values.channel){
      errors.channel = 'Required'
    }

    return errors
  }

  const Formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  console.log('visited', Formik.touched);

  return (
    <div className="formik">

      <form onSubmit={Formik.handleSubmit}>
      <h3 className="display-6">Mon formulaire</h3><br />
        <label>Name</label>
        <br />
        <input type="text" id="name" name="name" onChange={Formik.handleChange} value={Formik.values.name} onBlur={Formik.handleBlur} />
        {Formik.touched.name && Formik.errors.name ? <div>{Formik.errors.name}</div> : null}

        <br />
        <label>Email</label>
        <br />
        <input type="email" id="email" name="email" onChange={Formik.handleChange} value={Formik.values.email} onBlur={Formik.handleBlur} />
        {Formik.touched.email && Formik.errors.email ? <div>{Formik.errors.email}</div> : null}
        <br />

        <label>Channel</label>
        <br />
        <input type="text" id="channel" name="channel" onChange={Formik.handleChange} value={Formik.values.channel}  onBlur={Formik.handleBlur} />
        {Formik.touched.channel && Formik.errors.channel ? <div>{Formik.errors.channel}</div> : null}
        <br />
        <br />

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Form;
