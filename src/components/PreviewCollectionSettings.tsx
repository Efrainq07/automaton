import React, { useState } from "react";
import { Answers } from "../types/Answers";
import { Question } from "../types/Question";
import { Button } from "./Button";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";

type Props = {
  settings: Answers;
  handleBack: Function;
};

export function PreviewCollectionSettings({
  settings,
  handleBack
}: Props) {

  const [display, setDisplay] = useState('Generative Content')
  return (
    <div className="container py-8 px-6 md:px-12 xl:px-22 flex flex-col gap-6">
      <div className="flex">
        <Button variant="icon" onClick={(e)=>{handleBack()}}>
          <ArrowLeftIcon/>
        </Button>
        <h1>Preview Your Collection</h1>
      </div>
      <div className="flex flex-row-reverse gap-4 flex-wrap justify-center">
      <div className="flex flex-col gap-4 grow min-w-[300px]">
          <div className="text-xl">
            <span className="text-slate-500 font-medium">Symbol:</span>
            <div className="text-slate-100 border-cyan-300 border-b-[2px]">
              {settings.symbolName.displayValue}
            </div>
          </div>
          <div className="text-xl">
            <span className="text-slate-500 font-medium">Name:</span>
            <div className="text-slate-100 border-cyan-300 border-b-[2px]">
              {settings.collectionName.displayValue}
            </div>
          </div>
          <div className="mt-2 text-xl">
            <span className="text-slate-500 font-medium">Description:</span>
            <div className="text-slate-100 border-cyan-300 border-b-[2px]">
              {settings.description.displayValue}
            </div>
          </div>
          <div className="mt-2 text-xl">
            <span className="text-slate-500 font-medium">Project URL:</span>
            <div className="text-slate-100 border-cyan-300 border-b-[2px]">
              {settings.externalUrl.displayValue}
            </div>
          </div>
          <div className="flex flex-col gap-6 px-6 py-6 bg-gray-950/70 rounded-lg w-full">
            <div className="flex flex-col">
              <p className="text-slate-500 font-medium">Mint cost</p>
              <div className="flex gap-2 items-baseline border-cyan-300 border-b-[2px]">
                <p className="text-3xl font-medium">
                  {settings.mintCost.displayValue}
                </p>
                <p className="text-2xl font-medium text-gray-300">ETH</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="w-full flex  justify-around py-2">
              <div className={`text-center rounded-md border-b-[2px] px-4 text-xl   ${(display === "Generative Content")? 'cursor-default font-bold bg-gray-50 bg-opacity-40 border-cyan-300' : 'hover:bg-gray-50 hover:bg-opacity-20 cursor-pointer'}`} onClick={()=>{setDisplay('Generative Content')}}>
                Generative Content
              </div>
              <div className={`text-center rounded-md border-b-[2px] px-4 text-xl ${(display === "Fallback Content")? 'cursor-default font-bold bg-gray-50 bg-opacity-40 border-cyan-300' : 'hover:bg-gray-50 hover:bg-opacity-20 cursor-pointer' }`} onClick={()=>{setDisplay('Fallback Content')}}>
                Fallback Content
              </div>
            </div>
            { display === 'Generative Content' && 
            <iframe
              srcDoc={settings.code.value as string}
              className="w-[450px] aspect-square object-cover rounded-md"
            />
            }
            { display === 'Fallback Content' && 
            <img
              src={URL.createObjectURL(settings.coverImage.value as File)}
              className="max-w-[450px] aspect-square object-cover rounded-md"
            />
            }
          </div>
          <Button className="mt-4 w-full text-xl">Generate Collection</Button>
        </div>
      </div>
    </div>
  );
}
