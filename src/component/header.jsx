import { Component } from "preact";
export default class Header extends Component{

    render(){
        return (
        <>    
            <nav className="header_menu">
                <ul>
                    <li><strong>SHAYONA FERTILIZER</strong></li>
                </ul>
                <ul>
                    
                    
                    <li><a href="product">Bill</a></li> 
                    <li><a href="/">About</a></li>
                    <li><a href="#" role="button">Login</a></li>
                </ul>
            </nav>
        </>)
    }
}