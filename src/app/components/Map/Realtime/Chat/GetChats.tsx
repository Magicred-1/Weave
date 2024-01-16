import supabaseClient from "../../../../lib/supabase";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

/*
 Chats:
    - id: string
    - messages: string,
    - recipient: string,
    - sender: string,
    - created_at: timestampz
*/

export interface Chats {
    id: string;
    messages: string;
    recipient: string;
    sender: string;
    created_at: string;
}

const Chats = () => {
    const [chats, setChats] = useState<Chats[]>([]);
    const { address } = useAccount();

    async function getAllChats() {
        // get all chats where the current user is a member
        const { data: chatIds } = await supabaseClient
            .from('chats')
            .select('messages, recipient, sender, created_at')
            .eq('recipient', address)
            .eq('sender', address);

        setChats(chatIds as Chats[]);
    }

    useEffect(() => {
        getAllChats();
    }, []);

    return (
        <>
            {chats.map((chat: any) => (
                <div key={chat.id}>
                    <p>{chat.messages}</p>
                    <p>{chat.recipient}</p>
                    <p>{chat.sender}</p>
                    <p>{chat.created_at}</p>
                </div>
            ))}
        </>
    );
}