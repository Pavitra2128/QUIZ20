import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OptionCard from './OptionCard';

interface QuestionCardProps {
  question: string;
  options: string[];
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
  onSelectOption: (option: string) => void;
  selectedOption: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  currentIndex,
  totalQuestions,
  onNext,
  onPrevious,
  onSelectOption,
  selectedOption
}) => {
  console.log("Rendering QuestionCard with options:", options);

  return (
    <Card className="mb-4 p-4 flex-grow border-4 border-blue-500">
      <CardHeader className="text-xl lg:text-2xl font-bold">Question {currentIndex + 1}</CardHeader>
      <CardContent>
        <h2 className="text-lg lg:text-xl font-semibold mb-4">{question}</h2>
        <div>
          {options.map((option, index) => (
            <OptionCard
              key={index}
              option={option}
              selectedOption={selectedOption}
              onSelect={onSelectOption}
            />
          ))}
        </div>
        <div className="flex justify-between mt-4">
          {currentIndex > 0 && (
            <Button variant="outline" onClick={onPrevious}>Previous</Button>
          )}
          {currentIndex < totalQuestions - 1 && (
            <Button onClick={onNext}>Next</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
