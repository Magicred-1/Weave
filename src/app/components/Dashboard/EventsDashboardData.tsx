type EventData = {
  eventName: string;
  eventDescription: string;
  eventStartDate: string;
  eventEndDate: string;
  eventLatitude: string;
  eventLongitude: string;
  eventRadius: number;
  eventRadiusColor: string;
  eventManagers: readonly ManagerData[];
};

type ManagerData = {
  address: `0x${string}`;
  nickname?: string;
};
