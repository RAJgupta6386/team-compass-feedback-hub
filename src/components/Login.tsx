
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock users for demo
const mockUsers = [
  { id: 1, email: 'manager@company.com', name: 'Sarah Johnson', role: 'manager', team: [2, 3, 4] },
  { id: 2, email: 'john@company.com', name: 'John Smith', role: 'employee', managerId: 1 },
  { id: 3, email: 'emma@company.com', name: 'Emma Davis', role: 'employee', managerId: 1 },
  { id: 4, email: 'mike@company.com', name: 'Mike Wilson', role: 'employee', managerId: 1 },
];

interface LoginProps {
  onLogin: (user: any) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [selectedUser, setSelectedUser] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers.find(u => u.id.toString() === selectedUser);
    if (user) {
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">Feedback System</CardTitle>
          <CardDescription>Select a user to continue (Demo Mode)</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user">Select User</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a user to login as" />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.name} ({user.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" disabled={!selectedUser}>
              Login
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-sm text-blue-900 mb-2">Demo Users:</h4>
            <div className="text-xs text-blue-700 space-y-1">
              <div>• Sarah Johnson (Manager)</div>
              <div>• John Smith (Employee)</div>
              <div>• Emma Davis (Employee)</div>
              <div>• Mike Wilson (Employee)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
