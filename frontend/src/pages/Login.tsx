import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '@/services/authService';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const DEMO_ACCOUNTS = [
  {
    label: 'Admin',
    icon: '🔑',
    email: 'admin@transitops.com',
    password: 'Transit@Admin1',
  },
  {
    label: 'Fleet Manager',
    icon: '🚛',
    email: 'manager@transitops.com',
    password: 'Transit@Fleet1',
  },
  {
    label: 'Dispatcher',
    icon: '📋',
    email: 'dispatch@transitops.com',
    password: 'Transit@Disp1',
  },
];

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await authService.login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError('');
  };

  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* ── Left panel: form ── */}
      <div className="flex w-full flex-col items-center justify-center px-8 py-12 md:w-1/2">
        <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-brand-primary">Hello Again!</h1>
          <p className="mt-1 text-sm text-brand-neutral-dark/50">Sign in to manage your fleet operations.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            placeholder="you@transitops.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <Button type="submit" className="mt-1 h-11 w-full" disabled={isLoading}>
            {isLoading ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>

        {/* Demo quick-fill */}
        <div className="mt-8">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-brand-neutral-dark/40">
            Quick Demo Access
          </p>
          <div className="grid grid-cols-3 gap-3">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.label}
                type="button"
                onClick={() => fillDemo(acc)}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-brand-border bg-white px-3 py-3.5 text-center transition-all hover:border-brand-primary/40 hover:bg-[#ECF4EE] hover:shadow-sm active:scale-95"
              >
                <span className="text-xl">{acc.icon}</span>
                <span className="text-[11px] font-semibold leading-tight text-brand-neutral-dark">
                  {acc.label}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-[10px] text-brand-neutral-dark/35">
            Clicking a card auto-fills the credentials above.
          </p>
        </div>
        </div> {/* end max-w-sm */}
      </div>

      {/* ── Right panel: illustration ── */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-brand-primary rounded-l-[2.5rem] m-2">
        <div className="flex flex-col items-center gap-6 px-12 text-center">
          {/* SVG truck-on-route diagram — path bleeds left past panel edge */}
          <svg viewBox="-80 0 460 300" className="w-full max-w-lg" fill="none" xmlns="http://www.w3.org/2000/svg" style={{overflow:'visible'}}>
            {/* Full route path — starts far left in the white area, curves through dark panel */}
            <path
              d="M-80 260 Q -30 220 20 230 Q 80 240 130 200 Q 190 155 240 170 Q 300 185 340 120 Q 370 70 390 85"
              stroke="white" strokeWidth="2.5" strokeDasharray="10 7" strokeLinecap="round" opacity="0.35"
            />

            {/* Green solid portion — travelled part ending at truck */}
            <path
              d="M-80 260 Q -30 220 20 230 Q 80 240 130 200 Q 190 155 230 168"
              stroke="#A5D48C" strokeWidth="3" strokeLinecap="round"
            />

            {/* Origin dot — far left, bleeds into white area */}
            <circle cx="-80" cy="260" r="6" fill="#A5D48C" />
            <circle cx="-80" cy="260" r="12" fill="#A5D48C" opacity="0.2" />
            <text x="-68" y="264" fill="white" fontSize="11" fontFamily="Inter, sans-serif" opacity="0.6">Origin</text>

            {/* Waypoint dots along route */}
            <circle cx="20" cy="230" r="4" fill="white" opacity="0.3" />
            <circle cx="130" cy="200" r="4" fill="white" opacity="0.3" />
            <circle cx="300" cy="130" r="4" fill="white" opacity="0.3" />

            {/* Destination dot + pin */}
            <circle cx="390" cy="85" r="6" fill="white" opacity="0.45" />
            <circle cx="390" cy="85" r="11" fill="white" opacity="0.12" />
            <text x="372" y="74" fill="white" fontSize="11" fontFamily="Inter, sans-serif" opacity="0.45">Destination</text>

            {/* Truck at current position on the route (~230, 168) */}
            <g transform="translate(213,145) rotate(-20)">
              {/* Cargo body */}
              <rect x="0" y="4" width="30" height="16" rx="3" fill="white" />
              <text x="15" y="16" fill="#0C0D0D" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">TO</text>
              {/* Cabin */}
              <path d="M 30 4 L 42 4 Q 46 4 46 8 L 46 20 L 30 20 Z" fill="#A5D48C" />
              {/* Windshield */}
              <rect x="32" y="6" width="10" height="7" rx="1.5" fill="white" opacity="0.65" />
              {/* Wheels */}
              <circle cx="8" cy="22" r="4" fill="#0C0D0D" />
              <circle cx="8" cy="22" r="1.8" fill="white" opacity="0.5" />
              <circle cx="26" cy="22" r="4" fill="#0C0D0D" />
              <circle cx="26" cy="22" r="1.8" fill="white" opacity="0.5" />
              <circle cx="40" cy="22" r="4" fill="#0C0D0D" />
              <circle cx="40" cy="22" r="1.8" fill="white" opacity="0.5" />
            </g>

            {/* Speed lines behind truck */}
            <line x1="180" y1="162" x2="162" y2="167" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
            <line x1="178" y1="169" x2="158" y2="175" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
          </svg>

          <div>
            <h2 className="font-display text-2xl font-bold text-white">Real-time Fleet Control</h2>
            <p className="mt-2 text-sm text-white/55 leading-relaxed max-w-xs">
              Track your vehicles, assign trips, and manage operational expenses — all in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

