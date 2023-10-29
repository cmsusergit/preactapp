import { Component, createRef } from "preact";
import db from "../db";

export default class Header extends Component{
    refmenu = createRef();
    componentDidMount(){
        console.log('****',db.authStore);
        this.setState({isLoggedIn:db.authStore.isValid,isopen:true})
    }
    openmenu(){
        this.setState({isopen:!this.state.isopen});
        this.refmenu.current.className=this.state.isopen?'showbtn':'hidebtn';
    
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
                <button id='openmenu' onClick={()=>this.openmenu()} style={{fontSize:'1.4em',padding:'.2em'}} className="outline" type="button">{this.state.isopen ? '☰' : 'X'}</button>    
                <ul ref={this.refmenu} className="hidebtn">
                    {   
                        this.state.isLoggedIn?
                        <>
                            <li><a href="/">HOME</a></li> 
                            <li><a href="/buyproduct">BUY</a></li>
                            <li><a href="/sellproduct">SELL</a></li>
                            <li><a href="/inventory">INVENTORY</a></li> 
                            <li><a href="/about">ABOUT</a></li>
                            <li><a href="/" onClick={(ee)=>{db.authStore.clear();window.location.href='/login'}} role="button">LOGOUT</a></li>
                        </>:
                        <>
                            <li><a href="/about">ABOUT</a></li>
                            <li><a href="/login" role="button">LOGIN</a></li>
                        </>
                    }
                </ul>
            </nav>
 
            {this.state.isLoggedIn && <h4 style={{borderBottom:'2px solid grey',textAlign:'center'}}>{db.authStore.model.name}</h4>}
        </>)
    }
}


