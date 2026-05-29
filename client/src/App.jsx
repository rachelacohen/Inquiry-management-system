import { useState, useEffect } from 'react'
import { getTickets } from './features/tickets/services/ticketApi';
import { TicketList } from './features/tickets/components/TicketList';
import { Layout } from './features/layouts/Layout';

function App() {
        const [tickets, setTickets] = useState([])

  useEffect(() => {
    getTickets().then(setTickets);
  }, []);

  return (
   <>
   <Layout>
    <TicketList tickets={tickets} />
   </Layout>
   </>
  )
}

export default App
