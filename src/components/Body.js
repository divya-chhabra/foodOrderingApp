// import { restaurantlist } from "../constants";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from 'react-router-dom';
import { filterData } from "../utils/helper";
import useOnline from '../utils/useOnline';
import UserContext from "../utils/UserContext";

// const filterData = (searchText, allRestaurants) => {
//   return allRestaurants.filter((restaurant) =>
//     restaurant?.data?.name?.toLowerCase()?.includes(searchText.toLowerCase())
//   );
// };

const Body = () => {
  // let SearchTxt = "KFC";

  // SearchText is a local state variable
  const [searchText, setSearchText] = useState(""); // To create State variables
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const { user, setUser } = useContext(UserContext);

  console.log("render ()");

  

  useEffect(() => {
    console.log(" Use Effect Called");
    getRestaurants();
  }, []);

  

  async function getRestaurants() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.900965&lng=75.8572758&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
  }

  const isOnline = useOnline();

  if(!isOnline){
    return <h1>Offline, Check your Internet Connection</h1>
  }

  

  // Early Return
  if (!allRestaurants) return null;

  return allRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="search-container p-5 bg-pink-50 my-5">
        <input
          type="text"
          className="focus:bg-green-200 p-2 m-2"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="p-2 m-2 bg-purple-900 text-white rounded-md"
          onClick={() => {
            const data = filterData(searchText, allRestaurants);
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>

        <input value={user.name} onChange={(e) => setUser({
          ...user,
          name:e.target.value, 
          
          }) 
        }/>

      <input value={user.email} onChange={(e) => setUser({
          ...user,
          email:e.target.value, 
          
          }) 
        }/>

      </div>

      <div className="flex flex-wrap">
        {filteredRestaurants.length == 0 ? (
         
            <h1>No match found</h1>
          
        ) : (
          filteredRestaurants.map((restaurant) => {
            return (
              <Link to={"/restaurant/" + restaurant.data.id} key={restaurant.data.id}>
              <RestaurantCard {...restaurant.data} user={user} />
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default Body;
