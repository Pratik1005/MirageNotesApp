import {useState, useEffect} from "react";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [list, setList] = useState([]);

  //   useEffect(() => {

  //   }, [])

  const handleToDo = () => {
    setList((prev) => [...prev, inputText]);
    setInputText("");
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
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export {Home};
