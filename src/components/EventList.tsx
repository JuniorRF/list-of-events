import React from 'react';

type Event = {
  id: number;
  title: string;
  date: string;
};

type Props = {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: number) => void;
};

const EventList: React.FC<Props> = ({ events, onEdit, onDelete }) => {
  return (
    <ul className="event-list">
      {events.length === 0 && <li>Нет мероприятий</li>}
      {events.map((event) => (
        <li key={event.id}>
          <p>{event.title}</p>
          <p>{event.date}</p>
          <button type="button" onClick={() => onEdit(event)}>Редактировать</button>
          <button type="button" onClick={() => onDelete(event.id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};

export default EventList;