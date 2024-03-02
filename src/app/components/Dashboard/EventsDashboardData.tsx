export interface EventsDashboardData {
    eventName: string;
    eventDescription: string;
    eventStartDate: string;
    eventEndDate: string;
    eventLatitude: number; // Change to number
    eventLongitude: number; // Change to number
    eventRadius: number;
    eventRadiusColor: string;
    eventManagers: EventManagers[];
  }
  
  // EventsDashboardComponent
  const updatedEventsDatas: readonly EventData[] = (eventsInfos || []).map((eventInfo: any) => ({
    eventName: eventInfo.eventName,
    eventDescription: eventInfo.eventDescription,
    eventStartDate: eventInfo.eventStartDate,
    eventEndDate: eventInfo.eventEndDate,
    eventLatitude: eventInfo.eventLatitude,
    eventLongitude: eventInfo.eventLongitude,
    eventRadius: eventInfo.eventRadius,
    eventRadiusColor: eventInfo.eventRadiusColor,
    eventManagers: (eventInfo.eventManagers || []).map((manager: any) => ({
      address: manager.address,
      nickname: manager.nickname || "", // Provide a default value for the nickname property
    })),
  }));