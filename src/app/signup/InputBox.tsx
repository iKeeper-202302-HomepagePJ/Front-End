import React from 'react';

interface InputBoxProps {
  label: string;
  value: string;
  error: boolean;
  errorMessage?: string; // 추가: 에러 메시지를 전달하기 위한 prop
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({ label, value, error, errorMessage, onChange, placeholder, required }) => {
  return (
    <div className="flex items-center mb-4">
      <label htmlFor={label} className="mr-4 w-48">{label}{required && <span className="text-red"> *</span>}</label>
      <input 
        type="text" 
        id={label} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className={`bg-blue border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 px-2 py-1 cursor-pointer ${error ? 'border-red-500' : ''} mr-4`}
        style={{ fontSize: "16px", width: "449px", height: "40px" }}
      />
      {error && <span className="text-red">{errorMessage || '필수 항목입니다.'}</span>}
    </div>
  );
};

export default InputBox;
