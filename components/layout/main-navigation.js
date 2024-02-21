import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import classes from "./main-navigation.module.css";
function MainNavigation() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  function logoutHandler() {  // 프로미스 함수이지만 useSession이 세션 변화시 자동 컴포넌트 업데이트 하여 사용자 기록을 없애줌
    signOut();        // 로그 아웃시 세션 쿠키 없앰
  }

  return (
    <header className={classes.header}>
      <Link href="/" legacyBehavior>
        <a>
          <div className={classes.logo}>WooLogin</div>
        </a>
      </Link>
      <nav>
        <ul>
        {!session && !loading && (
          <li>
            <Link href="/auth">Login</Link>
          </li>
        )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
