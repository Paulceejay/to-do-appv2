import { useContext, useEffect, useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import useTodoHttp from "../../hooks/use-todo-http";
import TodoConext from "../../store/todo-context";

const currentDate = new Date().toJSON().slice(0, 10);

const EditTodo = (props) => {
  const navigate = useNavigate()
  const { isLoading, error, sendRequest} = useTodoHttp();

  const [isUpdating, setIsUpdating] = useState(false)
  const [enteredTitle, setEnteredTitle] = useState('')
  const [enteredDescription, setEnteredDescription] = useState('')
  const [enteredDate, setEnteredDate] = useState('')

  const todoCtx = useContext(TodoConext)
  const UID = todoCtx.userId
  const params = useParams()
  
  useEffect(() => {
    sendRequest(
      {
        url: `https://react-http-cf754-default-rtdb.firebaseio.com/todos/${UID}/${params.id}.json`,
      },
      (data) => {if(data){
        setEnteredTitle(data.title);
        setEnteredDescription(data.body)
        setEnteredDate(data.date)
      }}
    );
  }, [sendRequest, UID, params.id]);

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value)
  }

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  }

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    setIsUpdating(true)

    sendRequest({
      url: `https://react-http-cf754-default-rtdb.firebaseio.com/todos/${UID}/${params.id}.json`,
      method: "PUT",
      body: {
        title: enteredTitle,
        body: enteredDescription,
        date: enteredDate,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }, () => {navigate("/index")});
  }
  if(error){
    alert('something went wrong try reloading the page')
  }
  return (
    <div className="pt-5">
      <form action="" onSubmit={submitHandler} className="w-11/12 mx-auto py-5">
        <div className="flex flex-col my-5">
          <label htmlFor="Title" className="font-bold mb-1 text-secondaryBlack">
            Title
          </label>
          <input
            className="h-12 p-3 outline-0 rounded-xl text-primaryBlack"
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>

        <div className="flex flex-col my-5">
          <label
            htmlFor="Description"
            className="font-bold mb-1 text-secondaryBlack"
          >
            Description
          </label>
          <input
            className="h-12 p-3 outline-0 rounded-xl text-primaryBlack"
            type="text"
            value={enteredDescription}
            onChange={descriptionChangeHandler}
          />
        </div>

        <div className="flex flex-col my-5">
          <label htmlFor="date" className="font-bold mb-1 text-secondaryBlack">
            date
          </label>
          <input
            className="h-12 p-3 outline-0 rounded-xl text-primaryBlack"
            type="date"
            min={currentDate}
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>

        {isUpdating && <p className="text-center dark:text-white m-4 p-4">Updating...</p>}

        {!isUpdating && (
          <button className="bg-primaryIndigo text-primaryLightTheme p-4 rounded-lg w-full">
            Update
          </button>
        )}
      </form>
    </div>
  );
};

export default EditTodo;