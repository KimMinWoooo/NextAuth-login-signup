import classes from './profile-form.module.css';

function ProfileForm() {
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>새 비밀번호</label>
        <input type='password' id='new-password' />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>이전 비밀번호</label>
        <input type='password' id='old-password' />
      </div>
      <div className={classes.action}>
        <button>비밀번호 변경하기</button>
      </div>
    </form>
  );
}

export default ProfileForm;
