import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { PieChart } from "../components/ui/charts";
import { Typography } from "../components/ui/typography";
import { Progress } from "../components/ui/progress";
import { Tooltip, TooltipTrigger, TooltipContent } from "../components/ui/tooltip";
import { Leaf, Droplet, Zap, Recycle, Lightbulb } from "lucide-react";
import { useMediaQuery } from "../hooks/use-media-query";
import { z } from "zod";

const sustainabilityDataSchema = z.object({
  energySavedKWh: z.number(),
  waterSavedLiters: z.number(),
  wasteReducedKg: z.number(),
  carbonOffsetKg: z.number(),
  monthlyTrend: z.object({
    labels: z.array(z.string()),
    energy: z.array(z.number()),
    water: z.array(z.number()),
    waste: z.array(z.number()),
  }),
  comparison: z.object({
    average: z.object({
      energy: z.number(),
      water: z.number(),
      waste: z.number(),
    }),
    topPercentile: z.object({
      energy: z.number(),
      water: z.number(),
      waste: z.number(),
    }),
  }),
});

export type SustainabilityData = z.infer<typeof sustainabilityDataSchema>;

// Sample data - in a real app, this would come from an API
const userSustainabilityData: SustainabilityData = {
  energySavedKWh: 1245,
  waterSavedLiters: 8560,
  wasteReducedKg: 320,
  carbonOffsetKg: 450,
  monthlyTrend: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    energy: [80, 95, 110, 105, 130, 145],
    water: [600, 650, 700, 720, 800, 850],
    waste: [20, 25, 30, 35, 40, 45],
  },
  comparison: {
    average: {
      energy: 850,
      water: 6000,
      waste: 250,
    },
    topPercentile: {
      energy: 1500,
      water: 10000,
      waste: 500,
    },
  },
};

// Fun comparisons data
const comparisons = {
  energy: [
    { value: 1245, equivalent: "Charging 100,000 smartphones" },
    { value: 1245, equivalent: "12 refrigerators running for a year" },
  ],
  water: [
    { value: 8560, equivalent: "340 showers" },
    { value: 8560, equivalent: "2.5 Olympic swimming pools" },
  ],
  waste: [
    { value: 320, equivalent: "1,600 water bottles" },
    { value: 320, equivalent: "Weight of an adult panda" },
  ],
};

export function SustainabilityReport() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const data = sustainabilityDataSchema.parse(userSustainabilityData);

  // Calculate percentages for comparison
  const energyPercentage = Math.min(100, (data.energySavedKWh / data.comparison.topPercentile.energy) * 100);
  const waterPercentage = Math.min(100, (data.waterSavedLiters / data.comparison.topPercentile.water) * 100);
  const wastePercentage = Math.min(100, (data.wasteReducedKg / data.comparison.topPercentile.waste) * 100);

  // Data for pie chart
  const pieChartData = {
    labels: ["Energy", "Water", "Waste"],
    datasets: [
      {
        data: [data.energySavedKWh, data.waterSavedLiters, data.wasteReducedKg],
        backgroundColor: [
          "rgba(234, 179, 8, 0.8)",    // amber
          "rgba(59, 130, 246, 0.8)",    // blue
          "rgba(22, 163, 74, 0.8)",     // green
        ],
        borderColor: [
          "rgba(234, 179, 8, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(22, 163, 74, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Leaf className="w-8 h-8 text-green-500" />
        <Typography variant="h1">Your Sustainability Impact</Typography>
      </div>

      {/* Main Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Energy Saved */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Energy Saved</CardTitle>
            <Zap className="w-5 h-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <Typography variant="h2" className="mb-2">
              {data.energySavedKWh.toLocaleString()} kWh
            </Typography>
            <Progress value={energyPercentage} className="h-2" />
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help">
                  {Math.round(energyPercentage)}% of top performers
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Top performers save ~{data.comparison.topPercentile.energy.toLocaleString()} kWh</p>
                <p>Average is {data.comparison.average.energy.toLocaleString()} kWh</p>
              </TooltipContent>
            </Tooltip>
          </CardFooter>
        </Card>

        {/* Water Conserved */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Water Conserved</CardTitle>
            <Droplet className="w-5 h-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <Typography variant="h2" className="mb-2">
              {data.waterSavedLiters.toLocaleString()} L
            </Typography>
            <Progress value={waterPercentage} className="h-2" />
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help">
                  {Math.round(waterPercentage)}% of top performers
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Top performers conserve ~{data.comparison.topPercentile.water.toLocaleString()} L</p>
                <p>Average is {data.comparison.average.water.toLocaleString()} L</p>
              </TooltipContent>
            </Tooltip>
          </CardFooter>
        </Card>

        {/* Waste Reduced */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Waste Reduced</CardTitle>
            <Recycle className="w-5 h-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <Typography variant="h2" className="mb-2">
              {data.wasteReducedKg.toLocaleString()} kg
            </Typography>
            <Progress value={wastePercentage} className="h-2" />
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help">
                  {Math.round(wastePercentage)}% of top performers
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Top performers reduce ~{data.comparison.topPercentile.waste.toLocaleString()} kg</p>
                <p>Average is {data.comparison.average.waste.toLocaleString()} kg</p>
              </TooltipContent>
            </Tooltip>
          </CardFooter>
        </Card>

        {/* Carbon Offset */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Carbon Offset</CardTitle>
            <Leaf className="w-5 h-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <Typography variant="h2">
              {data.carbonOffsetKg.toLocaleString()} kg
            </Typography>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Equivalent to {Math.round(data.carbonOffsetKg / 20)} tree seedlings grown for 10 years
          </CardFooter>
        </Card>
      </div>

      {/* Charts and Comparisons */}
      <div className={`grid gap-6 ${isLargeScreen ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {/* Impact Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Your Impact Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <PieChart data={pieChartData} />
          </CardContent>
        </Card>

        {/* Fun Comparisons */}
        <Card>
          <CardHeader>
            <CardTitle>What This Means</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Zap className="w-6 h-6 mt-1 text-amber-500 flex-shrink-0" />
                <div>
                  <Typography variant="h3" className="mb-2">Energy Saved</Typography>
                  <ul className="list-disc pl-5 space-y-1">
                    {comparisons.energy.map((item, i) => (
                      <li key={i}>{item.equivalent}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Droplet className="w-6 h-6 mt-1 text-blue-500 flex-shrink-0" />
                <div>
                  <Typography variant="h3" className="mb-2">Water Conserved</Typography>
                  <ul className="list-disc pl-5 space-y-1">
                    {comparisons.water.map((item, i) => (
                      <li key={i}>{item.equivalent}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Recycle className="w-6 h-6 mt-1 text-green-500 flex-shrink-0" />
                <div>
                  <Typography variant="h3" className="mb-2">Waste Reduced</Typography>
                  <ul className="list-disc pl-5 space-y-1">
                    {comparisons.waste.map((item, i) => (
                      <li key={i}>{item.equivalent}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Your Monthly Progress</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <PieChart 
            data={{
              labels: data.monthlyTrend.labels,
              datasets: [
                {
                  label: "Energy (kWh)",
                  data: data.monthlyTrend.energy,
                  borderColor: ["rgba(234, 179, 8, 0.8)"],
                  backgroundColor: ["rgba(234, 179, 8, 0.2)"],
                },
                {
                  label: "Water (L)",
                  data: data.monthlyTrend.water,
                  borderColor: ["rgba(59, 130, 246, 0.8)"],
                  backgroundColor: ["rgba(59, 130, 246, 0.2)"],
                 
                },
                {
                  label: "Waste (kg)",
                  data: data.monthlyTrend.waste,
                  borderColor: ["rgba(22, 163, 74, 0.8)"],
                  backgroundColor: ["rgba(22, 163, 74, 0.2)"],
                },
              ],
            }} 
          />
        </CardContent>
      </Card>

      {/* Tips Section */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <CardTitle>Sustainability Tips</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Typography variant="h3" className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Energy Saving
              </Typography>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Switch to LED bulbs</li>
                <li>Unplug devices when not in use</li>
                <li>Use natural light during the day</li>
              </ul>
            </div>
            <div className="space-y-2">
              <Typography variant="h3" className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-blue-500" />
                Water Conservation
              </Typography>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Fix leaky faucets promptly</li>
                <li>Take shorter showers</li>
                <li>Install low-flow fixtures</li>
              </ul>
            </div>
            <div className="space-y-2">
              <Typography variant="h3" className="flex items-center gap-2">
                <Recycle className="w-4 h-4 text-green-500" />
                Waste Reduction
              </Typography>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Use reusable containers</li>
                <li>Compost food waste</li>
                <li>Recycle properly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}