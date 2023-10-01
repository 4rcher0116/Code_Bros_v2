
import React, { useState} from 'react';
import styles from './restaurantcard2.module.scss'; // Import styles from the module

type RestaurantCardProps = {
  imageUrl: string;
  name: string;
  address: string;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  imageUrl,
  name,
  address,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = (): void => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`${styles['restaurant-card']} ${expanded ? styles['expanded'] : ''}`}
      onClick={toggleExpanded}
    >
      <div className={styles['image-container']}>
        <img src={imageUrl} alt={name} />
      </div>
      {expanded && (
        <div className={styles['info-container']}>
          <h3>{name}</h3>
          <p>Address: {address}</p>
          {/* <p>Opening Hours: {openingHours}</p> */}
        </div>
      )}
    </div>
  );
};


export default RestaurantCard;
