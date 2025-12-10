import { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleToggleComplete = async () => {
    try {
      await onUpdate(todo._id, { isCompleted: !todo.isCompleted });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      alert('제목은 필수입니다.');
      return;
    }

    try {
      await onUpdate(todo._id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      setIsEditing(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await onDelete(todo._id);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <div className="todo-edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="할일 제목"
            className="todo-edit-title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="설명 (선택사항)"
            className="todo-edit-description"
            rows={3}
          />
          <div className="todo-edit-actions">
            <button onClick={handleSaveEdit} className="btn btn-save">
              저장
            </button>
            <button onClick={handleCancelEdit} className="btn btn-cancel">
              취소
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={handleToggleComplete}
          className="todo-checkbox"
        />
        <div className="todo-text">
          <h3 className="todo-title">{todo.title}</h3>
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
          <div className="todo-meta">
            <span className="todo-date">
              생성: {new Date(todo.createdAt).toLocaleString('ko-KR')}
            </span>
          </div>
        </div>
      </div>
      <div className="todo-actions">
        <button
          onClick={() => setIsEditing(true)}
          className="btn btn-edit"
          aria-label="수정"
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-delete"
          aria-label="삭제"
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default TodoItem;







