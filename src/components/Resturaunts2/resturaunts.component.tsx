

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import RestaurantCard from '../Card/restaurantcard2.component';
// import styles from "./resturaunts.module.scss"

// // Define Yelp API request options
// const yelpOptions = {
//   method: 'GET',
//   url: 'http://localhost:8080/https://api.yelp.com/v3/businesses/search',
//   params: {
//     location: 'Baton Rouge, LA',
//     term: 'restaurants',
//     limit: 30,
//   },
//   headers: {
//     Authorization: 'Bearer v6Fp_iceiGQRtNa-70WurQPuBzfVS0ldqpsjk29erOHeFTijSZ0i4f1XEK2YPwWTyXp14gxEaG7w17_NXgvteI6YQ7tbbusqgxKgIRzvGQoEML_OJNfCv-TpVVsYZXYx', // Replace with your Yelp API Key
//   },
// };

// type Restaurant = {
//   id: string; // Change to 'id'
//   name: string;
//   location: {
//     state?: string; // Change to 'state'
//     country?: string;
//     address1?: string; // Change to 'address1'
//     address2?: string; // Change to 'address2'
//     city?: string;
//     zip_code?: string; // Change to 'zip_code'
//   };
//   image_url: string;
// };

// const RestaurantList: React.FC = () => {
//   const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

//   const fetchRestaurants = async (): Promise<void> => {
//     try {
//       // Make the Yelp API request
//       const response = await axios.request(yelpOptions);

//       if (response.data.businesses) {
//         const restaurantData: Restaurant[] = response.data.businesses.map(
//           (business: Restaurant) => ({
//             id: business.id,
//             name: business.name,
//             location: {
//               state: business.location.state,
//               country: business.location.country,
//               address1: business.location.address1,
//               address2: business.location.address2,
//               city: business.location.city,
//               zip_code: business.location.zip_code,
//             },
//             image_url: business.image_url,
//           })
//         );

//         setRestaurants(restaurantData);
//       }
//     } catch (error) {
//       console.error('Error fetching restaurant data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchRestaurants();
//   }, []);

//   return (
//     <div className={styles['restaurant-list-container']}>
//       {restaurants.map((restaurant) => (
//         <div key={restaurant.id} className={styles['restaurant-card']}>
//           <RestaurantCard imageUrl={restaurant.image_url} name={restaurant.name} address={restaurant.location.address1!}/>
//           {/* <img
//             className={styles['restaurant-image']}
//             src={restaurant.image_url}
//             alt={restaurant.name}
//           /> */}
//           {/* <p>{restaurant.name}</p> */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RestaurantList;

import React, { useState } from 'react';
import axios from 'axios';
import RestaurantCard from '../Card/restaurantcard2.component';
import styles from './resturaunts.module.scss'; // Adjust the import path

// Define the initial Yelp API request options without the location
const initialYelpOptions = {
  method: 'GET',
  url: 'http://localhost:8080/https://api.yelp.com/v3/businesses/search',
  params: {
    term: 'restaurants',
    limit: 30,
  },
  headers: {
    Authorization:
      'Bearer v6Fp_iceiGQRtNa-70WurQPuBzfVS0ldqpsjk29erOHeFTijSZ0i4f1XEK2YPwWTyXp14gxEaG7w17_NXgvteI6YQ7tbbusqgxKgIRzvGQoEML_OJNfCv-TpVVsYZXYx', // Replace with your Yelp API Key
  },
};

type Restaurant = {
  id: string;
  name: string;
  location: {
    state?: string;
    country?: string;
    address1?: string;
    address2?: string;
    city?: string;
    zip_code?: string;
  };
  image_url: string;
};

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [location, setLocation] = useState<string>(''); // State to store the user-provided location

  // Combine the initial options with the user-provided location
  const yelpOptions = {
    ...initialYelpOptions,
    params: {
      ...initialYelpOptions.params,
      location: location, // Set the location from user input
    },
  };

  const fetchRestaurants = async (): Promise<void> => {
    try {
      // Make the Yelp API request
      const response = await axios.request(yelpOptions);

      if (response.data.businesses) {
        const restaurantData: Restaurant[] = response.data.businesses.map(
          (business: Restaurant) => ({
            id: business.id,
            name: business.name,
            location: {
              state: business.location.state,
              country: business.location.country,
              address1: business.location.address1,
              address2: business.location.address2,
              city: business.location.city,
              zip_code: business.location.zip_code,
            },
            image_url: business.image_url,
          })
        );

        setRestaurants(restaurantData);
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // Prevent the form from submitting and reloading the page
    fetchRestaurants(); // Call the API after the form is submitted
  };

  return (
    <div>
      <div className={styles['form-holder']}>

      </div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter location as City, State(Abbreviation)"
          value={location}
          onChange={(e): void => setLocation(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className={styles['restaurant-list-container']}>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className={styles['restaurant-card']}>
            <RestaurantCard
              imageUrl={restaurant.image_url}
              name={restaurant.name}
              address={restaurant.location.address1!}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;

