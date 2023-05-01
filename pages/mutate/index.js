import Container from "@/components/Layout/Container";
import { useState } from "react";
import useSWR, { mutate } from "swr";

const fetcher = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["task0", "task1", "task2"]);
    }, 5000);
  });
};

const addTodo = async (text) => {
  const newTodo = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(text);
    }, 0);
  });

  mutate("/api/todo", (todo) => {
    return [newTodo, ...todo];
  });
};

const Mutate = () => {
  const [text, setText] = useState("");
  const { data, error, isLoading, isValidating } = useSWR("/api/todo", fetcher);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(text);
    setText("");
  };

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      {isValidating && <p>Validating...</p>}
      <ul>
        {data.map((todo, index) => (
          <li key={index + 1}>{todo}</li>
        ))}
      </ul>
    </Container>
  );
};

export default Mutate;
