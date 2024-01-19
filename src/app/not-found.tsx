"use client";

import NotFoundComponent from "./components/not-found-component";
import { useEffect, useState } from "react";
import moment from "moment";

interface Chats {
    id: number;
    message: string;
    recipient: `0x${string}`;
    sender: `0x${string}`;
    created_at: string;
}

export default function Custom404() {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        fetch('./api/chats')
            .then((response) => response.json())
            .then((json) => setChats(json))

            console.log(chats);
    }
    , []);

    return (
        <>
        <NotFoundComponent />
        <p>
            {
                chats.map((chat: Chats) => (
                    <div key={chat.id}>
                        <p>{chat.sender}</p>
                        <p>{chat.message}</p>
                        <p>{moment(chat.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </div>
                ))
            }
        </p>
        </>
    )
}