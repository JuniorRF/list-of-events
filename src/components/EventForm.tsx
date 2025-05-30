import React, { useState, useEffect } from 'react';
import '../styles.css';

type EventFormData = {
  title: string;
  date: string;
  id?: number;
};

type Props = {
  onSubmit: (event: EventFormData) => void;
  initialData: EventFormData;
};

const EventForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData.title);
  const [date, setDate] = useState(initialData.date);
  const [error, setError] = useState('');
  
  useEffect(() => {
    setTitle(initialData.title);
    setDate(initialData.date);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) {
      setError('Все поля обязательны для заполнения');
      return;
    }
    setError('');
    onSubmit({ title, date, id: initialData.id });
      setTitle('');
      setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h2>{initialData.id ? 'Редактировать мероприятие' : 'Добавить мероприятие'}</h2>
      {error  && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Название мероприятия"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">{initialData.id ? 'Обновить' : 'Добавить'}</button>
    </form>
  );
};

export default EventForm;