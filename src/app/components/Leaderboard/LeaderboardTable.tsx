import React from 'react';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import LeaderboardData from './LeaderboardData';

interface LeaderboardTableProps {
  data: LeaderboardData[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data }) => {
    const router = useRouter();
    const profileIcon = (address: string) => {
        return `https://api.cloudnouns.com/v1/pfp?text=${address}`;
    };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Rank</TableHead>
          <TableHead>Profile Image</TableHead>
          <TableHead>Address or ENS Domain</TableHead>
          <TableHead>Nickname</TableHead>
          <TableHead>Events Attended</TableHead>
          <TableHead>People Met</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.rank}>
            <TableCell className="font-medium">{item.rank}</TableCell>
            <TableCell>
              <img
                alt="Avatar"
                className="rounded-full"
                height="32"
                src={profileIcon(item.address)}
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
            </TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>{item.nickname}</TableCell>
            <TableCell>{item.eventsAttended}</TableCell>
            <TableCell>{item.peopleMet}</TableCell>
            <TableCell>
                <Button className="mr-2">
                    Claim Rewards
                </Button>
                <Button
                    onClick={() => {
                    router.push(
                        `/leaderboard/${item.address}`
                    );
                    }}
                >
                    View Profile
                </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default LeaderboardTable;

