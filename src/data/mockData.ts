
// Mock data for the feedback system demo

export const mockUsers = [
  { id: 1, email: 'manager@company.com', name: 'Sarah Johnson', role: 'manager', team: [2, 3, 4] },
  { id: 2, email: 'john@company.com', name: 'John Smith', role: 'employee', managerId: 1 },
  { id: 3, email: 'emma@company.com', name: 'Emma Davis', role: 'employee', managerId: 1 },
  { id: 4, email: 'mike@company.com', name: 'Mike Wilson', role: 'employee', managerId: 1 },
];

export const mockFeedbacks = [
  {
    id: 1,
    employeeId: 2,
    managerId: 1,
    strengths: "John has consistently delivered high-quality code and has been very reliable with deadlines. His problem-solving skills have improved significantly, and he's been great at collaborating with the design team on recent projects.",
    improvements: "Could benefit from taking more initiative in team meetings and sharing ideas more proactively. Also, would be valuable to spend some time learning about system architecture to prepare for senior-level responsibilities.",
    sentiment: "positive",
    date: "2024-01-15T10:00:00Z",
    acknowledged: true
  },
  {
    id: 2,
    employeeId: 3,
    managerId: 1,
    strengths: "Emma's attention to detail is exceptional, and her testing work has prevented several critical bugs from reaching production. She's also been very helpful in mentoring junior developers and creating clear documentation.",
    improvements: "Could work on time management skills, especially when context-switching between multiple projects. Also, building more confidence in presenting work to stakeholders would be beneficial for career growth.",
    sentiment: "positive",
    date: "2024-01-10T14:30:00Z",
    acknowledged: false
  },
  {
    id: 3,
    employeeId: 4,
    managerId: 1,
    strengths: "Mike shows great enthusiasm for learning new technologies and has been proactive about improving his skills. His willingness to take on challenging tasks is appreciated by the whole team.",
    improvements: "Needs to focus more on code review feedback and implementing suggested changes consistently. Also, communication about blockers and progress updates could be more frequent and detailed.",
    sentiment: "neutral",
    date: "2024-01-08T09:15:00Z",
    acknowledged: true
  },
  {
    id: 4,
    employeeId: 2,
    managerId: 1,
    strengths: "Excellent work on the recent API optimization project. John's technical analysis was thorough and the performance improvements were significant. Great collaboration with the DevOps team.",
    improvements: "Consider taking on more cross-functional projects to broaden technical expertise. Documentation of complex solutions could be more comprehensive for future team reference.",
    sentiment: "positive",
    date: "2024-01-05T16:45:00Z",
    acknowledged: true
  },
  {
    id: 5,
    employeeId: 3,
    managerId: 1,
    strengths: "Emma's leadership during the Q4 sprint retrospectives was outstanding. She facilitated productive discussions and helped the team identify concrete improvement actions.",
    improvements: "Would benefit from taking ownership of larger features end-to-end. This would help develop project management skills and increase technical confidence.",
    sentiment: "positive",
    date: "2024-01-02T11:20:00Z",
    acknowledged: false
  }
];
