import "./../style/UserInfoIcon.css";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router";
import Axios from "axios";
import { Link } from "react-router-dom";
export default function UserInfoIcon(props) {
  const history = useHistory();

  // When logging out, clear the user session and
  // redirect back to Dashboard
  const onLogout = () => {
    sessionStorage.clear();

    Axios.get("http://localhost:3000/users/logout").then((response) => {
      history.push("/");
    });
  };

  return (
    <div className="UserInfo">
      <Link to="/UserProfileInfoPage">
        {/* Display user icon and username */}
        <Avatar
          sx={{
            height: 30,
            width: 30,
            marginTop: 0.5,
          }}
        />
      </Link>
      <div className="user-info">{props.name}</div>

      {/* Display logout button (calls onLogout when clicked) */}
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
