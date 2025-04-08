import React, { useState, useEffect } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [history, setHistory] = useState([]); // 操作履歴

  // ローカルストレージから復元
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      const savedHistory = localStorage.getItem('history');
      if (savedTasks) setTasks(JSON.parse(savedTasks));
      if (savedHistory) setHistory(JSON.parse(savedHistory));
    } catch (e) {
      console.error('ローカルストレージの読み込みエラー', e);
      localStorage.clear(); // データ壊れたら全消し
    }
  }, []);

  // 保存
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('history', JSON.stringify(history));
  }, [tasks, history]);

  const handleAdd = () => {
    try {
      if (!task.trim()) return; // 空文字チェック
      setTasks([...tasks, task]); // 新しいタスクを追加
      setHistory([`「${task}」を追加しました`, ...history]); // 追加
      setTask(''); // 入力欄をクリア
    } catch (e) {
      console.error('ハンドルアドエラー', e);
      localStorage.removeItem('tasks');
      localStorage.removeItem('history');
    }
  };

  const handleDelete = (index) => {
    try {
      const deleted = tasks[index];
      const newTasks = tasks.filter((_, i) => i !== index)
      setTasks(newTasks);
      setHistory([`「${deleted}」を削除しました`, ...history]); // 削除
    } catch (e) {
      console.error('ハンドルデリートエラー', e);
      localStorage.removeItem('tasks');
      localStorage.removeItem('history');
    }
  };

  return (
    <div>
      <h1>ToDo App</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="タスクを入力"
      />
      <button onClick={handleAdd}>追加</button>

      <h2>タスクリスト</h2>
      <ul>
        {tasks.map((t, i) => (
          <li key={i}>
            {t}
            <button onClick={() => handleDelete(i)}>削除</button>
            </li>
        ))}
      </ul>

      <h2>操作履歴</h2>
      <ul>
        {history.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
