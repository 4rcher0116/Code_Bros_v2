import React, { Fragment } from "react";
import styles from "./feedbox.module.scss";
import RestaurantList from "../../Resturaunts2/resturaunts.component";



const FeedBox = (): JSX.Element => {
  return (
    <Fragment>
      <div className={styles.Feed}>
        <RestaurantList />
      </div>
    </Fragment>
  );
};
export default FeedBox;
