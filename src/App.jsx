import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // todo listesi state
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // input state
  const [input, setInput] = useState("");

  // dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  // her değişiklikte todos'u localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // darkMode değiştikçe localStorage’a yaz
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput("");
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <div className="header">
        <h1>🌙 Todo App ☀️</h1>
        <button className="mode-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="input-section">
        <input
          type="text"
          value={input}
          placeholder="Yeni görev ekle..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>Ekle</button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            onClick={() => toggleTodo(index)}
            className={todo.completed ? "completed" : ""}
          >
            {todo.text}
            <button className="delete-btn" onClick={() => deleteTodo(index)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
