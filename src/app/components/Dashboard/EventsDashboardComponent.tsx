'use client';

import { Card } from "../ui/card";
import EventsDashboardTable from "./EventsDashboardTable";
import EventsDashboardData from "./EventsDashboardData";
import Footer from "../Footer";
import Navbar from "../Navbar";

export const EventsDashboardComponent = () => {
  const sampleLeaderboardData: EventsDashboardData[] = [
    {
      eventName: "Event 1",
      eventContractAddress: "0x9B45ca40372dAEF77532D1C3538E68715Ba36fD7",
      eventOwnerAddress: "0x8A90ca40372dAEF77532D1C3538E68715Ba36fD7",
      eventOwnerNickname: "M4GIC",
      eventManagers: [
        {
          address: "0x8A90ca40372dAEF77532D1C3538E68715Ba36fD7",
          nickname: "M4GIC",
        },
        {
          address: "0x7A90ca40372dAEF77532D1C3538E68715Ba36fD7",
          nickname: "Madhav",
        },
      ],
      contractAddress: "0x8A90ca40372dAEF77532D1C3538E68715Ba36fD7",
      actions: "Actions",
    },
    {
      eventName: "Event 2",
      eventContractAddress: "0xe8ffca40372dAEF77532D1C3538E68715Ba36fD7",
      eventOwnerAddress: "0x4ffca40372dAEF77532D1C3538E68715Ba36fD7",
      eventOwnerNickname: "Dhruv",
      eventManagers: [
        {
          address: "0x1A90ca40372dAEF77532D1C3538E68715Ba36fD7",
          nickname: "Shaunak",
        },
        {
          address: "0x7A90ca40372dAEF77532D1C3538E68715Ba36fD7",
          nickname: "Madhav",
        },
      ],
      contractAddress: "0x8A90ca40372dAEF77532D1C3538E68715Ba36fD7",
      actions: "Actions",
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Navbar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
        <div>
          <Card>
            <EventsDashboardTable data={sampleLeaderboardData} />
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventsDashboardComponent;