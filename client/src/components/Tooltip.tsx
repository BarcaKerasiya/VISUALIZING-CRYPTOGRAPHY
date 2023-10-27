import { Tooltip, Typography } from "@material-tailwind/react";
import { LightBulbIcon } from "@heroicons/react/24/solid";

const TooltipFn = () => {
  return (
    <Tooltip
      placement="bottom"
      className="cursor-pointer border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
      content={
        <div className="w-80">
          <Typography color="blue-gray" className="font-medium">
            Prime Number
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal opacity-80"
          >
            A whole number greater than 1 that cannot be exactly divided by any
            whole number other than itself and 1 (e.g. 2, 3, 5, 7, 11).
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
