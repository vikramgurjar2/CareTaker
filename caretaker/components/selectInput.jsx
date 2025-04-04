import { cn } from "@/lib/utils";

export const SelectInput = ({ title, onChange, options, className, selectedValue }) => {
  return (
    <select
      className={cn("px-6 py-4 cursor-pointer text-gray-400 ",{ "text-black":selectedValue }, className)}
      defaultValue=""
      name=""
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled >
        {title}
      </option>
      {options.map((option) => (
        <option className="text-gray-800" value={option.id} key={option.id}>
          {option.displayName}
        </option>
      ))}
    </select>
  );
};
