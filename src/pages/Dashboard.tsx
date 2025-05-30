// src/components/Dashboard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { BarChart, LineChart } from "../components/ui/charts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { useMediaQuery } from "../hooks/use-media-query";
import { z } from "zod";

// Sample data schemas
const reportSchema = z.object({
  id: z.string(),
  title: z.string(),
  count: z.number(),
  change: z.number(),
});

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().optional(),
  role: z.string(),
  activity: z.number(),
});

type ReportData = z.infer<typeof reportSchema>;
type UserData = z.infer<typeof userSchema>;

// Sample data
const reportsData: ReportData[] = [
  { id: "1", title: "Total Reports", count: 1245, change: 12 },
  { id: "2", title: "Open Requests", count: 342, change: -5 },
  { id: "3", title: "Resolved", count: 876, change: 8 },
  { id: "4", title: "Avg. Response Time", count: 2.4, change: -0.5 },
];

const usersData: UserData[] = [
  { id: "1", name: "Alex Johnson", avatar: "", role: "Admin", activity: 98 },
  { id: "2", name: "Sam Wilson", avatar: "", role: "Moderator", activity: 87 },
  { id: "3", name: "Taylor Swift", avatar: "", role: "User", activity: 76 },
  { id: "4", name: "Jamie Lee", avatar: "", role: "User", activity: 65 },
  { id: "5", name: "Casey Smith", avatar: "", role: "User", activity: 54 },
];

const monthlyTrends = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Reports",
      data: [120, 190, 170, 220, 240, 195],
      backgroundColor: "rgba(59, 130, 246, 0.8)",
    },
    {
      label: "Requests",
      data: [80, 120, 140, 110, 160, 150],
      backgroundColor: "rgba(16, 185, 129, 0.8)",
    },
  ],
};

const feedbackTrends = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Positive",
      data: [65, 59, 80, 81, 76, 85],
      borderColor: "rgba(16, 185, 129, 0.8)",
      fill: false,
    },
    {
      label: "Negative",
      data: [28, 35, 32, 25, 19, 15],
      borderColor: "rgba(239, 68, 68, 0.8)",
      fill: false,
    },
  ],
};

export function Dashboard() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reportsData.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {report.title}
                  </CardTitle>
                  <span className={`text-sm ${
                    report.change >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {report.change >= 0 ? '+' : ''}{report.change}%
                  </span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{report.count}{report.title.includes('Time') ? 'h' : ''}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <div className={`grid gap-4 ${isLargeScreen ? 'grid-cols-2' : 'grid-cols-1'}`}>
            <Card className="p-4">
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart data={monthlyTrends} className="h-[300px]" />
              </CardContent>
            </Card>

            <Card className="p-4">
              <CardHeader>
                <CardTitle>Feedback Sentiment</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart data={feedbackTrends} className="h-[300px]" />
              </CardContent>
            </Card>
          </div>

          {/* Top Users */}
          <Card>
            <CardHeader>
              <CardTitle>Top Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usersData.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-4">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${user.activity}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{user.activity}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Reports Management</h2>
            <Button>Create New Report</Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <p>Reports management content goes here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Requests Management</h2>
            <Button>Process Requests</Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <p>Requests management content goes here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Feedback Analysis</h2>
            <Button>Export Data</Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <p>Feedback analysis content goes here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}