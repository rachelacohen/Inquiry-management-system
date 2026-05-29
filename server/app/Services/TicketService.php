<?php

namespace App\Services;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Exception;

class TicketService
{

    private array $allowedFilters = ['status', 'priority', 'assigned_user_id'];
    private array $allowedSorts = ['created_at', 'priority', 'status'];

    

    /**
     * Get all tickets with filters and sorts
     * @param Request $request
     * @return collection of tickets
     */
    public function getTickets(Request $request)
    {
        $query = Ticket::query();
        $filters = $request->input('filters', []) ?? [];
        $sorts = $request->input('sorts', []) ?? [];

        foreach ($filters as $field => $value) {
            if (in_array($field, $this->allowedFilters) && $value !== null && $value !== '') {
                $query->where($field, $value);
            }
        }
        foreach ($sorts as $field => $direction) {
            if (in_array($field, $this->allowedSorts) && in_array($direction, ['asc', 'desc'])) {
                $query->orderBy($field, $direction);
            }
        }
        return  $query->get();
    }

    /**
     * Show a ticket
     * @param Ticket $ticket
     * @return Ticket
     */
    public function showTicket(Ticket $ticket)
    {
        return $ticket;
    }

    /**
     * Get high priority tickets
     * @return collection of tickets
     */
    public function getHighPriorityTickets()
    {
        return Ticket::where('priority', 'high')
            ->where('status', 'in_progress')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Store a ticket
     * @param array $data
     * @return Ticket
     */
    public function storeTicket(array $data)
    {
        $ticket = Ticket::create($data);
        return $ticket;
    }


    /**
     * Update a ticket
     * @param array $data
     * @param Ticket $ticket
     * @return Ticket
     */
    public function updateTicket(array $data, Ticket $ticket)
    {

        $assigned_user_id = $data['assigned_user_id'] ?? $ticket->assigned_user_id;
        if (empty($assigned_user_id) && $data['status'] ?? null == 'closed') {
            throw new Exception('לא ניתן לסגור פניה שאינה משויכת למשתמש.');
        }

        $ticket->update($data);
        return $ticket;
    }


    /**
     * Update the status of a ticket
     * @param Ticket $ticket
     * @param string $status
     * @return Ticket
     */
    public function updateTicketStatus(Ticket $ticket, $status)
    {
        if (($ticket->assigned_user_id == '' || $ticket->assigned_user_id == null) && $status == 'closed') {
            throw new Exception('לא ניתן לסגור פניה שאינה משויכת למשתמש.');
        }

        $ticket->status = $status;
        $ticket->save();
        return $ticket;
    }
    /**
     * Update the assigned user of a ticket
     * @param Ticket $ticket
     * @param int $assignedUserId
     * @return Ticket
     */

    public function updateAssignedUser(Ticket $ticket, $assignedUserId)
    {
        $ticket->assigned_user_id = $assignedUserId;
        $ticket->save();
        return $ticket;
    }




    /**
     * Destroy a ticket
     * @param Ticket $ticket
     * @return array response with message and status code
     */
    public function destroyTicket(Ticket $ticket)
    {
        $ticket->delete();
        return ['message' => 'Ticket ' . $ticket->title . ' deleted successfully'];
    }
}
