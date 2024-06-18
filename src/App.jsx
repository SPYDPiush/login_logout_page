
import LoginForm from "./Component/Login_form/LoginForm";
import SignIn_form from "./Component/SignIn_form/SignIn_form";
import img from "/logo.jpeg";
import { useState } from "react";

function App() {
  const [useraction, setUseraction] = useState(false);
  return (
    <div className="form_container">
      <div className="container_design">
        <div className="inner_form_container">
          <div className="logo">
            <img src={img} alt="logo" />
          </div>
          <div className="user_action">
            {!useraction ? (
              <div>
                Not register? <span className="sign_link" onClick = {() => setUseraction((curr) =>  !curr)}>Sign Up</span>
              </div>
            ) : (
              <div>
                You have Account? <span className="sign_link" onClick = {() => setUseraction((curr) =>  !curr)}>Sign In</span>
              </div>
            )}
          </div>
        </div>
        <div className="action_section">
          {
            !useraction ? <LoginForm/> : <SignIn_form   />
          }
          
        </div>
      </div>
    </div>
  );
}

export default App;
