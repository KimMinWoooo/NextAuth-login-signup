import { getSession } from "next-auth/react";

import UserProfile from "../components/profile/user-profile";

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  // 들어오는 요청마다 로그인 여부를 알아야하기에 SSR
  const session = await getSession({ req: context.req }); // SSR은 context를 통해 요청 객체에 접근 가능

  if (!session) {
    return {
      redirect: {
        destination: 'auth',
        permanent: false
      },
    };
  }

  return {
    props: {session},
  }
}

export default ProfilePage;
