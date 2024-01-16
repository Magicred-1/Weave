import React from 'react';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import LeaderboardData from './LeaderboardData';
import { useEnsResolver } from 'wagmi';
import { normalize } from 'viem/ens';

interface LeaderboardTableProps {
  data: LeaderboardData[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data }) => {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Rank</TableHead>
          <TableHead>Profile Image</TableHead>
          <TableHead>Nickname</TableHead>
          <TableHead>Address or ENS Domain</TableHead>
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
                src={item.profileImage}
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
                <>
                    <Button className="mr-2"
                        onClick={() => {
                        router.push(
                            `/leaderboard/${item.address}`
                        );
                        }}
                    >
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
                </>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default LeaderboardTable;

