import React, { useEffect, useState } from 'react';
import { Text } from '../components/Text';
import { Page } from '../components/Page';
import { Button } from '../components/Button';
import { ConversationalForm} from '../components/ConversationalForm';
import {Answers} from '../types/Answers';
import {Question} from '../types/Question';
import CodeEditor from '../components/CodeEditor';
import { PreviewCollectionSettings } from '../components/PreviewCollectionSettings';

const questions : Question[] = [
  { id: 1, name: 'collectionName', label: "How will you name your collection?", type: 'text' },
  { id: 2, name: 'symbolName', label: "Set a name for your symbol", type: 'text' },
  { id: 3, name: 'description', label: "Write an interesting description", type: 'text' },
  { id: 4, name: 'mintCost', label: "How much will each mint cost?", type: 'text' },
  { id: 5, name: 'externalUrl', label: "What is your project URL?", type: 'text' },
  { id: 6, name: 'coverImage', label: "Upload an image for your collection cover", type: 'file' },
];

export function CreateCollectionPage() {
  const [showStage, setShowStage] = useState(0)
  const [result, setResult] = useState<Answers>({});
  const [startQuestionIndex, setStartQuestionIndex] = useState(0)
  return (
    <Page itemsStart={showStage === 0} scrollable={showStage === 2}>
            {showStage === 0 && (
              <>
                <div className='flex justify-between w-full p-5'>
                  <h1 className="text-3xl ml-4">
                    Create your collection
                  </h1>
                  <Button onClick={() => {
                    setShowStage(prevShowStage => prevShowStage+1)
                    setStartQuestionIndex(0)
                    }}>
                    Continue
                  </Button>
                </div>
                <CodeEditor onChange={setResult}/>
              </>
            )}
            {showStage === 1 && (
              <div className='grow flex flex-row items-center'>
              <ConversationalForm result={result} startIndex={startQuestionIndex} handleBack={() => setShowStage(prevShowForm => prevShowForm-1)} questions={questions} setResult={setResult} handleFinished={() => setShowStage(prevShowForm => prevShowForm+1)}/>
              </div>
            )}
            {showStage === 2 && (
              <PreviewCollectionSettings handleBack={() => {
                setShowStage(prevShowForm => prevShowForm-1)
                setStartQuestionIndex(5)
              }} settings={result}/>
            )}
    </Page>
  );
}