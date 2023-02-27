import React, {Component} from 'react';

class Profile extends Component{

    constructor(props){
        super(props);
        this.state = {
            userInfo:{
              login:"Dummy Login",
              id:"Dummy id"
            }}
        console.log("Child - Constructor" + this.props.name);
    }
   async componentDidMount(){
        // API calls
        console.log(" Child - Component did Mount " + this.props.name);
        const data = await fetch("https://api.github.com/users/divya-chhabra");
        const json = await data.json();
        console.log(json);
        this.setState({userInfo:json});

        // this.timer = setInterval(()=>{
        //     console.log("Namaste React")
        // }, 1000);
        
    }
    render(){
        const { count, count2 } = this.state;
        console.log("Child - Render" + this.props.name);
        return(
            <div>
                <h2>Profile Class Component</h2>
                <h3>Login:{this.state.userInfo.login}</h3>
                <h3>Location:{this.state.userInfo.id}</h3>
            </div>
        )
    }
    componentDidUpdate(){
        console.log("Component did update");
    }
    // componentDidUpdate(prevProps, prevState){
    //        if(this.state.count !== prevState.count){
                    // do this
    //         }
    // }
    componentWillUnmount(){
        //clearInterval(this.timer);
        console.log("Component UnMounted");
        
    }

}

export default Profile;