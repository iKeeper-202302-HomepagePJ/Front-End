import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
  placeholder: string;
  required?: boolean;
  error?: boolean; // 오류 상태를 추가합니다.
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onSelect, placeholder, required, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const inputRect = inputRef.current ? inputRef.current.getBoundingClientRect() : null;
  let dropdownStyle: React.CSSProperties = {};

  if (inputRect) {
    const dropdownWidth = 449; // 드롭다운의 예상 폭
    dropdownStyle = {
        top: 40, // 입력 상자 바로 아래에 위치
        left: dropdownWidth / 2 - 18, // 입력 상자 중앙에 드롭다운 배치
    };
  }

  return (
    <div className="relative mb-4">
      <div className="flex items-center relative">
        <label htmlFor={label} className="mr-4 w-48 block" style={{ whiteSpace: 'nowrap' }}>
          {label}
          {required && <span className="text-red"> *</span>}
        </label>
        <input
          ref={inputRef}
          type="text"
          readOnly
          value={selectedOption || ''}
          placeholder={placeholder}
          className={`bg-blue w-full border-gray rounded-md px-2 py-1 cursor-pointer ${error ? 'border-red-500' : ''}`}
          onClick={handleInputClick}
          style={{ zIndex: isOpen ? 10 : 1, fontSize: '16px', width: '449px', height: '40px' }}
        />
        {error && <span className="text-red ml-4">{label}를 선택해주세요.</span>}
      </div>
      {isOpen && (
        <div
          className="absolute border border-gray bg-blue rounded-md shadow-md"
          style={{
            ...dropdownStyle,
            zIndex: 10,
            width: '451px',
            fontSize: '16px',
          }}
          ref={dropdownRef}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
