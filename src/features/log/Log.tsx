import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CircleAlert, Info, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import LogCard from "@/components/logcontainer/LogContainer";
import {
  getFilteredLogs,
  period_choice,
  severity_choice,
} from "./api/get-filtered-logs";
import { CustomTooltipProps } from "@/types/customtooltipcount";
import { useToken } from "@/hooks/useToken";
import { getLogDetails } from "./api/get-log-details";
import { getFilteredCount } from "./api/get-filtered-count";
import { LogData } from "@/types/logs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const { interval, count } = payload[0].payload;
    return (
      <div className="text-xs custom-tooltip p-4 border shadow bg-white dark:bg-white dark:text-black rounded">
        <p>{new Date(interval).toString()}</p>
        <p className="text-[#8884d8]">Entries: {count}</p>
      </div>
    );
  }

  return null;
};

interface LogStream {
  logStreamName: string;
}

interface LogGroup {
  logGroupName: string;
  logStreams: LogStream[];
}
interface Payload {
  value: string | number;
}
const CustomXAxisTick = ({
  x,
  y,
  payload,
}: {
  x?: number;
  y?: number;
  payload?: Payload;
}) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-45)"
      >
        {payload?.value}
      </text>
    </g>
  );
};

const LogPage = () => {
  const [data, setData] = useState<LogData[]>([]);
  const [logGroupDetails, setLogGroupDetails] = useState<LogGroup[]>([]);
  const [severity, setSeverity] = useState<severity_choice | "">("");
  const [period, setPeriod] = useState<period_choice | "">("");
  const [groupstream, setGroupStream] = useState("");
  const [logStreamName, setLogStreamName] = useState("");
  const [logGroupName, setLogGroupName] = useState("");
  const { token } = useToken();
  const [filteredCountData, setFilteredCountData] = useState([]);
  const [previousPage, setPreviousPage] = useState<string>("");
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

  const previousPageHandler = () => {
    if (previousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPageHandler = () => {
    if (nextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(totalCount / 10);
    const pages = [];

    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={currentPage === i}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return pages;
  };

  const handlePeriod = (value: period_choice | "") => {
    setPeriod(value);
  };

  const handleSeverity = (value: severity_choice | "") => {
    setSeverity(value);
  };

  const handleGroupChange = (value: string) => {
    setGroupStream(value);
  };

  useEffect(() => {
    if (groupstream) {
      const [group, stream] = groupstream.split(":");
      setLogGroupName(group || "");
      setLogStreamName(stream || "");
    }
    const getAll = async () => {
      setLogGroupDetails(await getLogDetails(token));

      const logsResponse = await getFilteredLogs({
        period: period,
        security_info: severity,
        logGroupName: logGroupName,
        logStreamName: logStreamName,
        pageCount: currentPage,
        token,
      });

      console.log("logs response: ", logsResponse);
      setData(logsResponse.data.results);
      setTotalCount(logsResponse.data.count);
      setNextPage(logsResponse.data.next);
      setPreviousPage(logsResponse.data.previous);

      setFilteredCountData(
        await getFilteredCount({
          interval_type: period,
          security_info: severity,
          logGroupName: logGroupName,
          logStreamName: logStreamName,
          token,
        }),
      );
    };
    getAll();
  }, [
    groupstream,
    logGroupName,
    logStreamName,
    period,
    severity,
    token,
    currentPage,
  ]);
  console.log("filtered data: ", filteredCountData);
  console.log("data: ", data);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex ">
        <Label>Log Explorer</Label>
      </div>

      <Separator className="mt-2" />

      <div className="flex gap-2 justify-end flex-wrap">
        <Select onValueChange={handlePeriod}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="last_hour">Last hour</SelectItem>
              <SelectItem value="last_day">Last day</SelectItem>
              <SelectItem value="last_week">Last week</SelectItem>
              <SelectItem value="last_month">Last month</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={handleSeverity}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="INFO">
                <div className="flex justify-center items-center gap-2">
                  <Info className="w-4 h-4 text-gray-700" />
                  Info
                </div>
              </SelectItem>
              <SelectItem value="WARN">
                <div className="flex justify-center items-center gap-2">
                  <CircleAlert className="w-4 h-4 text-yellow-700" />
                  Warning
                </div>
              </SelectItem>
              <SelectItem value="ERROR">
                <div className="flex justify-center items-center gap-2">
                  <TriangleAlert className="w-4 h-4 text-red-700" />
                  Error
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={handleGroupChange}>
          <SelectTrigger className="w-max">
            <SelectValue placeholder="Log Groups" />
          </SelectTrigger>
          <SelectContent>
            {logGroupDetails &&
              logGroupDetails.map((data, index) => (
                <SelectGroup className="text-sm font-light" key={index}>
                  <SelectLabel>{data?.logGroupName}</SelectLabel>
                  {data?.logStreams.map((value) => (
                    <SelectItem
                      key={value.logStreamName}
                      value={`${data?.logGroupName}:${value.logStreamName}`}
                    >
                      {value.logStreamName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col mt-2 border rounded p-2">
        <Label className="text-sm font-normal opacity-75">
          Displaying logs count
        </Label>
        <div className="w-full h-56 my-4">
          <ResponsiveContainer>
            <BarChart
              data={
                period === "last_hour" || period === "last_day"
                  ? filteredCountData.slice(0)
                  : filteredCountData
              }
              margin={{
                top: 20,
                right: 0,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={(data) => {
                  if (period === "last_week") {
                    return `${new Date(data.interval).getDate()}`
                  } else if (period === "last_hour") {
                    return `${new Date(data.interval).getMinutes()}-${
                      (new Date(data.interval).getMinutes() + 5) % 60
                    }`;
                  } else if (period === "last_day") {
                    return `${new Date(data.interval).getHours()}-${
                      new Date(data.interval).getHours() + 1
                    }`;
                  } else if (period === "last_month") {
                    return `${new Date(data.interval).getDate()}`
                  } else {
                    return `${new Date(data.interval).getDate()}
                    `;
                  }
                }}
                interval="preserveStartEnd"
                angle={-75}
                textAnchor="end"
                height={70}
                tick={<CustomXAxisTick />}
              />
              <YAxis />
              <Tooltip
                content={
                  <CustomTooltip active={undefined} payload={undefined} />
                }
              />
              <Legend />
              <Bar
                barSize={40}
                legendType="circle"
                dataKey="count"
                fill="#8884d8"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <Label>Logs</Label>
        <Separator className="mt-2" />
        <div className="flex flex-col gap-2">
          {data && data.length > 0 ? (
            data.map((item) => <LogCard key={item.id} data={item} />)
          ) : (
            <div className="w-full h-56 my-4 flex items-center justify-center">
              No data to show
            </div>
          )}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={cn(
                    previousPage ? "" : "pointer-events-none opacity-20",
                  )}
                  onClick={previousPageHandler}
                />
              </PaginationItem>
              {renderPageNumbers()}
              <PaginationItem>
                <PaginationEllipsis className="opacity-50" />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className={cn(
                    nextPage ? "" : "pointer-events-none opacity-20",
                  )}
                  onClick={nextPageHandler}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default LogPage;
