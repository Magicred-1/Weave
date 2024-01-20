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
    return <NotFoundComponent />
}