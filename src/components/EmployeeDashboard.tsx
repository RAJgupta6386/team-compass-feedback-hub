
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, TrendingUp, CheckCircle } from 'lucide-react';
import { FeedbackHistory } from './FeedbackHistory';
import { mockFeedbacks } from '@/data/mockData';

interface EmployeeDashboardProps {
  user: any;
}

export const EmployeeDashboard = ({ user }: EmployeeDashboardProps) => {
  // Get feedback for this employee
  const myFeedbacks = mockFeedbacks.filter(f => f.employeeId === user.id);
  const positiveFeedbacks = myFeedbacks.filter(f => f.sentiment === 'positive');
  const acknowledgedFeedbacks = myFeedbacks.filter(f => f.acknowledged);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Feedback</p>
              <p className="text-2xl font-bold text-gray-900">{myFeedbacks.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Positive Feedback</p>
              <p className="text-2xl font-bold text-gray-900">{positiveFeedbacks.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <CheckCircle className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Acknowledged</p>
              <p className="text-2xl font-bold text-gray-900">{acknowledgedFeedbacks.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Welcome Message */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome back, {user.name}!</CardTitle>
          <CardDescription>
            Here's your feedback timeline. Review and acknowledge feedback from your manager.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Feedback Timeline */}
      <FeedbackHistory 
        feedbacks={myFeedbacks} 
        title="Your Feedback Timeline" 
        isEmployee={true}
        employeeId={user.id}
      />
    </div>
  );
};
