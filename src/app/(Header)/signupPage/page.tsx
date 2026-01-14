// SignupPage.tsx
"use client";
import React, { useState, useEffect } from 'react';
import InputBox from './InputBox';
import Dropdown from './Dropdown';
import { useRouter } from 'next/navigation';
import { api } from "@/lib/axios";

interface formDataObject {
  name:string;
  birth:string;
  pnumber:string;
  email:string;
  password:string;
  passwordConfirm?:string;
  field:{
    id:number;
  },
  status:{
    id:number;
  },
  grade:{
    id:number;
  },
  major1:{
    id:number;
  },
  major2:{
    id:number;
  },
  major3:{
    id:number;
  },
  minor:{
    id:number;
  },
  studentId : string
}
const SignupPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<formDataObject>({
    name: '',
    pnumber: '',
    email: '',
    birth: '',
    field: {
      id:0
    },
    status: {
      id:0
    },
    grade: {
      id:0
    },
    password: '',
    passwordConfirm: '',
    studentId: '',
    major1: {
      id:1
    },
    minor: {
      id:1
    },
    major2: {
      id:1
    },
    major3: {
      id:1
    },
  });
  const [isFormValid, setValid] = useState(true);
  const [errors, setErrors] = useState({
    name: { isError: false, message: '' },
    pnumber: { isError: false, message: '' },
    email: { isError: false, message: '' },
    birth: { isError: false, message: '' },
    field: { isError: false, message: '' },
    status: { isError: false, message: '' },
    grade: { isError: false, message: '' },
    password: { isError: false, message: '' },
    passwordConfirm: { isError: false, message: '' },
    studentId: { isError: false, message: '' },
    major1: { isError: false, message: '' },
    global: { isError: false, message: '' }
    // 나머지 필수 입력 항목 추가
  });

  const [majorList, setMajorList] = useState<any[]>([])
  const [statusList, setStatusList] = useState<any[]>([])
  const [gradeList, setGradeList] = useState<any[]>([])
  const [majorListFetched, setmajorListFetched] = useState(false); // 전공 목록을 이미 받아왔는지 여부 상태 추가

  const getMajorList = async () => {
    try {
      const response = (await api.get('/api/members/major')).data.data;
      console.log('응답 데이터:', response);
      if (Array.isArray(response)) {
        setMajorList(response);
        setFormData(prevFormData => ({
          ...prevFormData,
          major1: response[0].id || '' // 첫 번째 전공을 선택
        }));
        setmajorListFetched(true); // 전공 목록을 받아왔음을 표시
      } else {
        console.error('Failed to fetch dropdown options: Response data is not an array');
      }
    } catch (error) {
      console.error('Failed to fetch dropdown options:', error);
    }
  };
  const getStateList = async () => {
    try {
      const response = (await api.get('/api/members/status')).data.data;
      console.log('응답 데이터:', response);
      if (Array.isArray(response)) {
        setStatusList(response); // 추출된 "name" 값을 전공 목록으로 설정
      } else {
        console.error('Failed to fetch dropdown options: Response data is not an array');
      }
    } catch (error) {
      console.error('Failed to fetch dropdown options:', error);
    }
  };
  const getGradeList = async () => {
    try {
      const response = (await api.get('/api/members/grade')).data.data;
      console.log('응답 데이터:', response);
      if (Array.isArray(response)) {
        setGradeList(response); // 추출된 "name" 값을 전공 목록으로 설정
      } else {
        console.error('Failed to fetch dropdown options: Response data is not an array');
      }
    } catch (error) {
      console.error('Failed to fetch dropdown options:', error);
    }
  };

  useEffect(() => {
    if (!majorListFetched) { // 전공 목록을 받아오지 않았다면 요청
      getMajorList();
      getStateList();
      getGradeList();
    }
  }, [majorListFetched]);

  const handleDropdownChange = (key: string, value: number) => {
    const processedValue = value;
    setFormData({ ...formData,
      [key]: {
          id: value}});
    setErrors({ ...errors, [key]: { isError: false, message: '' } });
  };

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [key]: { isError: false, message: '' } });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let formErrors = { ...errors };

    // 필수 입력 항목 검사
    if (!formData.name.trim()) {
      formErrors.name = { isError: true, message: '이름을 입력해주세요.' };
      setValid(false); // 필수 입력 항목이 비어 있음을 표시
    }
    if (!formData.pnumber.trim()) {
      formErrors.pnumber = { isError: true, message: '연락처를 입력해주세요.' };
      setValid(false);
    }
    if (!formData.email.trim()) {
      formErrors.email = { isError: true, message: '이메일을 입력해주세요.' };
      setValid(false);
    }
    if (!formData.birth.trim()) {
      formErrors.birth = { isError: true, message: '생일을 입력해주세요.' };
      setValid(false);
    }
    if (!formData.password.trim()) {
      formErrors.password = { isError: true, message: '비밀번호를 입력해주세요.' };
      setValid(false);
    }
    if (formData.passwordConfirm == undefined || !formData.passwordConfirm.trim()) {
      formErrors.passwordConfirm = { isError: true, message: '비밀번호 확인을 입력해주세요.' };
      setValid(false);
    }
    if (!formData.studentId.trim()) {
      formErrors.studentId = { isError: true, message: '학번을 입력해주세요.' };
      setValid(false);
    }

    // Dropdown 컴포넌트의 유효성 검사를 수행합니다.
    const dropdownErrors = validateDropdowns();
    formErrors = { ...formErrors, ...dropdownErrors };

    // 필수 입력 항목 또는 드롭다운 항목 중 하나라도 오류가 있는지 확인합니다.
    Object.keys(formErrors).forEach((key) => {
      if (formErrors[key as keyof typeof formErrors].isError) {
        setValid(false);
      }
    });

    if (formData.password !== formData.passwordConfirm && formData.passwordConfirm !== '') {
      formErrors.passwordConfirm = { isError: true, message: '비밀번호가 같지 않습니다.' };
      setValid(false);
    }

    if (!isFormValid) {
      formErrors.global = { isError: true, message: '필수 입력 항목 중 누락된 항목이 있습니다. 다시 확인해주세요.' };
      setErrors(formErrors); // 오류 메시지 표시 또는 초기화
      setValid(true);
      return; // 폼 제출 중지
    } else {
      formErrors.global = { isError: false, message: '' }; // 필수 입력 항목이 모두 입력되었으므로 오류 메시지 초기화
      setErrors(formErrors); // 오류 메시지 표시 또는 초기화
      setValid(true);
    }

    try {
      // 회원가입 정보를 서버로 전송합니다.
      console.log(formData);
      let signupUserData = formData;
      delete signupUserData.passwordConfirm;
      console.log("어.... 이게 전송될꺼야 아마...? ",{formData});
      const response = await api.post('/api/auths/join', formData);
      console.log('회원가입 성공:', response.data);
      // 회원가입 성공 시에만 라우팅 수행
      router.push('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
      // 여기에 회원가입 실패 처리 로직을 추가합니다.
      formErrors.global = { isError: true, message: '회원가입에 실패했습니다. 다시 확인해주세요.' };
      setErrors(formErrors);
    }
  };

  const validateDropdowns = () => {
    const dropdownErrors: { [key: string]: { isError: boolean; message: string } } = {};

    if (!formData.field.id) {
      dropdownErrors.field = { isError: true, message: '분야를 선택해주세요.' };
    }
    if (!formData.status.id) {
      dropdownErrors.status = { isError: true, message: '재적 상태를 선택해주세요.' };
    }
    if (!formData.grade.id) {
      dropdownErrors.grade = { isError: true, message: '학년/학차를 선택해주세요.' };
    }
    if (!formData.major1.id) {
      dropdownErrors.major = { isError: true, message: '학부/학과(전공)을 선택해주세요.' };
    }
    // 나머지 드롭다운 항목에 대한 검사 추가

    return dropdownErrors;
  };

  return (
    <div className='w-full'>
      <div className="text-white font-bold text-xl mb-20">
        <h2 className="text-bold text-[26px] mb-6">회원가입</h2>
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
            value={formData.birth}
            error={errors.birth.isError}
            errorMessage={errors.birth.message}
            onChange={(e) => handleChange('birth', e.target.value)}   ////토글
            placeholder="YYYYMMDD 형식으로 입력해주세요."
            required
          />

          <Dropdown
            label="분야"
            options={[{name:"개발", id:2}, {name:"CERT", id:3}]}
            onSelect={(value) => handleDropdownChange('field', value)}
            placeholder="분야를 선택해주세요."
            required
            error={errors.field.isError}
          />
          <Dropdown
            label="재학 상태"
            options={statusList}
            onSelect={(value) => handleDropdownChange('status', value)}
            placeholder="재학 상태를 선택해주세요."
            required
            error={errors.status.isError}
          />
          <Dropdown
            label="학년 및 학차"
            options={gradeList}
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
            placeholder="비밀번호를 입력하세요. (8~20글자, 영어 대소문자, 숫자, 특수문자 포함)"
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
            options={majorList}
            onSelect={(value) => handleDropdownChange('major1', value)}
            placeholder="주전공을 선택해주세요."
            required
            error={errors.major1.isError}
          />
          <Dropdown
            label="부전공"
            options={majorList}
            onSelect={(value) => handleDropdownChange('minor', value)}
            placeholder="없으면 비워주세요."
          />
          <Dropdown
            label="복수전공1"
            options={majorList}
            onSelect={(value) => handleDropdownChange('major2', value)}
            placeholder="없으면 비워주세요."
          />
          <Dropdown
            label="복수전공2"
            options={majorList}
            onSelect={(value) => handleDropdownChange('major3', value)}
            placeholder="없으면 비워주세요."
          />

          <div>
            <div className='mt-12 text-base whitespace-pre w-full justify-between items-center flex'>
              {"ID는 자신의 학번으로 지정됩니다."}
              {errors.global.isError && (
                <div className="text-red text-base w-fit whitespace-pre">{errors.global.message}</div>
              )}
            </div>
            <div className='text-base whitespace-pre w-full justify-between items-center flex'>
              {"전화번호, e-mail 등의 정보는 제출 후 변경할 수 없으니 신중하게 작성해주세요."}
              <button className="bg-green hover:bg-green text-black font-bold text-base py-2 px-4 ml-[10px] rounded whitespace-pre w-fit h-10">
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