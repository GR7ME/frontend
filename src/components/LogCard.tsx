import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import WarningMessage from "./LogDesc";
import { Severity } from "@/types/Log-type";

const bordercolor: Record<Severity, string> = {
  warn: "border-yellow-400",
  error: "border-red-700",
  info: "border-green-700",
};

const LogCard = ({ data }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [severity, setSeverity] = useState<Severity>(() =>
    data["message"].match(/[A-Z]+/)[0].toLowerCase()
  );

  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  const onClicked = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    if (isClicked) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isClicked]);

  return (
    <div
      className={cn(
        "border-l-4",
        bordercolor[severity],
        "flex flex-col w-full max-w-full h-max p-2 text-black gap-2 dark:text-white cursor-pointer text-sm transition-all duration-300"
      )}
      onClick={onClicked}
    >
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-1">
          {isClicked ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
          <span className="truncate">{data.timestamp}</span>
        </div>
        <div className="flex-grow md:truncate w-64">{data.message}</div>
      </div>
      <div
        ref={contentRef}
        className={cn(
          "overflow-hidden transition-max-height duration-300 ease-in-out",
          isClicked ? "max-h-[500px]" : "max-h-0"
        )}
        style={{ maxHeight }}
      >
        <WarningMessage severity={severity} jsonData={data} />
      </div>
    </div>
  );
};

export default LogCard;
