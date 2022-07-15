import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "./../app/hooks";

function Header() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">GoalSetter</Link>
      </div>
      <nav>
        <ul>
          {user ? (
            <>
              {user.isAdmin && (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              )}
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
