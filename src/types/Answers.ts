export type Answers = {
    [key : string]: {
      value: string | File,
      displayValue: string,
      type: 'text' | 'file' | 'code'
    }
  }