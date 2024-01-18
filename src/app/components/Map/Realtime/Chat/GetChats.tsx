import supabaseClient from "../../../../../lib/supabase";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

/*
 Chats:
    - id: string
    - messages: string,
    - recipient: `0x${string}`,
    - sender: `0x${string}`,
    - created_at: timestampz
*/

export interface Chats {
    id: string;
    messages: string;
    recipient: string;
    sender: string;
    created_at: string;
}

export const getAllChats = async (address: `0x${string}`,) => {
    // get all chats where the current user is a member
    const { data: chatIds } = await supabaseClient
        .from('chats')
        .select('id, messages, recipient, sender, created_at')
        .eq('recipient', address)
        .eq('sender', address);

    return chatIds as Chats[];
};

const Chats = () => {
    const [chats, setChats] = useState<Chats[]>([]);
    const { address } = useAccount();

    useEffect(() => {
        const fetchChats = async () => {
            const allChats = await getAllChats(address as `0x${string}`);
            setChats(allChats);
        };

        fetchChats();
    }, [address]);

    return (
        <>
            {chats.map((chat: Chats) => (
                <div key={chat.id}>
                    <p>{chat.messages}</p>
                    <p>{chat.recipient}</p>
                    <p>{chat.sender}</p>
                    <p>{chat.created_at}</p>
                </div>
            ))}
        </>
    );
};

export default Chats;
