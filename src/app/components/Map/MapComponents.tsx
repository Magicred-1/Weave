import { 
    GetUsersPositions,
    GetEvents,
    Events
} from "./Realtime";

const sampleEvents: Events[] = [
    {
        id: '1',
        name: 'ETH Global Paris',
        image: 'https://pbs.twimg.com/media/E7l1w6tXoA0K5q3?format=jpg&name=large',
        description: 'ETHGlobal is the largest Ethereum hackathon & developer ecosystem. We run hackathons, workshops, and events for the Ethereum community.',
        startDate: '2021-10-01',
        endDate: '2021-10-03',
        website: 'https://ethglobal.co/',
        maxParticipants: 100,
        venueAddress: 'Paris, France',
        coordinates: [48.8566, 2.3522],
        radius: 5000,
        radiusColor: 'red'
    },
    {
        id: '2',
        name: 'ETH Global London',
        image: 'https://pbs.twimg.com/media/E7l1w6tXoA0K5q3?format=jpg&name=large',
        description: 'ETHGlobal is the largest Ethereum hackathon & developer ecosystem. We run hackathons, workshops, and events for the Ethereum community.',
        startDate: '2021-10-01',
        endDate: '2021-10-03',
        website: 'https://ethglobal.co/',
        maxParticipants: 100,
        venueAddress: 'London, UK',
        coordinates: [51.5074, 0.1278],
        radius: 5000,
        radiusColor: 'red'
    },
    {
        id: '3',
        name: 'ETH Global Berlin',
        image: 'https://pbs.twimg.com/media/E7l1w6tXoA0K5q3?format=jpg&name=large',
        description: 'ETHGlobal is the largest Ethereum hackathon & developer ecosystem. We run hackathons, workshops, and events for the Ethereum community.',
        startDate: '2021-10-01',
        endDate: '2021-10-03',
        website: 'https://ethglobal.co/',
        maxParticipants: 100,
        venueAddress: 'Berlin, Germany',
        coordinates: [52.5200, 13.4050],
        radius: 5000,
        radiusColor: 'red'
    },
    {
        id: '4',
        name: 'ETH Global New York',
        image: 'https://pbs.twimg.com/media/E7l1w6tXoA0K5q3?format=jpg&name=large',
        description: 'ETHGlobal is the largest Ethereum hackathon & developer ecosystem. We run hackathons, workshops, and events for the Ethereum community.',
        startDate: '2021-10-01',
        endDate: '2021-10-03',
        website: 'https://ethglobal.co/',
        maxParticipants: 100,
        venueAddress: 'New York, USA',
        coordinates: [40.7128, 74.0060],
        radius: 5000,
        radiusColor: 'red'
    }   
];

export const MapComponents = () => {
    return (
    <>
        <GetUsersPositions />
        <GetEvents events={sampleEvents} />
    </>
    )
}