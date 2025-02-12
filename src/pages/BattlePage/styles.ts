import { SxProps } from "@mui/material";

export const styles: Record<string, SxProps> = {
  mainWrapper: {
    width: "100%",
    height: "100vh",
    display: "flex",
    m: "0 auto",
    flexDirection: "column",
    backgroundColor: "#efefef",
  },
  mainTitle: {
    m: "0 auto",
    p: "20px 0",
    fontWeight: 500,
    fontSize: "2rem",
  },
  playersCardsWrapper: {
    position: "relative",
    display: "flex",
    width: "820px",
    m: "0 auto",
    justifyContent: "space-between",
    pt: "45px",
  },
  drawPlacement: {
    fontSize: "1.5rem",
    fontWeight: "600",
    width: "100%",
    position: "absolute",
    textAlign: "center",
    top: "-10px",
  },
  actionWrapper: {
    mt: "20px",
    display: "flex",
    justifyContent: "center",
  },
};
