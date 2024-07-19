import React, { useState } from 'react';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { Button } from './Button';
import { Input } from './Input';
import {Answers} from '../types/Answers';
import {Question} from '../types/Question';

type Props = {
  handleBack: Function,
  questions: Question[],
  startIndex: number,
  setResult: Function,
  result: Answers,
  handleFinished: Function
}

export function ConversationalForm({handleBack: handleBackProp, startIndex = 0, questions, result, setResult, handleFinished}: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(startIndex);
  const [previousQuestionIndex, setPreviousQuestionIndex] = useState(0);
  var resultCopy = {...result}
  delete resultCopy.coverImage
  const [answers, setAnswers] = useState<Answers>(resultCopy)

  const handleNext = (e) => {
    e.preventDefault();
    if (currentQuestionIndex < questions.length - 1) {
      setPreviousQuestionIndex(currentQuestionIndex);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setResult((result) => ({...result, ...answers}))
      handleFinished()
    }
  };

  const handleBack = () => {
    if(currentQuestionIndex === 0){
      handleBackProp()
    }
    if (currentQuestionIndex > 0) {
      setPreviousQuestionIndex(currentQuestionIndex);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  const handleFileChange = (e) => {
    const { name, value, files } = e.target;
    setAnswers({
      ...answers,
      [name]: {
        value: files[0],
        displayValue: value,
        type: 'file'
      },
    });
  };


  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setAnswers({
      ...answers,
      [name]: {
        value: value,
        displayValue: value,
        type: 'text'
      },
    });
  };

  const animationClass = currentQuestionIndex > previousQuestionIndex ? 'slide-up-animation' : 'slide-down-animation';
  const currentQuestion = questions[currentQuestionIndex];
  const isLastStep = currentQuestionIndex + 1 === questions.length;

  return (
    <form onSubmit={handleNext} className={`flex gap-2 items-start ${animationClass}`}>
      <Button variant='icon' onClick={handleBack}>
        <ArrowLeftIcon />
      </Button>
      <div key={currentQuestionIndex} className='flex flex-col gap-4 mt-1.5'>
        <Input 
          type={currentQuestion.type}
          label={currentQuestion.label}
          name={currentQuestion.name}
          onChange={currentQuestion.type === 'file'? handleFileChange : handleTextChange}
          value={answers[currentQuestion.name]?.displayValue}
          autoFocus
        />
        <div className='flex gap-2 items-center'>
          <Button type="submit" className={`${isLastStep && 'w-full'}`}>
            OK
          </Button>
          {!isLastStep && <p>press Enter</p>}
        </div>
      </div>
    </form>
  );
}