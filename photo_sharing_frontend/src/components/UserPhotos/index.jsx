import React, { useEffect, useState } from "react";

import "./styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Loading from "../Loading/Loading";
import {
  Divider,
  Typography,
  Grid,
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";

function formatDateTime(isoDateString) {
  return moment(isoDateString).format("DD-MM-YYYY HH:mm");
}

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const photoUser = useParams();
  const [photos, setPhotos] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const history = useNavigate();
  useEffect(() => {
    const fetchPhotoOfUser = async () => {
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const res = await axios.get(
          `http://localhost:8081/api/photo/photosOfUser/${photoUser.userId}`,
          { headers: headers },
        );
        setPhotos(res.data);
        const userRes = await axios.get(
          `http://localhost:8081/api/user/${photoUser.userId}`,
          { headers: headers },
        );
        setUserName(userRes.data.first_name);
        setLoading(false);
        console.log(
          "Success to fetch photos of user with id " + photoUser.userId,
        );
      } catch (e) {
        console.error("Error to fetch photo", e);
        setLoading(false);
      }
    };

    fetchPhotoOfUser();
  }, []);
  /*
    
    */

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history(`/users/${photoUser.userId}`)}
        >
          Back
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          Photos of {userName}
        </Typography>
        <Divider />
      </Grid>
      {photos?.map((photo) => (
        <Grid item xs={12} sm={6} md={4} key={photo._id}>
          <Card>
            <CardHeader
              avatar={
                <Avatar src={photoUser.avatar} alt={photoUser.username} />
              }
              title={photoUser.username}
              subheader={formatDateTime(photo.date_time)}
            />
            <Link to={`/photo/${photo._id}`}>
              <CardMedia component="img" src={photo.file_name} alt="" />
            </Link>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {formatDateTime(photo.date_time)}
              </Typography>
            </CardContent>

            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/photo/${photo._id}`}
            >
              View Details
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default UserPhotos;
