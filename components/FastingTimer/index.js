import React, { useContext, useEffect, useState, memo } from "react";
import Box from "@mui/material/Box";
import GaugeChart from "react-gauge-chart";
import { PreferencesContext } from "../Preferences";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

const FASTING_STAGES = [
  {
    label: "Autophagy",
    minTime: 24,
  },
  {
    label: "Fat Burning",
    minTime: 18,
  },
  {
    label: "Ketosis",
    minTime: 12,
  },
];

const Guage = memo(({ percent, hoursPassed }) => {
  const currentStage = FASTING_STAGES.find((stage) => {
    console.log(stage.minTime, hoursPassed);
    return hoursPassed >= stage.minTime;
  });
  return (
    <GaugeChart
      // label={currentStage?.label}
      formatTextValue={() => {
        return currentStage?.label || "Fasting";
      }}
      id="gauge-chart1"
      nrOfLevels={4}
      animate={false}
      percent={percent}
      arcWidth={0.3}
      textColor="black"
      colors={["#FF5F6D", "#FFC371"]}
    />
  );
});

const secondsToTimeFormat = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  let result = "";
  if (hours > 0) {
    result += hours + " Hours";
    if (minutes > 0) {
      result += " and " + minutes + " Minutes";
    }
  } else {
    result += minutes + " Minutes";
  }
  return result;
};

export default function FastingTimer() {
  const { preferences, loadPreferences } = useContext(PreferencesContext);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);
  const [timePassed, setTimePassed] = useState(0);
  const [completePercentage, setCompletePercentage] = useState(0);
  const [isFasting, setIsFasting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    loadPreferences();

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (preferences?.fasting) {
      const { fasting } = preferences;
      const tempStartTime = new Date();
      tempStartTime.setHours(
        fasting.startTime.split(":")[0],
        fasting.startTime.split(":")[1]
      );
      const tempEndTime = new Date(tempStartTime);
      tempEndTime.setHours(tempEndTime.getHours() + fasting.duration);
      setStartTime(tempStartTime);
      setEndTime(tempEndTime);
      processTime(new Date());
    }
  }, [preferences]);

  const processTime = (currentTime) => {
    if (currentTime) {
      const fastDuration = endTime - startTime;
      const fastDurationInSeconds = parseInt(fastDuration / 1000, 10).toFixed(
        0
      );
      const startTimeInSeconds = parseInt(Math.floor(startTime / 1000));
      const endTimeInSeconds = parseInt(Math.floor(endTime / 1000));
      const currentTimeInSeconds = parseInt(Math.floor(currentTime / 1000));

      const completePercentage =
        (currentTimeInSeconds - startTimeInSeconds) / fastDurationInSeconds;
      setCompletePercentage(completePercentage.toPrecision(2));
      const timeLeft = endTimeInSeconds - currentTimeInSeconds;
      setTimeLeft(timeLeft);
      setTimePassed(currentTimeInSeconds - startTimeInSeconds);
      if (currentTimeInSeconds >= endTimeInSeconds) {
        setIsFasting(false);
      } else if (currentTimeInSeconds >= startTimeInSeconds) {
        setIsFasting(true);
      }
    }
  };

  useEffect(() => {
    processTime(currentTime);
  }, [currentTime]);

  if (preferences.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        marginTop: 2,
      }}
    >
      {isFasting && (
        <Guage
          percent={completePercentage}
          hoursPassed={Math.floor(timePassed / 60 / 60)}
        />
      )}
      {!isFasting && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          Fasting is over!
        </Box>
      )}
      <Box
        sx={{
          width: "100%",
          paddingLeft: 2,
          paddingRight: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box>{startTime?.toLocaleTimeString?.()}</Box>
        <Box>{endTime?.toLocaleTimeString?.()}</Box>
      </Box>

      <Box>Time Left: {secondsToTimeFormat(timeLeft)}</Box>
      <Box>Time Passed: {secondsToTimeFormat(timePassed)}</Box>
    </Box>
  );
}
