// InputBox.tsx
import React from 'react';

interface InputBoxProps {
  label: string;
  value: string;
  error: boolean;
  errorMessage?: string; // 추가: 에러 메시지를 전달하기 위한 prop
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  type?: string; // 추가: input 타입을 설정하기 위한 prop
}

const InputBox: React.FC<InputBoxProps> = ({ label, value, error, errorMessage, onChange, placeholder, required, type = 'text' }) => {
  return (
    <div className="flex items-center mb-4">
      <label htmlFor={label} className="mr-4 w-48">{label}{required && <span className="text-red"> *</span>}</label>
      <input 
        type={type} // input 타입을 설정합니다.
        id={label} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className={`bg-blue border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-base px-2 py-1 cursor-pointer ${error ? 'border-red-500' : ''} mr-4 w-[440px] h-10`}
      />
      {error && <span className="text-red">{errorMessage || '필수 항목입니다.'}</span>}
    </div>
  );
};

export default InputBox;
