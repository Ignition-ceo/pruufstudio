import { cn } from "@/lib/utils";

interface SegmentedControlProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export const SegmentedControl = ({ options, value, onChange }: SegmentedControlProps) => {
  return (
    <div className="inline-flex bg-white/95 backdrop-blur-sm rounded-full p-1.5 gap-1 shadow-lg">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "px-6 py-3 rounded-full text-sm font-medium transition-all duration-200",
            value === option.value
              ? "bg-white text-pruuf-blue shadow-md"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
