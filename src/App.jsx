
import Containerele from "./Component/Containerele";
import LoginForm from "./Component/Login_form/LoginForm";
import SignIn_form from "./Component/SignIn_form/SignIn_form";

function App() {
  return (
  <div className="form_container">
    <Containerele>
      <LoginForm />
      <SignIn_form />
  </Containerele>
  </div>
  )
  
}

export default App;
