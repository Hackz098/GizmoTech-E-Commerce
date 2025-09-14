"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect to /admin if already authenticated
  useEffect(() => {
    fetch('/api/admin/me').then(res => {
      if (res.ok) router.replace('/admin');
    }).catch(() => {});
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        // Force a full reload to ensure cookie is set and middleware is triggered
        window.location.href = '/admin';
      } else {
        const data = await response.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
          <h2 className="text-2xl font-bold text-text-primary">Admin Login</h2>
          <p className="text-text-secondary mt-2">Sign in to manage your store</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-text-primary text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div>
            <label className="block text-text-primary text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700 text-center">
              <strong>Demo Credentials:</strong><br />
              Username: <code className="bg-blue-100 px-1 rounded">admin</code><br />
              Password: <code className="bg-blue-100 px-1 rounded">admin123</code>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
