import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  questions: { id: number; question: string; option1: string; option2: string; option3: string; option4: string }[];
  currentIndex: number;
  onChangeIndex: (index: number) => void;
  attempted: boolean[];
  selectedOptions: { [key: number]: string };
  onFinish: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ questions, currentIndex, onChangeIndex, attempted, selectedOptions, onFinish }) => {
  const handleFinishClick = () => {
    if (confirm('Do you really want to finish?')) {
      onFinish();
    }
  };

  return (
    <Card className="w-full lg:w-1/3 h-full p-4 flex flex-col items-center">
      <CardContent className="flex flex-wrap items-center mb-4">
        {questions.map((_, index) => {
          let bgColor = 'bg-gray-300';
          if (index === currentIndex) {
            bgColor = 'bg-red-500 text-white';
          } else if (attempted[index]) {
            bgColor = selectedOptions[questions[index].id] ? 'bg-blue-500 text-white' : 'bg-gray-300';
          }

          return (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center m-1 cursor-pointer ${bgColor}`}
              onClick={() => onChangeIndex(index)}
            >
              {index + 1}
            </div>
          );
        })}
      </CardContent>
      <Button onClick={handleFinishClick} className="mt-auto">Finish</Button>
    </Card>
  );
};

export default Sidebar;
