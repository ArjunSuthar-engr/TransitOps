import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function Maintenance() {
  const [isOpen, setIsOpen] = useState(false);
  const mockLogs = [
    { id: '1', vehicle: 'Ford Transit (TX-402-A)', description: 'Engine oil replacement and filter change', date: '2026-07-02', cost: '$120.00', status: 'completed' },
    { id: '2', vehicle: 'Mercedes Benz (TX-112-C)', description: 'Brake pads replacement & rotor turning', date: '2026-07-10', cost: '$340.00', status: 'in_progress' },
    { id: '3', vehicle: 'Volvo Coach (TX-901-B)', description: 'Transmission fluid flush and system check', date: '2026-07-25', cost: '$580.00', status: 'scheduled' }
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Maintenance Logs"
        description="Log service records, scheduled inspections, preventative checklists, and service costs."
        actions={<Button size="sm" onClick={() => setIsOpen(true)}>Log Service</Button>}
      />

      {/* Maintenance Timeline Service Cards List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockLogs.map((log) => (
          <Card key={log.id} className="hover:border-brand-primary dark:hover:border-slate-800 transition-colors flex flex-col justify-between">
            <div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant={log.status === 'completed' ? 'success' : log.status === 'in_progress' ? 'warning' : 'neutral'}>
                    {log.status.replace('_', ' ')}
                  </Badge>
                  <span className="text-[10px] text-brand-neutral-dark/50 font-bold font-sans">{log.date}</span>
                </div>
                <CardTitle className="mt-2.5 text-sm">{log.vehicle}</CardTitle>
              </CardHeader>
              <CardContent className="font-sans text-xs flex flex-col gap-4">
                <p className="text-brand-neutral-dark/80 min-h-[36px] leading-relaxed">{log.description}</p>
                <div className="flex items-center justify-between border-t border-brand-border/40 pt-3 text-[10px]">
                  <span className="text-brand-neutral-dark/50 font-bold uppercase tracking-wider">Maintenance Cost</span>
                  <span className="font-bold text-brand-primary text-sm">{log.cost}</span>
                </div>
              </CardContent>
            </div>
            <CardFooter className="bg-brand-surface/20">
              <Button variant="outline" size="sm" className="w-full">Manage Service</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Service Logging Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Log Vehicle Service"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setIsOpen(false)}>Save Log</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4 font-sans">
          <Input label="Vehicle ID / Registration" placeholder="e.g. Ford Transit (TX-402-A)" />
          <Input label="Description of Service" placeholder="e.g. Engine oil replacement" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Service Date" type="date" />
            <Input label="Service Cost ($)" type="number" placeholder="e.g. 150" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
