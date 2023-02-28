import React,{lazy, useState, Suspense} from 'react';
import ReactDOM  from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import { IMG_CDN_URL} from './constants';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Error from './components/Error';
import Contact from './components/Contact';
import RestaurantMenu from './components/RestaurantMenu';
import  Profile  from './components/ProfileClass';
import Shimmer from './components/Shimmer';
import UserContext from './utils/UserContext';
//import Instamart from './components/Instamart';


            // <Header/> - Logo, Nav Items, Cart
            // <Body/>
            //        - SearchBar
            //        - RestaurantList
            //        - Restaurant Card - image, name, rating, cuisines, tags
            // <Footer/>  Links, Copyright, 
            
const  Instamart = lazy(()=> import("./components/Instamart")); 

const About = lazy(()=>import("./components/About"));

// upon on demand loading -> upon render -> suspend loading

const AppLayout = () =>{
    console.log(useState());
    const [user, setUser] = useState({
        name:"Divya Chhabra",
        email:"support@namastedev.com"
    })
    return (
        <>
        
        <UserContext.Provider value={{user:user, setUser:setUser}}>
            <Header/>
            <Outlet/>
            <Footer/>
        </UserContext.Provider>
        </>
       
    )
}

const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        errorElement:<Error/>,
        children:[
            {
                path:"/",
                element:<Body/>
            },
            {
                path:"/about",
                element:<Suspense fallback={<h1>Loading....</h1>}><About/></Suspense>,
                children:[{
                    path:"profile",
                    element:<Profile/>
                }]
            },
            {
                path:"/contact",
                element:<Contact/>
            },
            {
                path:"/restaurant/:id",
                element:<RestaurantMenu/>
            },
            {
                path:"/instamart",
                element:<Suspense fallback={<Shimmer/>}><Instamart/></Suspense>
            }
        ]
    }  

])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);