import './App.scss';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { User } from './types/user';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { Todo } from './types/Todo';

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedUserIdError, setSelectedUserIdError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  const handleSubmut = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title.trim());
    setSelectedUserIdError(!selectedUserId);

    if (!title.trim() || !selectedUserId) {
      return;
    }

    setTodos(currentTodos => {
      const newTodo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title: title,
        completed: false,
        userId: selectedUserId,
      };

      return [...currentTodos, newTodo];
    });

    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmut}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleInputChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectedUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
