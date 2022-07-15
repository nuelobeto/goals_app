import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./../app/hooks";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";

function Register() {
  const { user, error, loading, message, success } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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

    if (password !== password2) {
      toast.error("Passwords do not match!");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  return (
    <main>
      <section>
        <h1>Register</h1>
        <p>Please create an account</p>
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
          />
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
          <input
            type="password"
            placeholder="confirm password"
            id="password2"
            name="password2"
            value={password2}
            onChange={handleChange}
          />
          <div className="form_btn">
            <button type="submit">{!loading ? "Submit" : "Loading..."}</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Register;
