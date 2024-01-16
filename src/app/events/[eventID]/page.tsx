interface Props {
    params: {
      eventID: number
    }
}

const EventIDPage = ({ params }: Props) => {

    return (
        <div>
            <h1>Event ID Page</h1>
            <p>Event ID: {params.eventID}</p>
        </div>
    );
}

export default EventIDPage;