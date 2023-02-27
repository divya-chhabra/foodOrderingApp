import { useEffect, useState } from "react";

const Profile = (props) => {

    const [count,setCount] = useState(0);
     const [count2,setCount2] = useState(0);


    //  useEffect(()=>{
    //     setInterval(()=>console.log("React OP"), 1000);

    //     return ()=>{
           // clearInterval- This function will be called while unmounting
    //     }
    //  },[])
    //  useEffect(()=>{
    //     // API call
    //     console.log("Use Effect Called");
    //  })
    //  console.log("Render()");
    return (
        <div>
            <h2>Profile Component</h2>
            <h3>Name:{props.name}</h3>
            <h3>Count: {count}</h3>
            <button onClick={()=>{setCount(1);setCount2(2)}}>Increase Count</button>
        </div>
        
    )

}

export default Profile;