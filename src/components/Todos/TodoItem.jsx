import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTodoHttp from "../../hooks/use-todo-http";
import TodoConext from "../../store/todo-context";

const TodoItem = (props) => {
  const navigate = useNavigate()
  const {sendRequest: deleteRequest} = useTodoHttp()
  // const initialActive = localStorage.getItem('active')
  const [isDone, setIsDone] = useState('undone')

  const todoCtx = useContext(TodoConext)
  const UID = todoCtx.userId

  const deleteHandler = (event) => {
    event.preventDefault()
    deleteRequest(
      {
        url: `https://react-http-cf754-default-rtdb.firebaseio.com/todos/${UID}/${props.id}.json`,
        method: "DELETE",
      }, () => {return window.location.reload()}
    );
  }
  
  const editHandler = (event) => {
    event.preventDefault()
    navigate(`/index/edit/${props.id}`, {replace: false})
  }

  const isDoneHandler = (event) => {
    event.preventDefault()
    // setIsDone((prev) => !prev):
    localStorage.setItem('done', props.done)
    const doneValue = localStorage.getItem('done')
     setIsDone(doneValue);
  }

    return (
      <li className="p-3 pr-5 sm:p-5 m-3 rounded-2xl bg-white dark:bg-slate">
        <div className="flex justify-between ">
          <h2 className="text-2xl">{props.title}</h2>
          <small className="text-sm sm:text-base xs:hidden flex justify-center items-center">
            {props.date}
          </small>
        </div>
        <p className="my-2 px-1 text-primaryBlack">{props.body}</p>
        <div className="flex justify-between mt-4">
          <div className="flex justify-between w-[54%] sm:w-1/4">
            <small className="xs:flex text-sm sm:text-base hidden justify-center items-center">
              {props.date}
            </small>
            <button onClick={isDoneHandler} className="p-2 bg-secondaryIndigo text-base text-primaryLightTheme rounded-md">
              {isDone}
            </button>
          </div>
          <div className="w-[45%] sm:w-1/4 flex justify-between pr-6">
            <button onClick={deleteHandler} className="p-2 mr-1 bg-red text-base rounded-md text-primaryLightTheme">
              Delete
            </button>
            <button onClick={editHandler} className="py-2 px-4 ml-1 bg-green text-base rounded-md text-primaryLightTheme">
              Edit
            </button>
          </div>
        </div>
      </li>
    );
}

export default TodoItem