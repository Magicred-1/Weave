"use client";
import QRCode from "react-qr-code";
import { useAccount } from "wagmi";

const ProfileAddressQRCode = ({ walletAddress }: { walletAddress: `0x${string}` }) => {
    const { address } = useAccount();

    if (walletAddress !== address) {
        return null;
    }

    return (
        <QRCode value={address} />
    );
};

export default ProfileAddressQRCode;