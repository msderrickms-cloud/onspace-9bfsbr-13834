import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Users, TrendingUp, Calendar, Lock, LogOut } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { WaitlistEntry } from '@/types/waitlist';

interface WaitlistEntryWithDate extends WaitlistEntry {
  created_at: string;
}

interface DailySignup {
  date: string;
  count: number;
}

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.error('VITE_ADMIN_PASSWORD is not set in environment variables');
}
const AUTH_KEY = 'wordstack_admin_auth';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signups, setSignups] = useState<WaitlistEntryWithDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [dailyData, setDailyData] = useState<DailySignup[]>([]);

  useEffect(() => {
    // Check if already authenticated in this session
    const authStatus = sessionStorage.getItem(AUTH_KEY);
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSignups();
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      setPasswordError('');
      console.log('Admin authenticated successfully');
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPasswordInput('');
      console.log('Authentication failed');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
    setPasswordInput('');
    setPasswordError('');
    console.log('Admin logged out');
  };

  const fetchSignups = async () => {
    console.log('Fetching waitlist signups...');
    
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching signups:', error);
      setLoading(false);
      return;
    }

    console.log('Fetched signups:', data);
    setSignups(data || []);
    
    // Process daily analytics
    if (data) {
      const grouped = groupByDate(data);
      setDailyData(grouped);
    }
    
    setLoading(false);
  };

  const groupByDate = (data: WaitlistEntryWithDate[]): DailySignup[] => {
    const groups: Record<string, number> = {};
    
    data.forEach((entry) => {
      const date = new Date(entry.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      groups[date] = (groups[date] || 0) + 1;
    });

    return Object.entries(groups)
      .map(([date, count]) => ({ date, count }))
      .reverse()
      .slice(-14); // Last 14 days
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Poet Handle', 'Signup Date'];
    const rows = signups.map((signup) => [
      signup.name,
      signup.email,
      signup.poet_handle || 'N/A',
      new Date(signup.created_at).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wordstack-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    console.log('Exported', signups.length, 'signups to CSV');
  };

  const getTodaySignups = () => {
    const today = new Date().toDateString();
    return signups.filter(
      (s) => new Date(s.created_at).toDateString() === today
    ).length;
  };

  const getWeekSignups = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return signups.filter(
      (s) => new Date(s.created_at) >= weekAgo
    ).length;
  };

  // Password Protection Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex justify-center mb-6">
              <div className="bg-emerald-900/30 p-4 rounded-full">
                <Lock className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-white text-center mb-2">
              Admin Access
            </h1>
            <p className="text-slate-400 text-center mb-8">
              Enter password to access the dashboard
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError('');
                  }}
                  placeholder="Enter admin password"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 text-center text-lg py-6"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-red-400 text-sm mt-2 text-center">{passwordError}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 py-6 text-lg font-semibold"
                disabled={!passwordInput}
              >
                Unlock Dashboard
              </Button>
            </form>

            <p className="text-slate-500 text-xs text-center mt-6">
              Default password: <code className="bg-slate-800 px-2 py-1 rounded">wordstack2026</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">WordStack Admin</h1>
            <p className="text-slate-400">Waitlist Analytics & Management</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-emerald-400" />
              <span className="text-3xl font-bold text-white">{signups.length}</span>
            </div>
            <h3 className="text-slate-300 text-sm font-medium">Total Signups</h3>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-blue-400" />
              <span className="text-3xl font-bold text-white">{getTodaySignups()}</span>
            </div>
            <h3 className="text-slate-300 text-sm font-medium">Today's Signups</h3>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <span className="text-3xl font-bold text-white">{getWeekSignups()}</span>
            </div>
            <h3 className="text-slate-300 text-sm font-medium">This Week</h3>
          </div>
        </div>

        {/* Chart */}
        {dailyData.length > 0 && (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-white mb-6">Signup Trend (Last 14 Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Export Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">All Signups</h2>
          <Button
            onClick={exportToCSV}
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={signups.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Signups Table */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/80">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Poet Handle</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Signup Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {signups.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                      No signups yet
                    </td>
                  </tr>
                ) : (
                  signups.map((signup) => (
                    <tr key={signup.email} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 text-white">{signup.name}</td>
                      <td className="px-6 py-4 text-slate-300">{signup.email}</td>
                      <td className="px-6 py-4 text-slate-400">
                        {signup.poet_handle || '—'}
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {new Date(signup.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Admin Dashboard • Access at <code className="bg-slate-800 px-2 py-1 rounded">/admin-dashboard</code>
          </p>
        </div>
      </div>
    </div>
  );
}
