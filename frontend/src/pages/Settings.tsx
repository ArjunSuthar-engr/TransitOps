
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function Settings() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <PageHeader
        title="Settings Configuration"
        description="Manage application rules, notification profiles, fuel units, and general preferences."
        actions={<Button size="sm">Save Changes</Button>}
      />

      <div className="flex flex-col gap-6">
        {/* Profile settings */}
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Manage your username, contact email, and active role description.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Full Name" defaultValue="Arjun Suthar" />
              <Input label="Email Address" type="email" defaultValue="arjunsuthar.engr@gmail.com" disabled />
            </div>
            <Input label="Title Role" defaultValue="Operations Manager" disabled />
          </CardContent>
        </Card>

        {/* System preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Fleet Preferences</CardTitle>
            <CardDescription>Configure fuel quantity metrics, dashboard metrics, and limits.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Fuel Metrics Unit
                </label>
                <select className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm bg-white dark:bg-slate-955 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-950 dark:focus:ring-white">
                  <option value="liters">Liters (L)</option>
                  <option value="gallons">Gallons (Gal)</option>
                </select>
              </div>
              <Input label="Critical Mileage Limit (km)" type="number" defaultValue={10000} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
