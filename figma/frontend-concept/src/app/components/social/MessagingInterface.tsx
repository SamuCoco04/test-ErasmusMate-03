import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Input } from '../design-system/Input';
import { Send, Paperclip, MoreVertical, Search, Users } from 'lucide-react';
import { useState } from 'react';

export function MessagingInterface() {
  const [selectedChat, setSelectedChat] = useState<number>(1);
  const [message, setMessage] = useState('');

  const chats = [
    {
      id: 1,
      name: 'Anna Kowalski',
      university: 'University of Warsaw',
      lastMessage: 'That sounds great! When are you arriving?',
      timestamp: '2h ago',
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: 'Johan Andersson',
      university: 'Stockholm University',
      lastMessage: 'I found a great place for tapas near the university',
      timestamp: '1d ago',
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      university: 'University of Lyon',
      lastMessage: 'Thanks for the accommodation tips!',
      timestamp: '3d ago',
      unread: 0,
      online: true,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'them',
      content: 'Hey! How are you settling in Barcelona?',
      timestamp: '10:23 AM',
    },
    {
      id: 2,
      sender: 'me',
      content: 'Hi Anna! It\'s been amazing so far. Still looking for permanent accommodation though.',
      timestamp: '10:25 AM',
    },
    {
      id: 3,
      sender: 'them',
      content: 'I had the same issue when I arrived. Have you checked the university housing board?',
      timestamp: '10:27 AM',
    },
    {
      id: 4,
      sender: 'me',
      content: 'Yes, but most places are already taken. Do you have any recommendations?',
      timestamp: '10:30 AM',
    },
    {
      id: 5,
      sender: 'them',
      content: 'Actually yes! There\'s a Facebook group specifically for Erasmus students. I can send you the link.',
      timestamp: '10:32 AM',
    },
    {
      id: 6,
      sender: 'me',
      content: 'That would be super helpful, thank you!',
      timestamp: '10:33 AM',
    },
    {
      id: 7,
      sender: 'them',
      content: 'That sounds great! When are you arriving?',
      timestamp: '2:15 PM',
    },
  ];

  const currentChat = chats.find(c => c.id === selectedChat);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Card padding="none" className="h-[calc(100vh-200px)] flex flex-col md:flex-row overflow-hidden">
        {/* Chat List Sidebar */}
        <div className="w-full md:w-80 border-r border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg text-slate-900 mb-3">Messages</h2>
            <Input
              placeholder="Search conversations..."
              icon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors border-b border-slate-100 ${
                  selectedChat === chat.id ? 'bg-[--social-bg] border-l-4 border-l-[--social-primary]' : ''
                }`}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[--social-primary] to-[--social-secondary] rounded-full flex items-center justify-center text-white flex-shrink-0">
                    {chat.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm text-slate-900 truncate">{chat.name}</h3>
                    <span className="text-xs text-slate-500 flex-shrink-0">{chat.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-1 truncate">{chat.university}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="ml-2 w-5 h-5 bg-[--social-primary] text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col min-w-0">
          {currentChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-[--social-primary] to-[--social-secondary] rounded-full flex items-center justify-center text-white">
                      {currentChat.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {currentChat.online && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-slate-900">{currentChat.name}</h3>
                    <p className="text-xs text-slate-600">{currentChat.university}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                  <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
                {/* Date Divider */}
                <div className="flex items-center justify-center">
                  <span className="text-xs text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                    Today
                  </span>
                </div>

                {/* Messages */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-md ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          msg.sender === 'me'
                            ? 'bg-[--social-primary] text-white'
                            : 'bg-white text-slate-900 border border-slate-200'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      <p className={`text-xs text-slate-500 mt-1 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-slate-200 bg-white">
                <div className="flex items-end gap-3">
                  <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <div className="flex-1">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg resize-none focus:border-[--social-primary] focus:ring-2 focus:ring-orange-100 transition-colors"
                      rows={2}
                    />
                  </div>
                  <Button variant="social" className="h-10">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Messages are only available with accepted connections. Be respectful and follow community guidelines.
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
