'use client';
import { Card } from "../ui/card";
import background from '@/app/assets/bg.jpg'
import LeaderboardData from './LeaderboardData';
import LeaderboardTable from './LeaderboardTable';
export const LeaderboardComponent = () => {
  const sampleLeaderboardData: LeaderboardData[] = [
    { 
      rank: 1,
      nickname: "M4GIC",
      address: "0x8A90ca40372dAEF77532D1C3538E68715Ba36fD7", 
      eventsAttended: "78",
      peopleMet: "1022"
    },
    { 
      rank: 2,
      nickname: "Madhav",
      address: "0x7A90ca40372dAEF77532D1C3538E68715Ba36fD7",
      eventsAttended: "22",
      peopleMet: "522"
    },
    { 
      rank: 3, 
      nickname: "Dhruv",
      address: "0x5F90ca40372dAEF77532D1C3538E68715Ba36fD7", 
      eventsAttended: "18",
      peopleMet: "422"
    },
    { 
      rank: 4,
      nickname: "Rohan",
      address: "0x4A90ca40372dAEF77536D1C3538E68715Ba36fD7", 
      eventsAttended: "14",
      peopleMet: "222"
    },
    { 
      rank: 5,
      nickname: "David",
      address: "0xDe2084c14E1A3CA5d50357d0d9b9cd35a58353e8", 
      eventsAttended: "12",
      peopleMet: "122"
    },
    { 
      rank: 6,
      nickname: "Dorbol",
      address: "0x4A20ca40372dAEF77532D1C3538E68715Ba36fD7", 
      eventsAttended: "10",
      peopleMet: "102"
    }
  ];

  return (
		<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
			<div>
				<Card>
					<LeaderboardTable data={sampleLeaderboardData} />
				</Card>
			</div>
		</main>
  )
};
