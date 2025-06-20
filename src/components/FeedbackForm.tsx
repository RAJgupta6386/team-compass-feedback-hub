
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FeedbackFormProps {
  employee: any;
  manager: any;
  onClose: () => void;
}

export const FeedbackForm = ({ employee, manager, onClose }: FeedbackFormProps) => {
  const [strengths, setStrengths] = useState('');
  const [improvements, setImprovements] = useState('');
  const [sentiment, setSentiment] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!strengths || !improvements || !sentiment) {
      toast({
        title: "Please fill all fields",
        description: "All feedback fields are required.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would save to the backend
    const newFeedback = {
      id: Date.now(),
      employeeId: employee.id,
      managerId: manager.id,
      strengths,
      improvements,
      sentiment,
      date: new Date().toISOString(),
      acknowledged: false
    };

    console.log('New feedback submitted:', newFeedback);
    
    toast({
      title: "Feedback submitted successfully!",
      description: `Feedback for ${employee.name} has been saved.`,
    });

    onClose();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={onClose} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Feedback for {employee.name}</CardTitle>
          <CardDescription>
            Provide structured feedback to help your team member grow and improve.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="strengths">Strengths & Achievements</Label>
              <Textarea
                id="strengths"
                placeholder="What has this person done well? What strengths have you observed?"
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="improvements">Areas for Improvement</Label>
              <Textarea
                id="improvements"
                placeholder="What specific areas could this person focus on for growth?"
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sentiment">Overall Sentiment</Label>
              <Select value={sentiment} onValueChange={setSentiment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select overall sentiment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="positive">Positive - Exceeding expectations</SelectItem>
                  <SelectItem value="neutral">Neutral - Meeting expectations</SelectItem>
                  <SelectItem value="negative">Needs improvement - Below expectations</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="submit" className="flex-1">
                Submit Feedback
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
