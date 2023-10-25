import { Component } from "preact";
export default class Header extends Component{

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
                    <li><a href="/">Home</a></li> 
                    <li><a href="/bill">Bill</a></li> 
                    <li><a href="/about">About</a></li>
                    <li><a href="/login" role="button">Login</a></li>
                </ul>
            </nav>
        </>)
    }
}