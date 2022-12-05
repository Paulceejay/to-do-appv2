import { useState } from "react";
import TodoConext from "./todo-context"

const ContextProvider = (props) => {
  const initialToken = localStorage.getItem('token')
  const initialUserId = localStorage.getItem('userId')
  const initialTheme = localStorage.getItem('theme')

  const [token, setToken] = useState(initialToken)
  const [userId, setUserId] = useState(initialUserId)
  
  const theme = initialTheme
  const userIsLoggedIn = token

  const loginHandler = (token, userId) => {
    setToken(token)
    setUserId(userId)
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
  }

  const logoutHandler = () => {
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }

   const contextValue = {
     token: token,
     userId: userId,
     isLoggedIn: userIsLoggedIn,
     theme: theme,
     login: loginHandler,
     logout: logoutHandler,
   }
 
    return (
      <TodoConext.Provider value={contextValue}>
        {props.children}
      </TodoConext.Provider>
    );
}

export default ContextProvider