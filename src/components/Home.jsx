import axios from "axios";
import {useState, useEffect} from "react";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [list, setList] = useState([]);
  const [isTextAdded, setIsTextAdded] = useState(false);

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
        const response = await axios.post(
          "/api/todos",
          {text: inputText},
          {headers: {}}
        );
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

  return (
    <div>
      <h1>MirageJs To-Do App</h1>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={handleToDo}>Add</button>
      </div>
      <div>
        <h2>All To-Do:</h2>
        <ul>
          {list.map((item) => (
            <li key={item.id}>
              {item.text}{" "}
              <button onClick={() => handleDelete(item.id)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export {Home};
