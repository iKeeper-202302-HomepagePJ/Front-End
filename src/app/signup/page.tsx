
// SignupPage.tsx
"use client";
import React, { useState } from 'react';
import InputBox from './InputBox';
import Dropdown from './Dropdown';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    emailVerificationCode: '',
    birthday: '',
    field: '',
    status: '',
    grade: '',
    password: '',
    passwordConfirm: '',
    studentId: '',
    department: '',
    minor: '',
    doubleMajor1: '',
    doubleMajor2: ''
  });

  const [errors, setErrors] = useState({
    name: { isError: false, message: '' },
    contact: { isError: false, message: '' },
    email: { isError: false, message: '' },
    emailVerificationCode: { isError: false, message: '' },
    birthday: { isError: false, message: '' },
    field: { isError: false, message: '' },
    status: { isError: false, message: '' },
    grade: { isError: false, message: '' },
    password: { isError: false, message: '' },
    passwordConfirm: { isError: false, message: '' },
    studentId: { isError: false, message: '' },
    department: { isError: false, message: '' },
    global: { isError: false, message: '' }
    // 나머지 필수 입력 항목 추가
  });

  const handleDropdownChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [key]: { isError: false, message: '' } });
  };

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [key]: { isError: false, message: '' } });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let formErrors = { ...errors };
    let isFormValid = true;

    // 필수 입력 항목 검사
    if (!formData.name.trim()) {
      formErrors.name = { isError: true, message: '이름을 입력해주세요.' };
    }
    if (!formData.contact.trim()) {
      formErrors.contact = { isError: true, message: '연락처를 입력해주세요.' };
    }
    if (!formData.email.trim()) {
      formErrors.email = { isError: true, message: '이메일을 입력해주세요.' };
    }
    if (!formData.emailVerificationCode.trim()) {
      formErrors.emailVerificationCode = { isError: true, message: '이메일 인증번호를 입력해주세요.' };
    }
    if (!formData.birthday.trim()) {
      formErrors.birthday = { isError: true, message: '생일을 입력해주세요.' };
    }
    if (!formData.password.trim()) {
      formErrors.password = { isError: true, message: '비밀번호를 입력해주세요.' };
    }
    if (!formData.passwordConfirm.trim()) {
      formErrors.passwordConfirm = { isError: true, message: '비밀번호 확인을 입력해주세요.' };
    }
    if (!formData.studentId.trim()) {
      formErrors.studentId = { isError: true, message: '학번을 입력해주세요.' };
    }

    // Dropdown 컴포넌트의 유효성 검사를 수행합니다.
    const dropdownErrors = validateDropdowns();
    formErrors = { ...formErrors, ...dropdownErrors };

    // 필수 입력 항목 또는 드롭다운 항목 중 하나라도 오류가 있는지 확인합니다.
    Object.keys(formErrors).forEach((key) => {
      if (formErrors[key as keyof typeof formErrors].isError) {
        isFormValid = false;
      }
      
    });

    if (!isFormValid) {
      formErrors.global = { isError: true, message: '필수 입력 항목 중 누락된 항목이 있습니다. 다시 확인해주세요.' };
    } else {
      formErrors.global = { isError: false, message: '' };
      // 여기에 회원가입 처리 로직을 추가합니다.
    }

    setErrors(formErrors);

    // 여기에 회원가입 처리 로직을 추가합니다.
  };

  const validateDropdowns = () => {
    const dropdownErrors: { [key: string]: { isError: boolean; message: string } } = {};

    if (!formData.field.trim()) {
      dropdownErrors.field = { isError: true, message: '분야를 선택해주세요.' };
    }
    if (!formData.status.trim()) {
      dropdownErrors.status = { isError: true, message: '재적 상태를 선택해주세요.' };
    }
    if (!formData.grade.trim()) {
      dropdownErrors.grade = { isError: true, message: '학년/학차를 선택해주세요.' };
    }
    if (!formData.department.trim()) {
      dropdownErrors.department = { isError: true, message: '학부/학과(전공)을 선택해주세요.' };
    }
    // 나머지 드롭다운 항목에 대한 검사 추가

    return dropdownErrors;
  };
 
  return (
    <div className="min-h-screen flex bg-black">
      <div className="text-white font-bold text-xl ml-60 mr-60 mb-20">
        <h2 className="text-bold text-[26px] mb-6 mt-60">회원가입</h2>
        <form onSubmit={handleSubmit}>
          <InputBox
            label="이름"
            value={formData.name}
            error={errors.name.isError}
            errorMessage={errors.name.message}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="이름을 입력해주세요."
            required
          />
          <InputBox
            label="연락처"
            value={formData.contact}
            error={errors.contact.isError}
            errorMessage={errors.contact.message}
            onChange={(e) => handleChange('contact', e.target.value)}
            placeholder="010-XXXX-YYYY 형식으로 입력해주세요."
            required
          />
          <InputBox
            label="e-mail"
            value={formData.email}
            error={errors.email.isError}
            errorMessage={errors.email.message}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="e-mail을 입력해주세요."
            required
          />
          <InputBox
            label="e-mail 인증번호"
            value={formData.emailVerificationCode}
            error={errors.emailVerificationCode.isError}
            errorMessage={errors.emailVerificationCode.message}
            onChange={(e) => handleChange('emailVerificationCode', e.target.value)}
            placeholder="인증번호를 입력해주세요."
            required
          />
          <InputBox
            label="생년월일"
            value={formData.birthday}
            error={errors.birthday.isError}
            errorMessage={errors.birthday.message}
            onChange={(e) => handleChange('birthday', e.target.value)}
            placeholder="YYYY/MM/DD 형식으로 입력해주세요."
            required
          />

          <Dropdown
            label="분야"
            options={['개발', 'CERT']}
            onSelect={(value) => handleDropdownChange('field', value)}
            placeholder="분야를 선택해주세요."
            required
            error={errors.field.isError} // 오류 상태를 전달합니다.
          />
          <Dropdown
            label="재적 상태"
            options={['재학', '휴학', '졸업']}
            onSelect={(value) => handleDropdownChange('status', value)}
            placeholder="재학 상태를 선택해주세요."
            required
            error={errors.status.isError} // 오류 상태를 전달합니다.
          />
          <Dropdown
            label="학년 및 학차"
            options={['1학년 / 1학차', '1학년 / 2학차', '2학년 / 3학차', '2학년 / 4학차', '3학년 / 5학차', '3학년 / 6학차', '4학년 / 7학차', '4학년 / 8학차']}
            onSelect={(value) => handleDropdownChange('grade', value)}
            placeholder="학년/학차를 선택해주세요."
            required
            error={errors.grade.isError} // 오류 상태를 전달합니다.
          />

          <InputBox
            label="비밀번호"
            value={formData.password}
            error={errors.password.isError}
            errorMessage={errors.password.message}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="비밀번호를 입력하세요."
            required
          />
          <InputBox
            label="비밀번호 확인"
            value={formData.passwordConfirm}
            error={errors.passwordConfirm.isError}
            errorMessage={errors.passwordConfirm.message}
            onChange={(e) => handleChange('passwordConfirm', e.target.value)}
            placeholder="비밀번호를 다시 한 번 입력하세요."
            required
          />
          <InputBox
            label="학번"
            value={formData.studentId}
            error={errors.studentId.isError}
            errorMessage={errors.studentId.message}
            onChange={(e) => handleChange('studentId', e.target.value)}
            placeholder="학번을 입력해주세요."
            required
          />

          <Dropdown
            label="학부/학과(전공)"
            options={['123', '12']}
            onSelect={(value) => handleDropdownChange('department', value)}
            placeholder="주전공을 선택해주세요."
            required
            error={errors.department.isError} // 오류 상태를 전달합니다.
          />
          <Dropdown
            label="부전공"
            options={['123', '12']}
            onSelect={(value) => handleDropdownChange('minor', value)}
            placeholder="없으면 비워주세요."
          />
          <Dropdown
            label="복수전공1"
            options={['123', '12']}
            onSelect={(value) => handleDropdownChange('doubleMajor1', value)}
            placeholder="없으면 비워주세요."
          />
          <Dropdown
            label="복수전공2"
            options={['123', '12']}
            onSelect={(value) => handleDropdownChange('doubleMajor2', value)}
            placeholder="없으면 비워주세요."
          />

          <div className="flex items-center">
            <div>
              <div className='mt-12 text-base'>
                ID는 자신의 학번으로 지정됩니다.
              </div>
              <div className='mt-4 text-base'>
                전화번호, e-mail 등의 정보는 제출 후 변경할 수 없으니 신중하게 작성해주세요.
              </div>
            </div>
            <div className="flex justify-end mt-8 ml-[300px]">
              {errors.global.isError && (
                <div className="text-red text-base mt-2 mr-4">{errors.global.message}</div>
              )}
              
              <button className="bg-green hover:bg-green text-black font-bold text-base py-2 px-4 rounded w-30 h-10">
                제출하기
              </button>
            </div>
          </div>

        </form>

        
      </div>
    </div>
  );
};

export default SignupPage;
