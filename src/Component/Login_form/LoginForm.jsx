import React, { useRef, useState } from "react";
import "./LoginForm.css";


function LoginForm() {
  const [error, setError] = useState(false);
  const [errmgs, setErrMgs] = useState("");
  // const [success,setSuccess] = useState()

  const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const passwordregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

  const email = useRef();
  const password = useRef();
  const confPassword = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!emailregex.test(email.current.value)){
      setError(true)
      setErrMgs("Please enter a valid email address.")
      return 
    }
    else if(!passwordregex.test(password.current.value)){
      setError(true)
      setErrMgs("Password must be at least 8 characters long, containing at least one digit, one lowercase letter, and one uppercase letter.");
      return 
    }
    else if(!confPassword.current.value){
      setError(true)
      setErrMgs("please fill confirm password")
      return
    }
    else if(password.current.value != confPassword.current.value){
      setError(true);
      setErrMgs("confirm password is not same as password");
      return
    }
    setErrMgs("")
    setError(false)

    const formdata = {
      email:email.current.value,
      password:password.current.value
    }

    try {

      const respone = await fetch('YOUR_API_URL_HERE',{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formdata)
      }) 

      if(respone.ok){

        const data = await respone.json();
        console.log("Data sent successfully")
      }
      else{
        setError(true)
        setErrMgs("Failed to submit data. Please try again. ")
      }
      
    } 
    catch (error) {
      setError(true)
      setErrMgs("An error occured. Please try again. ")
      Console.log("Error found when sending data to url",error);
      
    }

  };

  return (
    <div className="login">
      <div className="login_inner">
        <div className="login_details">
          <div className="logo">Logo</div>
          {error ? <div className="error">{errmgs}</div>: null}
        </div>

        <form className="login_form" onSubmit={handleSubmit}>
          <div className="login_email">
            <label htmlFor="login_email">Email</label>
            <input
              type="text"
              placeholder="Enter your Email"
              id="login_email"
              ref={email}
            />
          </div>
          <div className="login_pass">
            <label htmlFor="login_pass">Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              id="login_pass"
              ref={password}
            />
          </div>
          <div className="login_cnf_pass">
            <label htmlFor="login_cnf_pass">Confirm Password</label>
            <input
              type="text"
              placeholder="Enter your Confirm"
              id="login_cnf_pass"
              ref={confPassword}
            />
          </div>
          <div className="login_btn_sub">
            <button className="btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
