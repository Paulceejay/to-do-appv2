import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTodoHttp from "../../hooks/use-todo-http";
import TodoConext from "../../store/todo-context";
import { InputUI } from "../UI/Input";

const currentDate = new Date().toJSON().slice(0, 10);

const AddTodo = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const { isLoading, error, sendRequest: addTodo } = useTodoHttp();
  const todoCtx = useContext(TodoConext);
  const UID = todoCtx.userId;

  const navigate = useNavigate();
  let formISValid = false

  if (
    enteredTitle.trim().length !== 0 &&
    enteredDescription.trim().length !== 0 &&
    enteredDate.trim().length !== 0
  ) {
    formISValid = true
  }

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (enteredTitle.trim() === "") {
      console.log("d");
    }

    let url = `https://react-http-cf754-default-rtdb.firebaseio.com/todos/${UID}.json`;
    addTodo(
      {
        url,
        method: "POST",
        body: {
          title: enteredTitle,
          body: enteredDescription,
          date: enteredDate,
          done: "Done",
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      (data) => {
        navigate("/index");
      }
    );
    if (error) {
      alert(`Error please try again`);
    }
  };
  return (
    <div className="p-5 bg-secondaryLightTheme h-screen dark:bg-darkTheme">
      <form onSubmit={submitHandler} action="" className="w-11/12 mx-auto py-5">
        <InputUI
          label="Title"
          type="text"
          id="title"
          value={enteredTitle}
          onChange={titleChangeHandler}
        />

        <InputUI
          label="Description"
          type="text"
          id="Description"
          value={enteredDescription}
          onChange={descriptionChangeHandler}
        />

        <InputUI
          label="Date"
          type="date"
          id="date"
          min={currentDate}
          value={enteredDate}
          onChange={dateChangeHandler}
        />

        <div className="mt-9 w-10/12 mx-auto xs:w-5/12 xs:mx-0.5">
          {isLoading && (
            <p className="text-center dark:text-white">Loading...</p>
          )}
          {!isLoading && formISValid && (
            <button className="bg-primaryIndigo text-primaryLightTheme p-4 rounded-lg w-full animate-pulse">
              Add Task
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTodo;