import { useState } from 'react';
import {
    updateTicket,
    updateTicketStatus,
    updateTicketAssignedUser,
} from '../services/ticketApi';
import { Button } from '../../../components/ui/button/Button';

export const TicketCard = ({ ticket }) => {
    const {
        title,
        description,
        status,
        priority,
        assigned_user_id,
        assigned_user_name,
        created_at,
        updated_at,
    } = ticket;

    const [changeStatuses,] = useState(['open', 'in_progress', 'closed']);
    const [changeStatus, setChangeStatus] = useState('open');
    const [isOpenUpdateStatus, setIsOpenUpdateStatus] = useState(false);





    const handleChangeStatus = async (id) => {
        try {
            const response = await updateTicketStatus(id, changeStatus);
            setIsOpenUpdateStatus(false);
            setChangeStatus('open');
            alert('סטטוס הפניה עודכן בהצלחה');
        } catch (error) {
            alert(error.response.data.message);
            console.log(error);
        }
    };

    return (
        <>
            <div className="ticket_card">
                <h2>{title}</h2>
                <p className="ticket_card_description">{description}</p>
                <p className={`status status--${status}`}>
                    {status} :סטטוס הפניה
                </p>
                <p className={`priority priority--${priority}`}>
                    {priority} :עדיפות הפניה
                </p>
                {assigned_user_name && <p>{assigned_user_name}</p>}
                {created_at && <p>נוצר ב: {created_at}</p>}
                {updated_at && <p>עודכן ב: {updated_at}</p>}
                {assigned_user_id && <p>משויך ל: {assigned_user_name}</p>}
                <div className="ticket_card_buttons">
                    <Button onClick={() => setIsOpenUpdateStatus(true)}>עדכן סטטוס פניה</Button>
                </div>
            </div>

            {isOpenUpdateStatus && (
                <>
                <div className="modal_backdrop"></div>
                <form className="update_status_modal">
                    <Button onClick={() => setIsOpenUpdateStatus(false)}>X</Button>
                    <h2>עדכן סטטוס הפניה</h2>
                    <select onChange={(e) => setChangeStatus(e.target.value)} className="update_status_select">
                        {changeStatuses.map((status) => (
                            <option key={status} value={status} className="update_status_option">{status}</option>
                        ))}
                    </select>
                    <Button onClick={() => handleChangeStatus(ticket.id)}>שמור</Button>
                </form>
                </>
            )}
        </>
    );
};