<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Ticket;

class ReopenHighPriorityTickets extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:reopen-high-priority-tickets';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    /**
     * Reopen high priority tickets that have been in progress for more than 48 hours.
     * @return void
     */
    public function handle()
    {
        //
        $tickets = Ticket::where('priority', 'high')->where('status', 'in_progress')->get();
        foreach ($tickets as $ticket) {
            if ($ticket->updated_at < now()->subHours(48)) {
                $ticket->status = 'open';
                $ticket->save();
            }
        }
    }
}
