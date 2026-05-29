<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Http\Resources\TicketResource;
use App\Http\Requests\TicketRequest;
use App\Services\TicketService;
use Exception;
use Illuminate\Http\JsonResponse;

class TicketController
{
    /**
     * Display a listing of the resource.
     * with filters and sorts
     * @param Request $request
     * @return collection of ticketsResource
     */
    public function index(Request $request, TicketService $ticketService)
    {
        //
        return TicketResource::collection($ticketService->getTickets($request));
    }


    /**
     * Store a newly created resource in storage.
     * @param TicketRequest $request
     * @param TicketService $ticketService
     * @return TicketResource
     */
    public function store(TicketRequest $request, TicketService $ticketService)
    {
        //
        return new TicketResource($ticketService->storeTicket($request->validated()));
    }


    /**
     * Display the specified resource.
     * @param Ticket $ticket
     * @param TicketService $ticketService
     * @return TicketResource
     */
    public function show(Ticket $ticket, TicketService $ticketService)
    {
        //
        return new TicketResource($ticketService->showTicket($ticket));
    }


    /**
     * Update the specified resource in storage.
     * @param TicketRequest $request
     * @param Ticket $ticket
     * @param TicketService $ticketService
     * @return TicketResource|JsonResponse
     */
    public function update(TicketRequest $request, Ticket $ticket, TicketService $ticketService)
    {
        //
        try {
            return new TicketResource($ticketService->updateTicket($request->validated(), $ticket));
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
    /**
     * Update the status of the specified resource.
     * @param Ticket $ticket
     * @param string $status
     * @return TicketResource|JsonResponse
     */

    public function updateStatus(Request $request, Ticket $ticket, TicketService $ticketService)
    {
        try {
            return new TicketResource($ticketService->updateTicketStatus($ticket, $request->input('status')));
        } catch (Exception $e) {

            return response()->json(['message' => $e->getMessage()], 400);
        }
    }


    /**
     * Update the assigned user of the specified resource.
     * @param Request $request
     * @param Ticket $ticket
     * @param TicketService $ticketService
     * @return TicketResource
     */
    public function updateAssignedUser(Request $request, Ticket $ticket, TicketService $ticketService)
    {
        return new TicketResource($ticketService->updateAssignedUser($ticket, $request->input('assignedUserId')));
    }



    /**
     * Remove the specified resource from storage.
     * @param Ticket $ticket
     * @param TicketService $ticketService
     * @return JsonResponse
     */
    public function destroy(Ticket $ticket, TicketService $ticketService)
    {
        //
        return response()->json($ticketService->destroyTicket($ticket));
    }
}
