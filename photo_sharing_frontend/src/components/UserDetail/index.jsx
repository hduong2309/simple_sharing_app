import React, { useState, useEffect, useContext } from "react";

import "./styles.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../AppContext/contextProvider";
import UploadImg from "./UploadImg";
import Loading from "../Loading/Loading";
import { Grid, Typography, Button } from "@mui/material";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const userId = useParams();
  const { user } = useContext(MyContext);
  const [userInfor, setUserInfor] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const res = await axios.get(
          `http://localhost:8081/api/user/${userId.userId}`,
          { headers: headers },
        );
        setUserInfor(res.data);
        setLoading(false);
      } catch (e) {
        console.error(`error to fetch user with id ${userId.userId}`, e);
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) {
    return <Loading />;
  }
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography color="textSecondary">ID:</Typography>
        <Typography variant="h6" gutterBottom>
          {user && `${userInfor._id}`}
        </Typography>
        <Typography color="textSecondary">Name:</Typography>
        <Typography variant="h6" gutterBottom>
          {user && `${userInfor.first_name} ${userInfor.last_name}`}
        </Typography>
        <Typography color="textSecondary">Description:</Typography>
        <Typography variant="h6" gutterBottom>
          {user && `${userInfor.description}`}
        </Typography>
        <Typography color="textSecondary">Location:</Typography>
        <Typography variant="h6" gutterBottom>
          {user && `${userInfor.location}`}
        </Typography>
        <Typography color="textSecondary">Occupation:</Typography>
        <Typography variant="h6" gutterBottom>
          {user && `${userInfor.occupation}`}
        </Typography>
      </Grid>
      <Grid item xs={4} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            size="large"
            to={`/photos/${userId.userId}`}
            component={Link}
            variant="contained"
            color="primary"
          >
            See Photos
          </Button>
        </Grid>

        {user._id === userId.userId && (
          <Grid item xs={4}>
            <UploadImg />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default UserDetail;
