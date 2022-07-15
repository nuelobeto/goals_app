import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./../app/hooks";
import {
  createGoal,
  deleteGoal,
  getGoals,
  reset,
} from "./../features/goal/goalSlice";

function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const { loading, goals, error, success, message } = useAppSelector(
    (state) => state.goal
  );
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (error) {
      console.log(message);
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, error, message, dispatch]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(createGoal({ text }));

    setText("");
  };

  return (
    <main>
      <section>
        <h1>Welcome {user?.name}</h1>
        <p style={{ margin: "1rem 0 0" }}>Goals Dashboard</p>
      </section>

      <section>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="set a goal"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="form_btn">
            <button type="submit">{loading ? "Loading..." : "Submit"}</button>
          </div>
        </form>
      </section>

      <section>
        <ul className="goals">
          {!goals.length ? (
            <p>You have not set any goals</p>
          ) : (
            goals.map((goal) => (
              <li key={goal._id}>
                {goal.text}{" "}
                <button onClick={() => dispatch(deleteGoal(goal._id))}>
                  delete
                </button>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
}

export default Dashboard;
