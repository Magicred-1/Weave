'use client';

import React from 'react';
import { Card } from "@/components/ui/card";
import LeaderboardTable from './LeaderboardTable';
import LeaderboardData from './LeaderboardData';
import Footer from "../Footer";
import Navbar from "../Navbar";

export const LeaderboardComponent = () => {
  const sampleLeaderboardData: LeaderboardData[] = [
    { 
      rank: 1, 
      profileImage: "/placeholder.svg", 
      nickname: "M4GIC",
      address: "0x8A90ca40372dAEF77532D1C3538E68715Ba36fD7", 
      eventsAttended: "Value 2", 
      peopleMet: "Value 3"
    },
    { 
      rank: 2, 
      profileImage: "/placeholder.svg",
      nickname: "Madhav",
      address: "0x8A90ca40372dAEF77532D1C3538E68715Ba36fD7", 
      eventsAttended: "Value 2", 
      peopleMet: "Value 3"
    },
    { 
      rank: 3, 
      profileImage: "/placeholder.svg",
      nickname: "Dhruv",
      address: "0x8A90ca40372dAEF77532D1C3538E68715Ba36fD7", 
      eventsAttended: "Value 2", 
      peopleMet: "Value 3"
    },
    { 
      rank: 4, 
      profileImage: "/placeholder.svg",
      nickname: "Rohan",
      address: "0x8A90ca40372dAEF77532D1C3538E68715Ba36fD7", 
      eventsAttended: "Value 2", 
      peopleMet: "Value 3"
    },
    { 
      rank: 5, 
      profileImage: "/placeholder.svg",
      nickname: "David",
      address: "0x8A90ca40372dAEF77532D1C3538E68715Ba36fD7", 
      eventsAttended: "Value 2", 
      peopleMet: "Value 3"
    },
    { 
      rank: 6, 
      profileImage: "/placeholder.svg", 
      nickname: "Dorbol",
      address: "0x8A90ca40372dAEF77532D1C3538E68715Ba36fD7", 
      eventsAttended: "Value 2", 
      peopleMet: "Value 3"
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Navbar />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
        <div>
          <Card>
            <LeaderboardTable data={sampleLeaderboardData} />
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};
