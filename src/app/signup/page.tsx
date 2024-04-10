// SignupPage.tsx
"use client";
import React, { useState, useEffect } from 'react';
import InputBox from './InputBox';
import Dropdown from './Dropdown';
import { useRouter } from 'next/navigation';
import axios from 'axios'; // Axios를 사용하여 서버 API 호출


const SignupPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    pnumber: '',
    email: '',
    birthday: '',
    field: '',
    status: '',
    grade: '',
    password: '',
    passwordConfirm: '',
    studentId: '',
    major: '',
    minor: '',
    doubleMajor1: '',
    doubleMajor2: ''
  });

  const [errors, setErrors] = useState({
    name: { isError: false, message: '' },
    pnumber: { isError: false, message: '' },
    email: { isError: false, message: '' },
    birthday: { isError: false, message: '' },
    field: { isError: false, message: '' },
    status: { isError: false, message: '' },
    grade: { isError: false, message: '' },
    password: { isError: false, message: '' },
    passwordConfirm: { isError: false, message: '' },
    studentId: { isError: false, message: '' },
    major: { isError: false, message: '' },
    global: { isError: false, message: '' }
    // 나머지 필수 입력 항목 추가
  });

  const [majors, setMajors] = useState<string[]>([]); // 전공 목록 상태 추가
  const [majorsFetched, setMajorsFetched] = useState(false); // 전공 목록을 이미 받아왔는지 여부 상태 추가

  const fetchDropdownOptions = async () => {
    try {
      const response = await axios.get('https://f8595853-a026-42f2-a444-0fcbd28602b0.mock.pstmn.io/signup');
      console.log('응답 데이터:', response.data);
      if (Array.isArray(response.data)) {
        const majors = response.data.map((item: any) => item.major);
        console.log('전공 목록:', majors);
        setMajors(majors); // 전공 목록 설정
        setFormData(prevFormData => ({
          ...prevFormData,
          major: majors[0] || '' // 첫 번째 전공을 선택
        }));
        setMajorsFetched(true); // 전공 목록을 받아왔음을 표시
      } else {
        console.error('Failed to fetch dropdown options: Response data is not an array');
      }
    } catch (error) {
      console.error('Failed to fetch dropdown options:', error);
    }
  };
  
  useEffect(() => {
    if (!majorsFetched) { // 전공 목록을 받아오지 않았다면 요청
      fetchDropdownOptions();
    }
  }, [majorsFetched]);

  const handleDropdownChange = (key: string, value: string) => {
    const processedValue = value.trim() === '' ? '없음' : value.trim();
    setFormData({ ...formData, [key]: processedValue });
    setErrors({ ...errors, [key]: { isError: false, message: '' } });
  };

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [key]: { isError: false, message: '' } });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let formErrors = { ...errors };
    let isFormValid = true;
  
    // 필수 입력 항목 검사
    if (!formData.name.trim()) {
      formErrors.name = { isError: true, message: '이름을 입력해주세요.' };
      isFormValid = false; // 필수 입력 항목이 비어 있음을 표시
    }
    if (!formData.pnumber.trim()) {
      formErrors.pnumber = { isError: true, message: '연락처를 입력해주세요.' };
      isFormValid = false;
    }
    if (!formData.email.trim()) {
      formErrors.email = { isError: true, message: '이메일을 입력해주세요.' };
      isFormValid = false;
    }
    if (!formData.birthday.trim()) {
      formErrors.birthday = { isError: true, message: '생일을 입력해주세요.' };
      isFormValid = false;
    }
    if (!formData.password.trim()) {
      formErrors.password = { isError: true, message: '비밀번호를 입력해주세요.' };
      isFormValid = false;
    }
    if (!formData.passwordConfirm.trim()) {
      formErrors.passwordConfirm = { isError: true, message: '비밀번호 확인을 입력해주세요.' };
      isFormValid = false;
    }
    if (!formData.studentId.trim()) {
      formErrors.studentId = { isError: true, message: '학번을 입력해주세요.' };
      isFormValid = false;
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
  
    if (formData.password !== formData.passwordConfirm && formData.passwordConfirm !== '') {
      formErrors.passwordConfirm = { isError: true, message: '비밀번호가 같지 않습니다.' };
      isFormValid = false;
    }
  
    if (!isFormValid) {
      formErrors.global = { isError: true, message: '필수 입력 항목 중 누락된 항목이 있습니다. 다시 확인해주세요.' };
      setErrors(formErrors); // 오류 메시지 표시 또는 초기화
      isFormValid = true;
      return; // 폼 제출 중지
    } else {
      formErrors.global = { isError: false, message: '' }; // 필수 입력 항목이 모두 입력되었으므로 오류 메시지 초기화
      setErrors(formErrors); // 오류 메시지 표시 또는 초기화
      isFormValid = true;
  }
  
    try {
      // 회원가입 정보를 서버로 전송합니다.
      const response = await axios.post('https://f8595853-a026-42f2-a444-0fcbd28602b0.mock.pstmn.io/api/signup', formData);
      console.log('회원가입 성공:', response.data);
      // 회원가입 성공 시에만 라우팅 수행
      router.push('/main');
    } catch (error) {
      console.error('회원가입 실패:', error);
      // 여기에 회원가입 실패 처리 로직을 추가합니다.
      formErrors.global = { isError: true, message: '회원가입에 실패했습니다. 다시 확인해주세요.' };
      setErrors(formErrors);
    }
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
    if (!formData.major.trim()) {
      dropdownErrors.major = { isError: true, message: '학부/학과(전공)을 선택해주세요.' };
    }
    // 나머지 드롭다운 항목에 대한 검사 추가

    return dropdownErrors;
  };
 
  return (
    <div className="min-h-screen flex bg-black justify-between px-20">
      <div className="text-white font-bold text-xl mb-20 ml-40">
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
            value={formData.pnumber}
            error={errors.pnumber.isError}
            errorMessage={errors.pnumber.message}
            onChange={(e) => handleChange('pnumber', e.target.value)}
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
            options={["개발", "CERT"]}
            onSelect={(value) => handleDropdownChange('field', value)}
            placeholder="분야를 선택해주세요."
            required
            error={errors.field.isError}
          />
          <Dropdown
            label="재학 상태"
            options={['재학', '휴학', '졸업']}
            onSelect={(value) => handleDropdownChange('status', value)}
            placeholder="재학 상태를 선택해주세요."
            required
            error={errors.status.isError}
          />
          <Dropdown
            label="학년 및 학차"
            options={['1학년 / 1학차', '1학년 / 2학차', '2학년 / 3학차', '2학년 / 4학차', '3학년 / 5학차', '3학년 / 6학차', '4학년 / 7학차', '4학년 / 8학차', '그 이상', '졸업']}
            onSelect={(value) => handleDropdownChange('grade', value)}
            placeholder="학년/학차를 선택해주세요."
            required
            error={errors.grade.isError}
          />

          <InputBox
            label="비밀번호"
            value={formData.password}
            error={errors.password.isError}
            errorMessage={errors.password.message}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="비밀번호를 입력하세요."
            required
            type="password"
          />
          <InputBox
            label="비밀번호 확인"
            value={formData.passwordConfirm}
            error={errors.passwordConfirm.isError}
            errorMessage={errors.passwordConfirm.message}
            onChange={(e) => handleChange('passwordConfirm', e.target.value)}
            placeholder="비밀번호를 다시 한 번 입력하세요."
            required
            type="password"
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
            options={formData.major ? [formData.major] : []}
            onSelect={(value) => handleDropdownChange('major', value)}
            placeholder="주전공을 선택해주세요."
            required
            error={errors.major.isError}
          />
          <Dropdown
            label="부전공"
            options={formData.major ? [formData.major] : []}
            onSelect={(value) => handleDropdownChange('minor', value)}
            placeholder="없으면 비워주세요."
          />
          <Dropdown
            label="복수전공1"
            options={formData.major ? [formData.major] : []}
            onSelect={(value) => handleDropdownChange('doubleMajor1', value)}
            placeholder="없으면 비워주세요."
          />
          <Dropdown
            label="복수전공2"
            options={formData.major ? [formData.major] : []}
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
            <div className="flex mt-8 ml-[300px] items-center">
              {errors.global.isError && (
                <div className="absolute text-red text-base mt-2 right-0 mr-[360px]">{errors.global.message}</div>
              )}
              
              <button className="absolute bg-green hover:bg-green text-black font-bold text-base py-2 px-4 rounded w-30 h-10 right-0 mr-60">
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
