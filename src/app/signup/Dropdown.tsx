// Dropdown.tsx

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Axios를 사용하여 서버 API 호출

interface DropdownProps {
  label: string;
  options: string[]; // options 속성 추가
  onSelect: (selectedOption: string) => void;
  placeholder: string;
  required?: boolean;
  error?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ label, onSelect, placeholder, required, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState<string[]>([]); // 서버에서 받아온 옵션 데이터

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchOptions = async (endpoint : string) => {
    try {
      // 서버 API 호출하여 데이터 가져오기
      const response = await axios.get(endpoint); // 예시: '/api/options'는 서버의 API 엔드포인트 경로
      setOptions(response.data); // 가져온 데이터를 상태에 설정
    } catch (error) {
      console.error('Failed to fetch options:', error);
    }
  };
  
  useEffect(() => {
    fetchOptions('/api/majors'); // 주전공 데이터 가져오기
  }, []);
  
  useEffect(() => {
    fetchOptions('/api/status'); // 재적 상태 데이터 가져오기
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
        <input
          ref={inputRef}
          type="text"
          readOnly
          value={selectedOption || ''}
          placeholder={placeholder}
          className={`bg-blue border-gray text-base rounded-md px-2 py-1 cursor-pointer ${error ? 'border-red-500' : ''} w-[440px] h-10 {isOpen ? 'z-10' : 'z-1'}`}
          onClick={handleInputClick}
        />
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
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
