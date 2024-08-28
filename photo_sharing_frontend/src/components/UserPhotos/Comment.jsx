import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { List, Divider, Typography, Grid } from "@mui/material";

function formatDateTime(isoDateString) {
  return moment(isoDateString).format("DD-MM-YYYY HH:mm");
}

export default function Comment({ comment }) {
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchUserComment = async () => {
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const userRes = await axios.get(
          `http://localhost:8081/api/user/${comment.user_id}`,
          { headers: headers },
        );
        setUserName(userRes.data.first_name);
        setLoading(false);
      } catch (e) {
        console.error("Error to comment ", e);
        setLoading(false);
      }
    };

    fetchUserComment();
  }, []);
  if (loading) {
    return;
  }
  return (
    <List key={comment._id} className="comment">
      <Divider />
      <Typography variant="body1" style={{ margin: "0 5px" }}>
        {formatDateTime(comment.date_time)}
      </Typography>
      <Grid container alignItems="center">
        <Typography variant="body1">
          <Link className="link-item" to={`/users/${comment.user_id}`}>
            {userName}
          </Link>{" "}
          :
        </Typography>

        <Typography variant="body1">{comment.comment}</Typography>
      </Grid>
      <Divider />
    </List>
  );
}
