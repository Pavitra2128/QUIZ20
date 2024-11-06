import React from 'react';
import { Card } from "@/components/ui/card";

interface OptionCardProps {
  option: string;
  selectedOption: string;
  onSelect: (option: string) => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, selectedOption, onSelect }) => {
  // Simply pass the option as is, no need to split
  const handleClick = () => {
    onSelect(option); // Pass the option text directly
  };

  return (
    <Card
      className={`p-4 cursor-pointer transition-all duration-300 
        ${selectedOption === option ? 'bg-blue-500 text-white transform scale-105 shadow-lg' : 'bg-gray-300 text-gray-800 transform scale-100'}`}
      onClick={handleClick}
    >
      {option}
    </Card>
  );
};

export default OptionCard;
