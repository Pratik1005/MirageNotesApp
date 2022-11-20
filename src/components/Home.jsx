import axios from "axios";
import {useState, useEffect} from "react";

const Home = () => {
  const [inputText, setInputText] = useState({id: "", text: ""});
  const [list, setList] = useState([]);
  const [isTextAdded, setIsTextAdded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/todos");
        console.log(response);
        setList(response.data.todos);
      } catch (error) {
        console.error("get api", error);
      }
    })();
  }, [isTextAdded]);

  const handleToDo = () => {
    (async () => {
      try {
        const response = await axios.post("/api/todos", {text: inputText});
        console.log(response);
      } catch (error) {
        console.error("post todo", error);
      }
    })();
    setInputText("");
    setIsTextAdded((prev) => !prev);
  };

  const handleDelete = (id) => {
    (async () => {
      try {
        const response = await axios.delete(`/api/todos/${id}`);
        setIsTextAdded((prev) => !prev);
      } catch (error) {
        console.error("delete todo", error);
      }
    })();
  };

  const handleEdit = (todo) => {
    setInputText({id: todo.id, text: todo.text});
    setIsEditing(true);
  };

  const handleEditRequest = () => {
    (async () => {
      try {
        const response = await axios.put(`/api/todos/${inputText.id}`, {
          text: inputText.text,
        });
      } catch (error) {
        console.error("Edit text", error);
      }
    })();
    setIsEditing(false);
    setInputText({id: "", text: ""});
    setIsTextAdded((prev) => !prev);
  };

  return (
    <div>
      <h1>MirageJs To-Do App</h1>
      <div>
        <input
          type="text"
          value={inputText.text}
          onChange={(e) =>
            setInputText((prev) => ({...prev, text: e.target.value}))
          }
        />
        {isEditing ? (
          <button onClick={handleEditRequest}>Save</button>
        ) : (
          <button onClick={handleToDo}>Add</button>
        )}
      </div>
      <div>
        <h2>All To-Do:</h2>
        <ul>
          {list.map((item) => (
            <li key={item.id}>
              {item.text} <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export {Home};
