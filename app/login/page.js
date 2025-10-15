'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function AuthPage() {
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    setError('');
  }, [mode]);

  function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  // In your login page, update both functions like this:

function handleSignup(e) {
  e.preventDefault();
  if (!name || !email || !password) return setError('Please fill all fields');

  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return setError('An account with this email already exists');
  }

  users.push({ id: Date.now(), name, email, password });
  saveUsers(users);

  // auto sign-in after signup
  localStorage.setItem('user', JSON.stringify({ name, email }));
  
  // Force the event to be heard by all components
  window.dispatchEvent(new Event('userLogin'));
  window.dispatchEvent(new Event('storage')); // Also trigger storage event
  
  router.push('/');
}

function handleSignin(e) {
  e.preventDefault();
  if (!email || !password) return setError('Please provide email and password');

  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return setError('Invalid email or password');

  localStorage.setItem('user', JSON.stringify({ name: user.name, email: user.email }));
  
  // Force the event to be heard by all components
  window.dispatchEvent(new Event('userLogin'));
  window.dispatchEvent(new Event('storage')); // Also trigger storage event
  
  router.push('/');
}

  return (
    <div className="flex items-center justify-center min-h-screen py-8">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border-4 border-lime-400 p-8 w-full max-w-md animate-fadeIn mx-4">
        {/* Header Section */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-lime-700 fancy-heading">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </h2>
        </div>

        {/* Toggle Button - Moved below header */}
        <div className="text-center mb-6">
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-green-600 hover:underline font-medium"
          >
            {mode === 'signin' ? 'Create account' : 'Have an account? Sign in'}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {error}
          </div>
        )}

        {mode === 'signup' ? (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Create a password"
              />
            </div>
            <Button type="submit" className="w-full mt-6 py-3">
              <span role="img" aria-label="leaf">🌿</span>
              Create account
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSignin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" className="w-full mt-6 py-3">
              <span role="img" aria-label="leaf">🌿</span>
              Sign in
            </Button>
          </form>
        )}
        
        <p className="text-center text-sm text-gray-500 mt-8">
          By continuing you agree to this demo&#39;s <span className="underline">terms</span>.
        </p>
      </div>
    </div>
  );
}