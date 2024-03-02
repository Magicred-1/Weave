'use client';

import { Card } from "../ui/card";
import EventsDashboardTable from "./EventsDashboardTable";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useContractRead } from "wagmi";
import { EventsFactoryABI } from "../abis";
import { useEffect, useState } from "react";


export const EventsDashboardComponent = () => {

//   string[] memory eventNames = new string[](allEvents.length);
//         string[] memory eventDescriptions = new string[](allEvents.length);
//         uint256[] memory eventStartDates = new uint256[](allEvents.length);
//         uint256[] memory eventEndDates = new uint256[](allEvents.length);
//         int256[] memory latitudes = new int256[](allEvents.length);
//         int256[] memory longitudes = new int256[](allEvents.length);
//         uint256[] memory eventRadiuses = new uint256[](allEvents.length);
//         string[] memory eventRadiusColors = new string[](allEvents.length);
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

  const [eventsDatas, setEventsDatas] = useState<readonly EventData[] | undefined>(undefined);
  const [eventManagers, setEventManagers] = useState<readonly ManagerData[] | undefined>(undefined);
  

  const sampleDashboardData = [
    {
      eventName: "Sample Event",
      eventContractAddress: "0x2134044D7d6Ddb782D3eee355d7912f55508591b",
      eventOwnerAddress: "0x2134044D7d6Ddb782D3eee355d7912f55508591b",
      eventOwnerNickname: "Sample Owner",
      eventManagers: [
        {
          address: "0x2134044D7d6Ddb782D3eee355d7912f55508591b",
          nickname: "Sample Manager",
        },
      ],
      contractAddress: "0x2134044D7d6Ddb782D3eee355d7912f55508591b",
      actions: "Sample Actions",
    },
  ];

  const {
    data: eventsInfos,
    error,
    isLoading: contractReadLoading,
  } = useContractRead({
    abi: EventsFactoryABI,
    functionName: 'getAllEventsDetails',
    address: "0x2134044D7d6Ddb782D3eee355d7912f55508591b"
  });

//   function getEventManagers(address _eventAddress) external view returns (address[] memory) {
//     return IEvent(_eventAddress).getManagers();
// }

  const {
    data: managers,
    error: managersError,
    isLoading: managersLoading,
  } = useContractRead({
    abi: EventsFactoryABI,
    functionName: 'getAllEventManagers',
    address: "0x2134044D7d6Ddb782D3eee355d7912f55508591b"
  });

  useEffect(() => {
    if (eventsInfos && managers) {
      // Update the data format to match the state types
      const updatedEventsDatas: readonly EventData[] = eventsInfos as any;
      const updatedEventManagers: readonly ManagerData[] = managers.map(manager => ({
        address: manager,
        nickname: "" // Provide a default value for the nickname property
      }));

      setEventsDatas(updatedEventsDatas);
      setEventManagers(updatedEventManagers);
      console.log(eventsInfos, managers);
    }
  }, [eventsInfos, managers]);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Navbar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
        <div>
          {contractReadLoading ? (
            <p>Loading...</p>
          ) : (
            <Card>
              {error ? (
                <EventsDashboardTable data={sampleDashboardData} managers={eventManagers} />
              ) : (
                <EventsDashboardTable data={eventsDatas} managers={eventManagers} />
              )}
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventsDashboardComponent;