// Dropdown.tsx

import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  label: string;
  options: string[]; // options 속성 추가
  onSelect: (selectedOption: string) => void;
  placeholder: string;
  required?: boolean;
  error?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onSelect, placeholder, required, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClearClick = () => {
    onSelect(''); // 선택 취소
    setSelectedOption('');
    setIsOpen(false);
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const inputRect = inputRef.current ? inputRef.current.getBoundingClientRect() : null;
  let dropdownStyle: React.CSSProperties = {};

  if (inputRect) {
    const dropdownWidth = 449;
    dropdownStyle = {
      top: 40,
      left: dropdownWidth / 2 - 18,
    };
  }

  return (
    <div className="relative mb-4">
      <div className="flex items-center relative">
        <label htmlFor={label} className="mr-4 w-48 block" style={{ whiteSpace: 'nowrap' }}>
          {label}
          {required && <span className="text-red"> *</span>}
        </label>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            readOnly
            value={(required) ? (selectedOption || '') : '없음'}
            placeholder={placeholder}
            className={`bg-blue border-gray text-base rounded-md px-2 py-1 cursor-pointer ${error ? 'border-red-500' : ''} w-[440px] h-10 {isOpen ? 'z-10' : 'z-1'}`}
            onClick={handleInputClick}
          />
          {selectedOption && ( // 선택된 옵션이 있을 때만 Clear 버튼 표시
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red"
              onClick={handleClearClick}
            >
              X
            </button>
          )}
        </div>
        {error && <span className="text-red ml-4">{label}를 선택해주세요.</span>}
      </div>
      {isOpen && (
        <div
          className="absolute border border-gray text-base bg-blue rounded-md shadow-md w-[440px] z-10 "
          style={{
            ...dropdownStyle,
          }}
          ref={dropdownRef}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              {option === '' ? '없음' : option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
