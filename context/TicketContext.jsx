
import React, { createContext, useContext, useState } from 'react';
import initialTickets from '../data/tickets';

const TicketContext = createContext();

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState(initialTickets);

  return (
    <TicketContext.Provider value={{ tickets, setTickets }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  return useContext(TicketContext);
}
