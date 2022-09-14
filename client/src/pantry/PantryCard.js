import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import "./../style/PantryCard.css";

// Display pantry info in a Card component
export default function PantryCard(props) {
  return (
    <Card
      sx={{ width: 250, height: 300, borderRadius: 3, marginBottom: "30px" }}
      className="pantry-card"
    >
      <CardActionArea>
        {/* Clicking the card routes to the pantry profile for that pantry */}
        <Link
          style={{ textDecoration: "none" }}
          to={{
            pathname: "/PantryProfile",
            state: {
              name: props.name,
              id: props.id,
            },
          }}
        >
          {/* Display pantry image on top half of Card */}
          <CardMedia
            component="img"
            height="180"
            image={props.pantryImg}
            position="relative"
          />

          {/* Display pantry name, location, and hours on bottom half of Card */}
          <CardContent>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {props.name}
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              {props.location} <br></br>
              Available: {props.hours}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}
