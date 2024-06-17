import React, { useRef, useState } from 'react'
import './SignIn_form.css'

function SignIn_form() {

  const [error,setError] = useState(false)
  const [errmgs,setErrmgs] = useState("")


  const fullName = useRef("")
  const email = useRef("")
  const add = useRef("")
  const dob = useRef()
  const pass = useRef("")
  const confpass = useRef("")

  const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const passregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/



  const handleSubmit = async (e) => {


    e.preventDefault()

    if(fullName.current.value.length == 0){
      setErrmgs("Enter Full Name Please!")
      setError(true)
      return
    }
    else if(!emailregex.test(email.current.value)){
      setErrmgs("Enter valid Email Address")
      setError(true)
      return
    }
    else if(!dob.current.value){
      setErrmgs("Enter DOB Please")
      setError(true)
      return
    }
    else if(!add.current.value.length > 0){
      setErrmgs("Enter Address Please!")
      setError(true)
      return
    }
    
    else if(!passregex.test(pass.current.value)){
      setErrmgs("Password must be at least 8 characters long, containing at least one digit, one lowercase letter, and one uppercase letter.")
      setError(true)
      return
    }
    else if(pass.current.value != confpass.current.value){
      setErrmgs("Confirm Password must be same as Password")
      setError(true)
      return
    }
    setErrmgs("")
    setError(false)

    const formdata = {
      email : email.current.value,
      fullName : fullName.current.value,
      DOB : dob.current.value,
      Add : add.current.value,
      pass:pass.current.value,
    }

    try {

      const response = await fetch('YOUR_API_HERE',{
        method:"POST",
        headers: {
          "Content_Type":"application/json"
        },
        body:JSON.stringify(formdata)
      })

      if(response.ok){

        const data = await response.json()
        console.log(data)
        console.log("Data sent successfully")
      }
      else{
        setError(true)
        setErrmgs("Failed to submit data. Please try again. ")
        console.log("Error found while sending data.")
      }
      
    } catch (error) {

      setError(true)
      setErrmgs("An error occured. Please try again")
      console.log("an error in try catch process watch it there")
      
    }

  }






  return (
   <div className='signin_container'>
    <div className='signin_inner'>
      <div className='signin_details'>
        <div className='logo'>Logo</div>
        {error ? <div className="error">{errmgs}</div>: null}
      </div>
      <form className='signin_form' onSubmit={handleSubmit}>
        <div>
        <label htmlFor='fullName' >Full Name</label>
        <input type='text' placeholder='Enter Full Name' id='fullName' ref={fullName}/>
        </div>
        <div className=''>
          <label htmlFor='Email' >Email</label>
          <input type='text' placeholder='Enter Your Email' id='Email' ref={email}/>
        </div>
        <div className=''>
          <label htmlFor='dob' >Date Of Birth</label>
          <input type='date' placeholder='Enter Your Date of birth' id='dob' ref={dob}/>
        </div>
        <div className=''>
          <label htmlFor='address' >Address</label>
          <input type='text' placeholder='Enter Your Address'  id='address' ref={add}/>
        </div>
        <div className=''>
          <label htmlFor='password' >Password</label>
          <input type='password' placeholder='Enter Your Password' id='password' ref={pass}/>
        </div>
        <div className=''>
          <label htmlFor='cnfpass' >Confirm Password</label>
          <input type='text' placeholder='Enter Your Confirm Password' id='confpass' ref={confpass}/>
        </div>
        <div className='signup_btn'>
          <button className='btn'>Sign Up</button>
        </div>
      </form>
    </div>
   </div>
  )
}

export default SignIn_form
