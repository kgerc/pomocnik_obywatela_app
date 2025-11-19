import React from 'react';
import ChatInterface from '../../components/chat/ChatInterface';

const ChatTab = ({ onToggleFavorite, isFavorite }) => {
  return (
    <ChatInterface 
      onToggleFavorite={onToggleFavorite}
      isFavorite={isFavorite}
    />
  );
};

export default ChatTab;