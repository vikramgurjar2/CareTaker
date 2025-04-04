import { cn } from "@/lib/utils"; // Importing the 'cn' utility function from utils

// Heading component that takes in the specified props
const Heading = ({
  title,
  description,
  icon: Icon, // Destructure 'icon' prop as 'Icon' for better readability
  iconColor, // Destructure 'iconColor' prop
  bgColor, // Destructure 'bgColor' prop
}) => {
  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8 mt-8">
      {/* Container div */}
      {/* Div for the icon with optional background color */}
      <div className={cn("p-2 w-fit rounded-md", bgColor)}>
        {/* Render the icon component with optional icon color */}
        <Icon className={cn("w-10 h-10", iconColor)} />
      </div>
      {/* Div for the heading text */}
      <div>
        <h2 className="text-3xl font-bold">{title}</h2> {/* Render the title */}
        <p className="text-sm text-muted-foreground">{description}</p>{" "}
        {/* Render the description */}
      </div>
    </div>
  );
};

export default Heading; // Export the Heading component
