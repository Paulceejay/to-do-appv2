import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TodoItem from "./TodoItem";
import useTodoHttp from "../../hooks/use-todo-http";
import TodoConext from "../../store/todo-context";
import LoadingSpiner from '../UI/LoadingSpinner'

const TodoList = (props) => {
  const { isLoading, error, sendRequest: fetchTodo } = useTodoHttp();
  
  const [todo, setTodo] = useState([]);

  const todoCtx = useContext(TodoConext);
  const UID = todoCtx.userId;

  const transformedTodo = (todoObj) => {
    const loadedTodo = [];

    for (const key in todoObj) {
      loadedTodo.unshift({
        key: key,
        id: key,
        title: todoObj[key].title,
        body: todoObj[key].body,
        date: todoObj[key].date,
        done: todoObj[key].done,
      });
      setTodo(loadedTodo);
    }
  };
  useEffect(() => {
    
    fetchTodo(
      {
        url: `https://react-http-cf754-default-rtdb.firebaseio.com/todos/${UID}.json`,
      },
      transformedTodo
    );
  }, [fetchTodo, UID]);

  let todoContent;
  if (todo.length === 0) {
    todoContent = (
      <div className="w-3/4 sm:w-1/2 mx-auto my-5 py-5 px-3 bg-white rounded-xl">
        <p className="text-secondaryBlack">
          You do not have any task today 'please click on the plus sign to add
          task or'
        </p>
        <Link to='add' className="w-1/2 mx-auto my-5 rounded-lg text-white bg-primaryIndigo p-5 flex justify-center items-center">Add Task</Link>
      </div>
    );
  } else {
    todoContent = todo.map((todo) => (
      <TodoItem
        key={todo.id}
        id={todo.id}
        title={todo.title}
        body={todo.body}
        date={todo.date}
        done={todo.done}
      />
    ));
  }
  if(isLoading){
    todoContent = <LoadingSpiner/>
  }
  if (error) {
    const realodHandler = (event) => {
      event.preventDefault()
      window.location.reload()
    }
    todoContent = (
      <p className="flex flex-col justify-center items-center h-screen">
        <small className='text-black dark:text-white'>check your network connectivity or Realod page</small>
        <button
          onClick={realodHandler}
          className="text-white bg-secondaryIndigo p-5 rounded-md text-center"
        >
          Reload
        </button>
      </p>
    );
  }
  return (
    <ul className="rounded p-2 animate-todosAppear bg-secondaryLightTheme dark:bg-darkTheme pb-20">
      {todoContent}
    </ul>
  );
};

export default TodoList;