import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Input } from '../design-system/Input';
import { Lock, Mail } from 'lucide-react';

export function LoginScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[--institutional-primary] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white text-2xl">EM</span>
          </div>
          <h1 className="text-3xl text-slate-900 mb-2">ErasmusMate</h1>
          <p className="text-slate-600">Erasmus Mobility Management Platform</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl">
          <h2 className="text-xl text-slate-900 mb-6">Sign In to Your Account</h2>

          <form className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@university.edu"
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={<Lock className="w-4 h-4" />}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300" />
                Remember me
              </label>
              <a href="#" className="text-[--institutional-primary] hover:underline">
                Forgot password?
              </a>
            </div>

            <Button variant="primary" size="lg" fullWidth>
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <a href="#" className="text-[--institutional-primary] hover:underline">
                Request Access
              </a>
            </p>
          </div>
        </Card>

        {/* Help Links */}
        <div className="mt-6 text-center space-y-2">
          <a href="#" className="text-sm text-slate-600 hover:text-slate-900 block">
            Contact Support
          </a>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-700">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-700">Terms of Service</a>
          </div>
        </div>

        {/* Institution Login Notice */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <p className="text-xs text-slate-700 text-center">
            <strong>Note:</strong> Use your institutional credentials provided by your home university's Erasmus office.
          </p>
        </Card>
      </div>
    </div>
  );
}
