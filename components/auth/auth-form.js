import { useState, useRef } from "react";
import { useRouter } from "next/router";
import classes from "./auth-form.module.css";

import { signIn } from "next-auth/react";


async function createUser(email, password, role) {
  const response = await fetch("/user/join", {
    method: "POST",
    body: JSON.stringify({ email, password, role }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
}

function AuthForm() {
  
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const roleInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredRole = roleInputRef.current.value;

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword
      }); // 우리가 로그인 확인 로그인 front 작업
      
      if (!result.error) {
        router.replace('/profile');
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword, enteredRole);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email"  required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="role">역할</label>
          <input type="role" id="role" required ref={roleInputRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "로그인" : "계정 생성하기"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "계정 생성하기" : "기존 계정으로"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
