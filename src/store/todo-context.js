import { createContext } from "react";

const TodoConext = createContext({
  token: "",
  userId: "",
  isLoggedIn: false,
  login: (token, id) => {},
  logout: () => {},
  theme: "",
});

export default TodoConext