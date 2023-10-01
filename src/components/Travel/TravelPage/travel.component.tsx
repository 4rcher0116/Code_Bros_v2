import React, { useRef } from "react";
import styles from "./travel.module.scss";
import FeedBox from "../FeedBox/feedbox.component";
import PlannerBox from "../PlannerBox/plannerbox.component";




const TravelPage = (): JSX.Element => {
  const visibility = useRef<string>("fadeIn");

  return (
    <div className={`${styles.Travel} ${styles[visibility.current]}`}>
      <FeedBox />
      <PlannerBox />
    </div>
  );
};

export default TravelPage;
