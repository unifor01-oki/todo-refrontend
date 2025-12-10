import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, onUpdate, onDelete, loading }) {
  if (loading) {
    return (
      <div className="todo-list-loading">
        <p>할일 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>할일이 없습니다. 새로운 할일을 추가해보세요!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;







