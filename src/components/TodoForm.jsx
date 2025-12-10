import { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('제목은 필수입니다.');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h2>새 할일 추가</h2>
      <div className="form-group">
        <label htmlFor="title">제목 *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할일 제목을 입력하세요"
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">설명</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명을 입력하세요 (선택사항)"
          className="form-textarea"
          rows={3}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          추가
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            취소
          </button>
        )}
      </div>
    </form>
  );
}

export default TodoForm;







