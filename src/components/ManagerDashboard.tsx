
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { FeedbackForm } from './FeedbackForm';
import { FeedbackHistory } from './FeedbackHistory';
import { mockFeedbacks, mockUsers } from '@/data/mockData';

interface ManagerDashboardProps {
  user: any;
}

export const ManagerDashboard = ({ user }: ManagerDashboardProps) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  // Get team members
  const teamMembers = mockUsers.filter(u => user.team?.includes(u.id));
  
  // Get feedback stats
  const teamFeedbacks = mockFeedbacks.filter(f => user.team?.includes(f.employeeId));
  const positiveFeedbacks = teamFeedbacks.filter(f => f.sentiment === 'positive');
  const neutralFeedbacks = teamFeedbacks.filter(f => f.sentiment === 'neutral');
  const negativeFeedbacks = teamFeedbacks.filter(f => f.sentiment === 'negative');

  const handleCreateFeedback = (employee: any) => {
    setSelectedEmployee(employee);
    setShowFeedbackForm(true);
  };

  const handleCloseFeedbackForm = () => {
    setShowFeedbackForm(false);
    setSelectedEmployee(null);
  };

  if (showFeedbackForm && selectedEmployee) {
    return (
      <FeedbackForm
        employee={selectedEmployee}
        manager={user}
        onClose={handleCloseFeedbackForm}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Team Members</p>
              <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <MessageSquare className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Feedback</p>
              <p className="text-2xl font-bold text-gray-900">{teamFeedbacks.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Positive</p>
              <p className="text-2xl font-bold text-gray-900">{positiveFeedbacks.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-orange-600 font-bold">!</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Needs Attention</p>
              <p className="text-2xl font-bold text-gray-900">{negativeFeedbacks.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Your Team</CardTitle>
          <CardDescription>Manage feedback for your team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => {
              const memberFeedbacks = mockFeedbacks.filter(f => f.employeeId === member.id);
              const lastFeedback = memberFeedbacks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
              
              return (
                <Card key={member.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <Badge variant="outline">{memberFeedbacks.length} feedback(s)</Badge>
                    </div>
                    
                    {lastFeedback && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Last feedback:</p>
                        <Badge 
                          variant={
                            lastFeedback.sentiment === 'positive' ? 'default' :
                            lastFeedback.sentiment === 'neutral' ? 'secondary' : 'destructive'
                          }
                        >
                          {lastFeedback.sentiment}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(lastFeedback.date).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleCreateFeedback(member)}
                        className="flex-1"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        New Feedback
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      <FeedbackHistory feedbacks={teamFeedbacks.slice(0, 5)} title="Recent Team Feedback" />
    </div>
  );
};
