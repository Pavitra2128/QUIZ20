"use client";
import React, { useEffect, useState, useRef } from 'react';
import QuestionCard from '@/components/QuestionCard';
import Sidebar from '@/components/Sidebar';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Question {
  id: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOption: string;
  topicid: number;
}

const App = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});
  const [attempted, setAttempted] = useState<boolean[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0); // Start with 0 seconds (timer will be started when restarted)
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Ref to store the timer ID
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log("Fetching questions from API");
    fetch(`/api/questions?topicid=1`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setAttempted(new Array(data.length).fill(false));
      })
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  useEffect(() => {
    if (hasStarted && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      handleFinish(); // Automatically finish the quiz when time is up
    }

    return () => {
      // Clear the timer on component unmount or when the quiz ends
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [hasStarted, timeLeft]);

  const handleNextQuestion = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handlePreviousQuestion = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleFinish = () => {
    // Stop the timer when the quiz is finished
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setHasStarted(false)

    // Set timer to 1 minute (60 seconds)
    setTimeLeft(60);
    const score = questions.reduce((acc, question, index) => {
      if (question.correctOption === selectedOptions[question.id]) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setScore(score);
    console.log("Quiz finished with score:", score);
  };

  const handleSelectOption = (option: string) => {
    const questionId = questions[currentIndex].id;
    const selectedOption = option.split(',')[0];
    const newSelectedOptions = { ...selectedOptions, [questionId]: selectedOption };
    setSelectedOptions(newSelectedOptions);
    const newAttempted = [...attempted];
    newAttempted[currentIndex] = true;
    setAttempted(newAttempted);
    console.log("Selected option updated:", newSelectedOptions);
  };

  const handleStartQuiz = () => {
    setHasStarted(true);
    console.log("Quiz started");
    setTimeLeft(60); // Start with 1-minute timer when quiz starts
  };

  const handleRestart = () => {
    setHasStarted(true);
    setScore(null);
    setSelectedOptions({});
    setAttempted(new Array(questions.length).fill(false));
    setTimeLeft(60); // Set the timer to 1 minute
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-blue-500 relative">
      <div className="lg:w-2/3 w-full flex flex-col items-center">
        <Card className="w-full mb-4 p-4 text-center">
          <h1 className="text-xl font-bold">Quiz App</h1>
          {hasStarted && <div>{Math.floor(timeLeft / 60)}:{timeLeft % 60}</div>}
        </Card>
        <div className="flex flex-col lg:flex-row w-full h-full">
          {score === null ? (
            <>
              <div className="flex-1 flex flex-col bg-white p-4 rounded-md shadow-lg">
                {hasStarted ? (
                  questions.length > 0 ? (
                    <QuestionCard
                      question={questions[currentIndex].question}
                      options={[ 
                        `${questions[currentIndex].option1}`,
                        `${questions[currentIndex].option2}`,
                        `${questions[currentIndex].option3}`,
                        `${questions[currentIndex].option4}`
                      ]}
                      currentIndex={currentIndex}
                      totalQuestions={questions.length}
                      onNext={handleNextQuestion}
                      onPrevious={handlePreviousQuestion}
                      onSelectOption={handleSelectOption}
                      selectedOption={selectedOptions[questions[currentIndex].id] || ''}
                    />
                  ) : (
                    <p>Loading questions...</p>
                  )
                ) : (
                  <Button onClick={handleStartQuiz}>Start Quiz</Button>
                )}
              </div>
              <Sidebar
                questions={questions}
                currentIndex={currentIndex}
                onChangeIndex={setCurrentIndex}
                attempted={attempted}
                selectedOptions={selectedOptions}
                onFinish={handleFinish}
              />
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center">
              <Card className="w-full p-6 text-center">
                <h2 className="text-2xl font-bold">Quiz Finished</h2>
                <p className="text-lg mt-4">Your Score: {score} / {questions.length}</p>
                <Button onClick={handleRestart}>Restart Quiz</Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
