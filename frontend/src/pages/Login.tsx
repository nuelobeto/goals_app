import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./../app/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";

function Login() {
  const { user, loading, message, error, success } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  useEffect(() => {
    if (error) {
      toast.error(message);
    }

    if (success || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, error, message, navigate, dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <main>
      <section>
        <h1>Login</h1>
        <p>Log in to your account</p>
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <div className="form_btn">
            <button type="submit">{loading ? "Loading..." : "Submit"}</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
