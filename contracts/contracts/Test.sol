// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// ... [other imports] ...

contract Event {
    // ... [existing variables] ...

    // New variables for point distribution
    uint256 public constant MAX_POINTS = 100;  // Maximum points for the first attendee
    uint256 public constant POINTS_SCALE = 10; // Points decrease by this scale for each subsequent attendee
    uint256 public attendeeCount = 0;          // Counter for attendees to determine their order

    // ... [existing functions] ...

    /**
     * @notice Marks attendance of a hacker for the event and distributes points.
     * @param hackerAddress The address of the hacker whose attendance is being recorded.
     * @param attestationId Unique identifier for the attendance proof.
     */
    function markAttendance(address hackerAddress, uint256 attestationId) external onlyManagers {
        require(addressRegistered[hackerAddress], "Hacker not registered");
        require(!hasAttended[hackerAddress], "Attendance already marked");
        require(attendanceAttestation[hackerAddress] == 0, "Attestation ID already assigned");

        // Increment the attendee count as a new attendee is being marked
        attendeeCount++;

        // Calculate points based on attendee order
        uint256 pointsForAttendee = calculatePointsForAttendee(attendeeCount);

        hasAttended[hackerAddress] = true;
        attendanceAttestation[hackerAddress] = attestationId;

        // Add the hacker to the event's participation list and update their points in the Users contract
        users.addEventParticipated(hackerAddress, address(this));
        users.updatePoints(hackerAddress, pointsForAttendee);

        hackersAttended.push(hackerAddress);
    }

    /**
     * @notice Calculates points for the attendee based on their order of arrival.
     * @param order The order number of the attendee.
     * @return Points for the attendee.
     */
    function calculatePointsForAttendee(uint256 order) internal view returns (uint256) {
        if (order == 1) {
            return MAX_POINTS;
        }
        uint256 points = MAX_POINTS - ((order - 1) * POINTS_SCALE);
        return points > 0 ? points : 0;  // Ensure that points do not go negative
    }

    // ... [rest of your code] ...
}
