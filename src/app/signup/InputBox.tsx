// InputBox.tsx
import React from 'react';

interface InputBoxProps {
  label: string;
  value: string;
  error: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputBox: React.FC<InputBoxProps> = ({ label, value, error, onChange, placeholder }) => {
  return (
    <div className="flex items-center mb-4">
      <label htmlFor={label} className="mr-4">{label}</label>
      <input 
        type="text" 
        id={label} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className={`bg-blue border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${error ? 'border-red-500' : ''} mr-4 px-2 py-1`}
        style={{ fontSize: "16px", width: "449px"}}
      />
      {error && <span className="text-red">필수 항목입니다.</span>}
    </div>
  );
};

export default InputBox;
