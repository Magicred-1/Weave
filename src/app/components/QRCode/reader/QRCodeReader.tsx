'use client';

import { useState } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';

const QRScannerReader = ({ eventContractAddress }: { eventContractAddress: `0x${string}`}) => {
    const [scanResult, setScanResult] = useState('No result');
    const [scanError, setScanError] = useState('');
    const [createAttestationButton, setCreateAttestationButton] = useState(false);

    //TODO: Use the wagmi library to create an attestation for the scanned address

    const handleError = (err: any) => {
        setScanError(err);
    };

    const handleScan = (result: any) => {
        // if the result contains "ethereum:" we remove it and keep the rest
        if (result && result.includes('0x')) {
            result = result.replace('ethereum:', '');
            setCreateAttestationButton(true);
        }

        setScanResult(result);
    };

    return (
        <div>
            <QrScanner
                onDecode={handleScan}
                onError={handleError}
            />
            <p>{scanError}</p>
            {
                createAttestationButton ? <button
                    onClick={() => {
                        console.log('create attestation for: ', scanResult, eventContractAddress);
                    }
                }
                >Create Attestation</button> : null
            }
        </div>
    );
};

export default QRScannerReader;