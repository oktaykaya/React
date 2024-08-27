import React, { useEffect, useState } from "react";

const initialFormValue = { text: "" };

function HomePage() {
  const [input, setInput] = useState(initialFormValue);
  const [items, setItems] = useState([]); // items state'i
  const [filter, setFilter] = useState("ALL");

  //  useEffect(() => {
  //    setInput(initialFormValue);
  //  }, [setInput]);

  const onSubmit = (event) => {
    event.preventDefault();
    setItems([...items, { ...input, completed: false }]);
    setInput(initialFormValue); // yazılan kısmı tekrar boşaltmak için
  };

  const onChangeInput = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value }); // değeri oraya verebilmek için
  };

  const toggleComplete = (index) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setItems(newItems);
  };

  //   const filteredItems = items.filter((item) => {
  //     if (filter === "ALL") return true;
  //     if (filter === "Active") return !item.completed;
  //     if (filter === "Completed") return item.completed;
  //     return true;
  //   });
  const clearCompleted = () => {
    setItems(items.filter((item) => !item.completed)); // Tamamlanmış görevleri temizle
  };

  const destroy = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const hasCompletedItems = items.some((item) => item.completed);

  console.log(filter);
  const activeItemsCount = items.filter((item) => !item.completed).length;
  console.log(items);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={onSubmit}>
          <input
            name="text"
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={input.text}
            onChange={onChangeInput}
          />
        </form>
      </header>

      <div className="main">
        <input className="toggle-all" type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
      </div>

      <ul className="todo-list">
        {/* {filteredItems.map((item, index) => (
          <li key={index} className={item.completed ? "completed" : ""}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleComplete(index)}
              />
              <label>{item.text}</label>
              <button className="destroy"></button>
            </div>
          </li>
        ))} */}
        {items
          .filter((item) => {
            if (filter === "ALL") return true;

            return filter === "Active" ? !item.completed : item.completed;
          })
          .map((item, index) => (
            <li key={index} className={item.completed ? "completed" : ""}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(index)}
                />
                <label>{item.text}</label>
                <button
                  onClick={() => destroy(index)}
                  className="destroy"
                ></button>
              </div>
            </li>
          ))}
      </ul>

      <footer className="footer">
        <span className="todo-count">
          <strong>
            {filter === "Completed"
              ? items.length - activeItemsCount
              : activeItemsCount}
          </strong>
          items left
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={filter === "ALL" ? "selected" : ""}
              onClick={() => setFilter("ALL")}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="#/"
              className={filter === "Active" ? "selected" : ""}
              onClick={() => setFilter("Active")}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#/"
              className={filter === "Completed" ? "selected" : ""}
              onClick={() => setFilter("Completed")}
            >
              Completed
            </a>
          </li>
        </ul>
        {hasCompletedItems && (
          <button onClick={clearCompleted} className="clear-completed">
            Clear completed
          </button>
        )}
      </footer>

      <footer className="info">
        <p>Oktay Kaya</p>
      </footer>
    </div>
  );
}

export default HomePage;
