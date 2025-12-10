// 개발 환경에서는 프록시를 통해, 프로덕션에서는 직접 백엔드 주소 사용
const API_BASE_URL = import.meta.env.DEV 
  ? '/api/todos' 
  : 'http://localhost:5000/todos';

// API 응답 처리 헬퍼 함수
const handleResponse = async (response) => {
  // 500 에러 처리
  if (response.status === 500) {
    throw new Error('서버 오류가 발생했습니다. 백엔드 서버를 확인해주세요.');
  }
  
  // 응답이 JSON이 아닐 수 있으므로 체크
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    throw new Error(text || `HTTP Error: ${response.status}`);
  }
  
  const data = await response.json();
  
  if (!response.ok || !data.success) {
    throw new Error(data.message || `요청 실패: ${response.status}`);
  }
  
  return data.data;
};

// 네트워크 오류 처리
const handleError = (error) => {
  // 네트워크 연결 오류 처리
  if (error instanceof TypeError) {
    if (error.message === 'Failed to fetch' || error.message.includes('fetch')) {
      return new Error('백엔드 서버(localhost:5000)에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
    }
  }
  
  // ECONNREFUSED 등의 다른 네트워크 오류
  if (error.message && error.message.includes('ECONNREFUSED')) {
    return new Error('백엔드 서버(localhost:5000)에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
  }
  
  return error;
};

// 할일 목록 조회
export const fetchTodos = async (options = {}) => {
  try {
    const { completed, deleted = false } = options;
    const params = new URLSearchParams();
    
    if (completed !== undefined) {
      params.append('completed', completed);
    }
    params.append('deleted', deleted);
    
    const url = `${API_BASE_URL}?${params.toString()}`;
    const response = await fetch(url);
    return await handleResponse(response);
  } catch (error) {
    throw handleError(error);
  }
};

// 특정 할일 조회
export const fetchTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    return await handleResponse(response);
  } catch (error) {
    throw handleError(error);
  }
};

// 할일 생성
export const createTodo = async (todoData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    return await handleResponse(response);
  } catch (error) {
    throw handleError(error);
  }
};

// 할일 수정
export const updateTodo = async (id, todoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    return await handleResponse(response);
  } catch (error) {
    throw handleError(error);
  }
};

// 할일 삭제
export const deleteTodo = async (id, permanent = false) => {
  try {
    const params = new URLSearchParams();
    if (permanent) {
      params.append('permanent', 'true');
    }
    
    const url = `${API_BASE_URL}/${id}${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    throw handleError(error);
  }
};

