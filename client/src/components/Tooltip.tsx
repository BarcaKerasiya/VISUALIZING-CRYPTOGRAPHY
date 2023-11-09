import { Tooltip, Typography } from "@material-tailwind/react";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import React from "react";

type toolTipProps = {
  title: string;
  content: string;
};
const TooltipFn: React.FC<toolTipProps> = ({
  title,
  content,
}: toolTipProps) => {
  return (
    <Tooltip
      placement="bottom"
      className="cursor-pointer border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
      content={
        <div className="w-80">
          <Typography color="blue-gray" className="font-medium">
            {title}
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-80"
          >
            {content}
          </Typography>
        </div>
      }
    >
      <LightBulbIcon
        className="h-5 w-5 flex-none text-green-400"
        aria-hidden="true"
      />
    </Tooltip>
  );
};

export default TooltipFn;
