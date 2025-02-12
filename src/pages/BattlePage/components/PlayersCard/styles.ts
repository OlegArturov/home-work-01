import { SxProps } from "@mui/material";

export const styles: Record<string, SxProps> = {
  cardWrapper: {
    width: "400px",
    backgroundColor: "#e0dae9",
    position: "relative",
  },
  placement: {
    fontSize: "1.5rem",
    fontWeight: "600",
    width: "100%",
    position: "absolute",
    textAlign: "center",
    top: "-50px",
  },
  cardTitle: {
    p: "15px",
    fontSize: "1.5rem",
  },
  cardContent: {
    p: "15px",
    mb: "20px",
  },
  cardActions: {
    p: "0 15px 15px",
    display: "flex",
    justifyContent: "center",
  },
  cardImage: {
    p: "10px",
    height: "300px",
    objectFit: "contain",
    mb: "25px",
  },
  cardUserName: {
    fontSize: "1.5rem",
    fontWeight: 500,
    display: "flex",
    justifyContent: "center",
    padding: "0 15px",
    mb: "25px",
  },
};
