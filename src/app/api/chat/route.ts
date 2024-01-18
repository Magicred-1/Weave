import { NextRequest, NextResponse } from 'next/server';
import supabaseClient from '@/lib/supabase';
import Session from '@/lib/session'

interface Chat {
    id: number;
    messages: string;
    recipient: `0x${string}`;
    sender: `0x${string}`;
    created_at: string;
}

export const GET = async (req: NextRequest): Promise<NextResponse | Chat[]> => {
    try {
        const session = await Session.fromRequest(req);

        if (!session.address) {
            throw new Error('Invalid session');
        }

        if (!session.address || session.address.length !== 42) {
            throw new Error('Invalid sender address');
        }

        const { data, error } = await supabaseClient
            .from('chats')
            .select("*")
            .or(`sender.eq.${session.address},recipient.eq.${session.address}`);

        if (error) {
            throw error;
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            error.message,
            { status: 400 }
        );
    }
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const session = await Session.fromRequest(req);
        const { recipientAddress, messageContent } = await req.json();

        if (!session.address || !recipientAddress || !messageContent) {
            throw new Error('Fields are missing');
        }

        if (session.address.length !== 42 || recipientAddress.length !== 42) {
            throw new Error('Address is invalid');
        }

        if (session.address === recipientAddress) {
            throw new Error('Cannot send message to yourself!');
        }

        if (messageContent.length > 1000) {
            throw new Error('Message too long');
        }

        if (messageContent.length < 1) {
            throw new Error('Message too short');
        }

        const { data, error } = await supabaseClient
            .from('chats')
            .insert([
                { recipient: recipientAddress, sender: session.address, messages: messageContent },
            ]);

        if (error) {
            throw error;
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            error.message,
            { status: 400 }
        );
    }
}
