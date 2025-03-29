"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { countMoviesByGenre } from "@/utils/seenAPI";
import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";

const chartConfig = {
  watched: {
    label: "Watched",
  },
  drama: {
    label: "Drama",
  },
  comedy: {
    label: "Comedy",
  },
  action: {
    label: "Action",
  },
  adventure: {
    label: "Adventure",
  },
  horror: {
    label: "Horror",
  },
};

export default function GenresChart() {
  const [genresMap, setGenresMap] = useState([]);
  const [totalWatched, setTotalWatched] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const genresMap = await countMoviesByGenre();
      setGenresMap(genresMap);
      // const totalWatched = await getSeenMoviesCount();
      // setTotalWatched(totalWatched);
    };

    fetchData();
  }, []);

  return (
    <Card className="flex flex-col bg-gradient-to-tl from-blue-400/50 to-blue-300/25">
      <CardHeader className="items-center">
        <CardTitle className="text-center">Genres Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={genresMap}
              dataKey="moviesWatched"
              nameKey="genre"
              innerRadius={40}
            >
              {/* <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        ></tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Movies Watched
                        </tspan>
                      </text>
                    );
                  }
                }}
              /> */}
            </Pie>
            <ChartLegend
              content={({ payload }) => (
                <div className="flex flex-wrap gap-2">
                  {payload?.map((entry, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div
                        className="h-3 w-3 rounded-xs"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm">{entry.value}</span>
                    </div>
                  ))}
                </div>
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
