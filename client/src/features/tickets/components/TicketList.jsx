import { useState, useEffect } from 'react';
import { getTickets, createTicket } from '../services/ticketApi';
import { getUsers } from '../services/userApi';
import { TicketCard } from './TicketCard';
import { Button } from '../../../components/ui/button/Button';
import { Input } from '../../../components/ui/input/Input';
import { Loader } from '../../../components/ui/loader/Loader';

export const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [isOpenCreateTicket, setIsOpenCreateTicket] = useState(false);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [sorts, setSorts] = useState([]);
    const [createTicketState, setCreateTicketState] = useState({
        title: '',
        description: '',
        status: 'open',
        priority: 'low',
        assigned_user_id: '',
    });

    useEffect(() => {
       {
        try {
            setIsLoading(true);
            getTickets(filters, sorts).then((res) => {
                setTickets(res);
            });
        } catch (error) {
            console.log(error);
        }
       }
        try {
             getUsers().then((res) => {
                console.log("response", res);
                setUsers(res);
                setIsLoading(false);
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        getTickets(filters, sorts).then(setTickets);
    }, [filters, sorts]);

    const handleCreateTicket = async (e) => {
        e.preventDefault(); // מונע את רענון העמוד בעת שליחת הטופס
        try {
            const response = await createTicket(createTicketState);
            setIsOpenCreateTicket(false);
            alert('פניה נוצרה בהצלחה');
            getTickets(filters, sorts).then(setTickets);
            setCreateTicketState({
                title: '',
                description: '',
                status: 'open',
                priority: 'low',
                assigned_user_id: '',
            });
        } catch (error) {
            alert(error.response.data.message);
            console.log(error);
        }
    }



    return (
        <>
            <div className="create_ticket_button">
                <Button onClick={() => setIsOpenCreateTicket(true)}>+ צור פניה</Button>
            </div>
            <div className="filters_and_sorts">
                <select className="filters_select" type="text" placeholder="סטטוס" value={filters.status || ''} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                    <option value="">סנן לפי סטטוס</option>
                    <option value="open">פתוח</option>
                    <option value="in_progress">בטיפול</option>
                    <option value="closed">סגור</option>
                </select>
                <select className="filters_select" type="text" placeholder="עדיפות" value={filters.priority || ''} onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
                    <option value="">סנן לפי עדיפות</option>
                    <option value="low">נמוכה</option>
                    <option value="medium">בינונית</option>
                    <option value="high">גבוהה</option>
                </select>
                <select className="filters_select" type="text" placeholder="משתמש משויך" value={filters.assigned_user_id || ''} onChange={(e) => setFilters({ ...filters, assigned_user_id: e.target.value })}>
                    <option value="">סנן לפי משתמש משויך</option>
                    {users?.length > 0 && users.map((user) => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
               
            </div>

            <h1 className="ticket_list_title">רשימת פניות</h1>
            <div className="ticket_list">
                {tickets?.length > 0 && tickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}
                {tickets?.length === 0 ? <div className="ticket_list_empty">{isLoading ? <Loader /> : 'אין פניות'} </div> : null}
            </div>

            {isOpenCreateTicket && (
                <>
                <div className="modal_backdrop"></div>
                <form className="create_ticket_modal" onSubmit={handleCreateTicket}>
                    <Button onClick={() => setIsOpenCreateTicket(false)}>X</Button>
                    <h2> צור פניה</h2>
                    <Input required={true} type="text" placeholder="כותרת" value={createTicketState.title} onChange={(e) => setCreateTicketState({ ...createTicketState, title: e.target.value })} />
                    <Input required={true} type="text" placeholder="תיאור" value={createTicketState.description} onChange={(e) => setCreateTicketState({ ...createTicketState, description: e.target.value })} />
                    <select className="create_ticket_select" type="text" placeholder="סטטוס" value={createTicketState.status} onChange={(e) => setCreateTicketState({ ...createTicketState, status: e.target.value })} >
                        <option value="open">פתוח</option>
                        <option value="in_progress">בטיפול</option>
                        <option value="closed">סגור</option>
                    </select>
                    <select className="create_ticket_select" type="text" placeholder="עדיפות" value={createTicketState.priority} onChange={(e) => setCreateTicketState({ ...createTicketState, priority: e.target.value })} >
                        <option value="low">נמוכה</option>
                        <option value="medium">בינונית</option>
                        <option value="high">גבוהה</option>
                    </select>
                    <select className="create_ticket_select" type="text" placeholder="משתמש משויך" value={createTicketState.assigned_user_id} onChange={(e) => setCreateTicketState({ ...createTicketState, assigned_user_id: e.target.value })}>
                       <option value="">בחר משתמש</option>
                        {users?.length > 0 && users.map((user) => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    <Button type="submit">שמור</Button>
                </form>
                </>
            )}



        </>
    )
}