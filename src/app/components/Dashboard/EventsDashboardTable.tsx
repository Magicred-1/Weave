import { useState } from 'react';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '../ui/table';
import { Button } from '../ui/button';
import { useRouter } from "next/navigation";

import { useAccount } from 'wagmi';
import { Dialog } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import QRScannerReader from '../QRCode/reader/QRCodeReader';

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

const EventsDashboardTable: React.FC<{ data: any }> = ({ data }) => {
    const router = useRouter();
    const profileIcon = (address: string) => {
        return `https://api.cloudnouns.com/v1/pfp?text=${address}`;
    };
    const { address, isConnected } = useAccount();
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleDialogOpen = () => {
        setOpenDialog(true);
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
    }

  return (
    <Table>
      <TableHeader>
        <TableRow>
            <TableHead className="w-[100px]">Event Name</TableHead>
            <TableHead>Event Managers</TableHead>
            <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any) => (
          <TableRow key={item.eventName}>
            <TableCell className="font-medium">{item.eventName}</TableCell>
            <TableCell className="font-medium">
                <ul>
                    {/* Add the key */}
                    {item.eventManagers.map((manager: any) => (
                        <li key={manager.address}>
                            <a href={`/leaderboard/${manager.address}`}>
                                <img
                                    alt="Avatar"
                                    className="rounded-full justify-center"
                                    height="32"
                                    src={profileIcon(manager.address)}
                                    style={{
                                    aspectRatio: "32/32",
                                    objectFit: "cover",
                                    }}
                                    width="32"
                                />
                                {manager.address}
                            </a>
                        </li>
                    ))}
                </ul>
            </TableCell>
            <TableCell>
                <ul>
                    {/* Add the key */}
                    {item.eventManagers.map((manager: any) => (
                        <li key={manager.address}>
                            <a href={`/leaderboard/${manager.address}`}>
                                <img
                                    alt="Avatar"
                                    className="rounded-full justify-center"
                                    height="32"
                                    src={profileIcon(manager.address)}
                                    style={{
                                    aspectRatio: "32/32",
                                    objectFit: "cover",
                                    }}
                                    width="32"
                                />
                                {manager.address}
                            </a>
                        </li>
                    ))}
                </ul>
            </TableCell>
            {
                <ul>
                    {/* Add the key */}
                    {item.eventManagers.map((manager: any) => (
                        <li key={manager.address}>
                            <a href={`/leaderboard/${manager.address}`}>
                                <img
                                    alt="Avatar"
                                    className="rounded-full justify-center"
                                    height="32"
                                    src={profileIcon(manager.address)}
                                    style={{
                                    aspectRatio: "32/32",
                                    objectFit: "cover",
                                    }}
                                    width="32"
                                />
                                {manager.nickname}
                            </a>
                        </li>
                    ))}
                </ul>
            }
            <TableCell>
                {
                    isConnected &&
                    (address === item.eventOwnerAddress || item.eventManagers.some((manager: any) => manager.address === address)) ? (
                        <>
                        <Button onClick={handleDialogOpen} className="mr-2">
                            Generate Participation Attestation
                        </Button>

                        <Dialog open={openDialog} onClose={handleDialogClose}>
                        <DialogTitle>Generate Participation Attestation</DialogTitle>
                        <DialogContent>
                            <p>
                                Scan the QR code of the participant to generate a participation attestation.
                            </p>
                        </DialogContent>
                        <QRScannerReader eventContractAddress={item.contractAddress as `0x${string}`} />
                        <DialogActions>
                            <div className="flex flex-col items-center justify-center">
                                <Button onClick={handleDialogClose}>Cancel</Button>
                            </div>
                        </DialogActions>
                    </Dialog>
                        </>
                    ) : null
                }
                <Button
                    onClick={() => {
                    router.push(
                        `/events/${item.contractAddress}`,
                    );
                    }}
                >
                    Manage Event
                </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default EventsDashboardTable;

