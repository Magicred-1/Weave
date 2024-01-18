interface EventsDashboardData {
    eventName: string;
    eventContractAddress: `0x${string}`;
    eventOwnerAddress: `0x${string}`,
    eventOwnerNickname?: string,
    eventManagers: eventManagers[];
    contractAddress: string;
    actions: string;
}

interface eventManagers {
    address: `0x${string}`,
    nickname?: string,
}
  
export default EventsDashboardData;