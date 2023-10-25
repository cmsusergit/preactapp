import { Component } from "preact";
import db from "../db";

export default class Header extends Component{
    componentDidMount(){
        console.log('****',db.authStore);
        this.setState({isLoggedIn:db.authStore.isValid})
    }

    render(){
        return (
        <>    

            <nav className="header_menu">
                <ul>                    
                    <li>
                        <a style={{backgroundColor:'grey',color:'white'}} href="/"><strong>SHAYONA FERTILIZER</strong></a>
                    </li>
                </ul>
                <ul>
                    {   
                        this.state.isLoggedIn?
                        <>
                            <li><a href="/">Home</a></li> 
                            <li><a href="/bill">Bill</a></li> 
                            <li><a href="/about">About</a></li>
                            <li><a href="/" onClick={(ee)=>{db.authStore.clear();window.location.href='/login'}} role="button">Logout</a></li>
                        </>:
                        <>
                            <li><a href="/about">About</a></li>
                            <li><a href="/login" role="button">Login</a></li>
                        </>
                    }
                </ul>
            </nav>
 
            {this.state.isLoggedIn && <h4 style={{borderBottom:'2px solid grey',textAlign:'center'}}>{db.authStore.model.name}</h4>}
        </>)
    }
}
