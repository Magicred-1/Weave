import { useState } from 'react';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '../ui/table';
import { Button } from '../ui/button';
import { useRouter } from "next/navigation";
import EventsDashboardData from './EventsDashboardData';
import { useAccount } from 'wagmi';
import { Dialog } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import QRScannerReader from '../QRCode/reader/QRCodeReader';

interface EventsDashboardTableProps {
  data: EventsDashboardData[];
}

const EventsDashboardTable: React.FC<EventsDashboardTableProps> = ({ data }) => {
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
            <TableHead>Event Contract Address</TableHead>
            <TableHead>Event Owner</TableHead>
            <TableHead>Event Managers</TableHead>
            <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.eventName}>
            <TableCell className="font-medium">{item.eventName}</TableCell>
            <TableCell className="font-medium">{item.contractAddress}</TableCell>
            <TableCell>
                <a href={`/leaderboard/${item.eventOwnerAddress}`}>
                    <img
                        alt="Avatar"
                        className="rounded-full justify-center"
                        height="32"
                        src={profileIcon(item.eventOwnerAddress)}
                        style={{
                        aspectRatio: "32/32",
                        objectFit: "cover",
                        }}
                        width="32"
                    />
                    {item.eventOwnerNickname}
                </a>
            </TableCell>
            {
                <ul>
                    {/* Add the key */}
                    {item.eventManagers.map((manager) => (
                        <a href={`/leaderboard/${manager.address}`} key={manager.address}>
                            <li key={manager.address}>
                                <img
                                    alt="Avatar"
                                    className="rounded-full"
                                    height="32"
                                    src={profileIcon(manager.address)}
                                    style={{
                                    aspectRatio: "32/32",
                                    objectFit: "cover",
                                    }}
                                    width="32"
                                />
                                {manager.nickname}
                            </li>
                        </a>
                    ))}
                </ul>
            }
            <TableCell>
                {
                    isConnected &&
                    (address === item.eventOwnerAddress || item.eventManagers.some(manager => address === manager.address)) ? (
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

