import { useEffect, useState } from "react";
import React from "react";
import { staticTemplate } from "../constants/StaticTemplate";
import CodeEditorTextArea from "@uiw/react-textarea-code-editor";

type Props = {
  onChange: Function;
};

export const CodeEditor = ({ onChange }: Props) => {
  const [code, setCode] = useState(staticTemplate);

  useEffect(() => {
    var initialCode: string =
      localStorage.getItem("savedCode") || "";
    if (initialCode === ""){
        initialCode = staticTemplate
    }
    setCode(initialCode)
    onChange((result) => ({
      ...result,
      code: {
        type: "code",
        value: initialCode,
        displayValue: initialCode,
      },
    }));
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setCode(value);
    onChange((answers) => {
      answers["code"] = {
        type: "code",
        value: value,
        displayValue: value,
      };
      return answers;
    });
    localStorage.setItem("savedCode", value);
  };

  return (
    <div className="flex justify-between w-full grow min-h-0">
      <div className="w-1/2 overflow-scroll">
        <CodeEditorTextArea
          language="js"
          value={code}
          onChange={handleInputChange}
          className="w-full min-h-full font-mono text-sm"
        />
      </div>
      <div className="h-full w-1/2 bg-gray-200">
        <div className="max-h-full aspect-square ml-auto mb-auto">
          <iframe srcDoc={code} className="h-full w-full"></iframe>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
