import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // 할일 목록 불러오기
  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTodos({ deleted: false });
      setTodos(data);
    } catch (err) {
      setError(err.message);
      console.error('할일 목록 불러오기 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  // 초기 로드
  useEffect(() => {
    loadTodos();
  }, []);

  // 할일 추가
  const handleCreateTodo = async (todoData) => {
    try {
      setError(null);
      await createTodo(todoData);
      await loadTodos();
      setShowForm(false);
    } catch (err) {
      setError(err.message);
      alert(err.message);
    }
  };

  // 할일 수정
  const handleUpdateTodo = async (id, todoData) => {
    try {
      setError(null);
      await updateTodo(id, todoData);
      await loadTodos();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // 할일 삭제
  const handleDeleteTodo = async (id) => {
    try {
      setError(null);
      await deleteTodo(id);
      await loadTodos();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>할일 관리</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? '목록 보기' : '+ 새 할일 추가'}
        </button>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            <p>오류: {error}</p>
            <button onClick={loadTodos} className="btn btn-retry">
              다시 시도
            </button>
          </div>
        )}

        {showForm ? (
          <TodoForm
            onSubmit={handleCreateTodo}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <TodoList
            todos={todos}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
}

export default App;
