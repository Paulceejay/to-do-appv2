import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTodoHttp from "../../hooks/use-todo-http";
import TodoConext from "../../store/todo-context";
import Input from '../UI/Input'

const Settings = () => {
  const navigate = useNavigate()
  const todoCtx = useContext(TodoConext)
  const [theme, setTheme] = useState(todoCtx.theme);
  const [isChanging, setIsChanging] = useState(false)
  const {isLoading, error, sendRequest} = useTodoHttp()
  
  const passwordInputRef = useRef()

  useEffect(() => {
    if (window.matchMedia("prefers-color-scheme: dark").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (todoCtx.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [todoCtx.theme]);

  const changeModeHandler = (event) => {
    event.preventDefault();
     const isCurrentDark = todoCtx.theme === "dark";
    setTheme(isCurrentDark ? "light" : "dark");
    localStorage.setItem("theme", isCurrentDark ? 'light' : 'dark');

    window.location.reload();
  };

  const clickPassword = (event) => {
    event.preventDefault()

    setIsChanging((prev) => !prev)
  }

  const changePasswordHandler = (event) => {
    event.preventDefault()

    const enteredNewPassword = passwordInputRef.current.value

    sendRequest({
      url: `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBW0QwDgDJf4zXu7lhPzUhXhuqO46vjLnU`,
       method: 'POST',
        body: {
          idToken: todoCtx.token,
          password: enteredNewPassword,
          returnSecureToken: true
        },
        headers: {
          'Content-Type': 'application/json'
        }
    }, (data) => {if(data){
      alert("password Changed successfully");
      window.location.reload()
    }});
  }

  if (error) {
    alert(error);
  }

  const logoutHandler = () => {
    if (window.confirm("Do you really want to logout?")) {
      todoCtx.logout();
      navigate("/auth", { replace: true });
    }
  }
  
  return (
    <div className="h-screen pt-10 w-11/12 mx-auto">
      <div className="flex justify-between flex-col">
        <button
          className="dark:text-textColor bg-activeIndigo w-4/12 sm:w-1/6 px-2 py-5 rounded-md shadow-md shadow-white dark:shadow-darkerTheme"
          onClick={changeModeHandler}
        >
          {todoCtx.theme === "dark" ? "Light Mode" : "Dark Mode "}
        </button>
      </div>

      <div className="w-full my-7">
        <button onClick={clickPassword} className="dark:text-white">
          Change Password
        </button>

        {isChanging && (
          <form action="" className="w-9/12 mx-auto animate-todosAppear">
            <Input
              label="New Password"
              type="text"
              id="new-password"
              minLength="7"
              ref={passwordInputRef}
            />
            {isLoading && <p className='text-darkerGrayTheme dark:text-white text-center'>Updating...</p>}
            {!isLoading && (
              <button
                onClick={changePasswordHandler}
                className="p-5 bg-green rounded-lg dark:text-white"
              >
                Submit Password
              </button>
            )}
          </form>
        )}
      </div>
      <button
        onClick={logoutHandler}
        className="text-darkTheme dark:text-white pt-10"
      >
        Logout
      </button>
    </div>
  );
};

export default Settings