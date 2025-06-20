
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, User, MessageSquare } from 'lucide-react';
import { mockUsers } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface FeedbackHistoryProps {
  feedbacks: any[];
  title: string;
  isEmployee?: boolean;
  employeeId?: number;
}

export const FeedbackHistory = ({ feedbacks, title, isEmployee = false, employeeId }: FeedbackHistoryProps) => {
  const [acknowledgedFeedbacks, setAcknowledgedFeedbacks] = useState<number[]>([]);
  const { toast } = useToast();

  const handleAcknowledge = (feedbackId: number) => {
    setAcknowledgedFeedbacks(prev => [...prev, feedbackId]);
    toast({
      title: "Feedback acknowledged",
      description: "Thank you for acknowledging this feedback.",
    });
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'neutral': return 'bg-yellow-100 text-yellow-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'neutral': return '😐';
      case 'negative': return '😔';
      default: return '📝';
    }
  };

  if (feedbacks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No feedback available yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {isEmployee ? 'Review and acknowledge feedback from your manager' : 'Recent feedback given to team members'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feedbacks.map((feedback) => {
            const employee = mockUsers.find(u => u.id === feedback.employeeId);
            const manager = mockUsers.find(u => u.id === feedback.managerId);
            const isAcknowledged = feedback.acknowledged || acknowledgedFeedbacks.includes(feedback.id);
            
            return (
              <Card key={feedback.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-gray-900">
                          {isEmployee ? `From: ${manager?.name}` : `To: ${employee?.name}`}
                        </span>
                      </div>
                      <Badge className={getSentimentColor(feedback.sentiment)}>
                        {getSentimentIcon(feedback.sentiment)} {feedback.sentiment}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(feedback.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-green-700 mb-1">Strengths</h4>
                      <p className="text-gray-700 bg-green-50 p-3 rounded">{feedback.strengths}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-orange-700 mb-1">Areas for Improvement</h4>
                      <p className="text-gray-700 bg-orange-50 p-3 rounded">{feedback.improvements}</p>
                    </div>
                  </div>

                  {isEmployee && (
                    <div className="mt-4 pt-3 border-t">
                      {isAcknowledged ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          <span className="text-sm">Acknowledged</span>
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAcknowledge(feedback.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Acknowledge
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
