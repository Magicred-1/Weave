import EventsDashboardComponent from '../../components/Dashboard/EventsDashboardComponent';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Events Dashboard',
};

const EventDashboardPage = () => {
    return (
        <EventsDashboardComponent />
    );
}

export default EventDashboardPage;