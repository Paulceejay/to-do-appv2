import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useTodoHttp from "../../hooks/use-todo-http";
import TodoConext from "../../store/todo-context";
import Input from "../UI/Input";

const Auth = () => {
  const {isLoading, error, sendRequest: authRequest} = useTodoHttp()
  const todoCtx = useContext(TodoConext)
  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const nameInputRef = useRef()

  const navigate = useNavigate()

  const switchAuthModeHandler = () => {
    setIsLogin((prev) => !prev);
    emailInputRef.current.value = ''
    passwordInputRef.current.value = ''
    return isLoading
  };

  const authSubmitHandler = (event) => {
      event.preventDefault()

      const enteredEmail = emailInputRef.current.value
      const enteredPassword = passwordInputRef.current.value
    
        let url;

        if (isLogin) {
          url ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBW0QwDgDJf4zXu7lhPzUhXhuqO46vjLnU";
        } else {
          url ="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBW0QwDgDJf4zXu7lhPzUhXhuqO46vjLnU";
        }

        authRequest({
          url,
          method: "POST",
          body: {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }, (data => {
          todoCtx.login(data.idToken, data.localId)
          navigate("/index", { replace: true });
        }))
        if(error){alert(error)}
  };

  return (
    <section className="h-screen w-11/12 mx-auto">
      <h1 className="text-center text-2xl py-5">{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={authSubmitHandler}>
        <Input 
          label="Your Email" 
          type="email" 
          id="email" 
          required 
          ref={emailInputRef}
        />

       {!isLogin && 
        <Input 
          label="Your Name"
          type="text"
          id="name"
          required
          ref={nameInputRef}
        />}

        <Input 
          label="Your Password" 
          type="password" 
          id="password"
          required 
          ref={passwordInputRef}
        />

        <div className="flex justify-between flex-col pt-3">
          {!isLoading && (
            <button className="bg-secondaryIndigo p-5 rounded-lg w-full xs:w-1/2 mx-auto text-white my-5">{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p className="text-center text-white p-5 my-5">Loading...</p>}
          <button type="button" className="t text-activeIndigo hover:text-primaryBlack w-full xs:w-7/12 mx-auto" onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Auth;