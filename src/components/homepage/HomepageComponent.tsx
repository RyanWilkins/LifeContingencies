import { faReact } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import React from "react";
import { HomepageImageComponent } from "./HomepageImageComponent";

interface OwnProps {}

export const HomePage: React.FC<OwnProps> = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
    <Grid
      container
      // spacing={2}
      style={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        // padding: "10px",
      }}
    >
      <Grid item xs={12} style={{height: mobile? "": "10vh", marginTop:"5px"}}>
        {/* <Paper elevation={10}>
          <Box p={5}> */}
        <Typography variant="h3">
          The Actuarial Approach to Life Expectancy
        </Typography>
        {/* </Box>
        </Paper> */}
      </Grid>
      <Grid item xs={12} style={{height: mobile? "": "10vh"}}>
          <Typography variant="h6">By: Ryan Wilkins</Typography>
      </Grid>
      <Paper elevation={0} style={{height: "100%"}}>
      <Grid item container xs={12} alignItems="center" style={{height: mobile? "": "60vh"}}>
      

        <Grid item xs={12} md={4}>
            <Box p={2}>
              <HomepageImageComponent />
            </Box>
        </Grid>

        <Grid item xs={12} md={8} style={{ textAlign: "left" }}>
            <Box p={5}>
              <Typography variant={mobile ? "body1" : "h5"}>
                When you Google "Average Life Expectancy", you're likely to get a
                response of somewhere around 80 years. But this doesn't tell us
                the whole story.
              </Typography>
              <br />
              <Typography variant={mobile ? "body1" : "h5"}>
                Do you expect a person who is 79 years old today to live only
                one more year? Similarly, what does this statistic tell us
                about the life expectancy of people who are currently 90?
              </Typography>
              <br />
              <Typography variant={mobile ? "body1" : "h5"}>
                These are the questions that Life Insurance Actuaries try to
                answer and often one of the first lessons taught in Actuarial
                Science courses. This app uses publicly available Life Tables
                to show how life expectancy changes across ages and
                demographics.
              </Typography>
            </Box>
        </Grid>
        
      </Grid>
      </Paper>

      <Grid item xs={12}>
        <Button
          href="/question/1"
          style={{
            backgroundColor: theme.palette.secondary.main,
            height: "10vh",
            width: mobile ? "50%":"30%",
            fontSize: mobile ? "" : "1.5em"
          }}
          size="large"
        >
          What Is My Life Expectancy?
          <ArrowForward />
        </Button>
      </Grid>
      <Grid item container xs={12} justify="center" alignItems="center" style={{height: mobile ? "" : "10vh", paddingTop:mobile?"15px":""}}>
        <Paper elevation={10} >
          <Typography variant="subtitle1" style={{marginLeft:"10px",marginRight:"10px"}} >
            This project was built using <FontAwesomeIcon icon={faReact} />
            ReactJS. Visit{" "}
            <a
              href="https://www.rjwilkins.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "white" }}
            >
              my homepage
            </a>{" "}
            to see other Actuarial related Software Development projects and
            links to my GitHub & LinkedIn.
          </Typography>
        </Paper>
      </Grid>
      <Grid item container xs={12} justify="center" alignItems="center" style={{height: mobile ? "5vh" : "0"}}></Grid>
    </Grid>
    </>
  );
};
