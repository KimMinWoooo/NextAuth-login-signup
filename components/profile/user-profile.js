import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

import ProfileForm from './profile-form';

function UserProfile() { // CSR 코드임
  // const [isLoading, setIsLoading] = useState(true); //loading 관리
  
  
  // useEffect(() => {   // next-auth 에서 가져와서 프로미스가 날라오기에 then or async await 사용 => useEffect 함수는 비동기 함수로 만들면 안됨
  //   getSession().then(session => { // 세션이 있으면 로그인 없으면 null 상태
  //     if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setIsLoading(false);
  //     }
  //   })
  // }, []);

  // if (isLoading) {
  //   return <p> Loading... </p>
  // }


  return (
    <section>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
