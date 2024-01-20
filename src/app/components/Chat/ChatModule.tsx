import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment';
import { useAccount } from 'wagmi';

interface ChatMessage {
  id: number;
  recipientAddress: `0x${string}`;
  sender: `0x${string}`;
  message: string;
  created_at: string;
}

const ChatModule: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [recipientAddress, setRecipientAddress] = useState<`0x${string}` | string>()

    const { address } = useAccount();


  const profileIcon = (address: string) => `https://api.cloudnouns.com/v1/pfp?text=${address}`

  const fetchChatMessages = async () => {
    try {
      const response = await fetch('/api/chats');
      if (response.ok) {
        const messages = await response.json();
        setChatMessages(messages);
      } else {
        console.error('Failed to fetch chat messages');
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Clear recipient and messages when closing the dialog
    setRecipientAddress('');
    setChatMessages([]);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      try {
        const response = await fetch('/api/chats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipientAddress: recipientAddress,
            messageContent: message,
          }),
        });

        if (response.ok) {
          fetchChatMessages();
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setMessage('');
    }
  };

  useEffect(() => {
    if (open) {
      fetchChatMessages();
    }
  }, [open]);

  const uniqueRecipient = Array.from(new Set(chatMessages.map((msg) => msg.sender)));

  const filteredMessages = chatMessages.filter((msg) => msg.sender === address || msg.recipientAddress === msg.sender);

  return (
    <div>
      <Button className='py-1 px-5 text-white bg-[#008790] rounded-full focus:bg-[#008770]' variant="contained"
      startIcon={<ChatIcon />} fullWidth onClick={handleOpen}>
        Chats
      </Button>
  
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Chat Module</DialogTitle>
        <DialogContent>
          <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '16px' }}>
            {chatMessages.map((msg) => (
              <div key={msg.id} style={{ marginBottom: '8px', wordWrap: 'break-word' }}>
                <b>
                  <img src={profileIcon(msg.sender)} alt="avatar" width={24} />{msg.sender === address ? 'You' : msg.sender}
                </b>
                :
                {msg.recipientAddress === address ? ' (to you)' : ''} {msg.message}
                <div style={{ fontSize: '0.8em', color: '#888888' }}>{moment(msg.created_at).fromNow()}</div>
              </div>
            ))}
          </div>
  
          <TextField
            select
            label="Recipient Address"
            variant="outlined"
            fullWidth
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            style={{ marginBottom: '16px' }}
          >
            {uniqueRecipient
              .filter((recipient) => recipient !== address) // Exclude your own address
              .map((recipient) => (
                <MenuItem key={recipient} value={recipient}>
                  {<img src={profileIcon(recipient)} alt="avatar" width={24} />}{' '} {recipient}
                </MenuItem>
              ))}
          </TextField>
          <span>Reminder: You can only send messages to users who you have interacted with in the past through the interactive map.</span>
          <TextField
            label="Type your message"
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button
            variant="contained"
            className=''
            color="primary"
            endIcon={<SendIcon />}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ChatModule;