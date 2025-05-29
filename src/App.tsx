import React, { useState } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import './styles.css';

type Event = {
  id: number;
  title: string;
  date: string;
};

type EventFormData = Omit<Event, 'id'> & {
  id?: number;
};

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const addEvent = (event: EventFormData) => {
    const newEvent: Event = { ...event, id: Date.now() };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (updatedEvent: EventFormData) => {
    if (!updatedEvent.id) return;
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
      )
    );
    setEditingEvent(null);
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const startEdit = (event: Event) => {
    setEditingEvent(event);
  };

  return (
    <div className="app">
      <h1>Список мероприятий</h1>
      <EventForm
        onSubmit={editingEvent ? updateEvent : addEvent}
        initialData={editingEvent || { title: '', date: '' }}
      />
      <EventList events={events} onEdit={startEdit} onDelete={deleteEvent} />
    </div>
  );
};

export default App;