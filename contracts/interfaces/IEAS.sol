// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "../lib/EASstruct.sol";

/// @title IEASGetAttestation - Interface for EAS contract's getAttestation function.
interface IEASGetAttestation {
    /// @notice Retrieves an attestation by its UID.
    /// @param uid The unique identifier of the attestation.
    /// @return attestation The Attestation struct corresponding to the uid.
    function getAttestation(bytes32 uid) external view returns (Common.Attestation memory attestation);
}
