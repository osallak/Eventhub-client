import useApi from '@common/hooks/useApi';
import { useAuth } from '@modules/auth/hooks/useAuth';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { EventPage } from '../../modules/events/components/single/EventPage';
import { Event } from '../../modules/events/types/event';

interface EventPageProps {
  initialEvent: Event;
}

const SingleEventPage = ({ initialEvent }: EventPageProps) => {
  const auth = useAuth();
  const router = useRouter();
  const api = useApi();

  const [event, setEvent] = useState<Event>(initialEvent);
  const isOwner = auth.user?.id === event?.creator?.id;

  const handleJoin = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No auth token found');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '')}/api/events/${event.id}/join`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (response.ok && data.status === 'success') {
        setEvent(data.data.event);
      }
    } catch (error) {
      console.error('Error joining event:', error);
    }
  };

  const refreshEventData = async () => {
    try {
      const response = await api(`/events/${event.id}`);
      if (response.success && response.data) {
        return response.data as Event;
      }
    } catch (error) {
      console.error('Failed to refresh event data:', error);
    }
    return null;
  };

  const handleLeave = async () => {
    try {
      const response = await api(`/events/${event.id}/leave`, {
        method: 'POST',
        displaySuccess: true,
      });

      if (response.success) {
        const updatedEvent = await refreshEventData();
        if (updatedEvent) {
          setEvent(updatedEvent);
        }
      }
    } catch (error) {
      console.error('Failed to leave event:', error);
    }
  };

  const handleEdit = () => {
    router.push(`/events/${event.id}/edit`);
  };

  return (
    <EventPage
      event={event}
      isOwner={isOwner}
      onJoin={handleJoin}
      onLeave={handleLeave}
      onEdit={handleEdit}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  if (!id) {
    return { notFound: true };
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '')}/api/events/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      return { notFound: true };
    }

    const data = await response.json();
    if (!data || !data.data) {
      return { notFound: true };
    }

    return {
      props: {
        initialEvent: data.data,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default SingleEventPage;
