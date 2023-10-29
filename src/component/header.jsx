import { Component, createRef } from "preact";
import db from "../db";

export default class Header extends Component{
    refmenu = createRef();

    async componentDidMount(){
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
                { 
                    this.props.profile?
                    <ul style={{display:'flex',flexDirection:'row'}}>
                        <li>
                            <img style={{width:'2.8em'}} src={db.files.getUrl(this.props.profile,this.props.profile.logo)} alt="logo"/>
                        </li>
                        <li>
                            <a style={{backgroundColor:'gray',color:'white'}} href="/"><strong>{this.props.profile.name}</strong></a>
                        </li>
                    </ul>
                    :<ul>                    
                        <li>
                            <a style={{backgroundColor:'grey',color:'white'}} href="/"><strong>SHAYONA FERTILIZER</strong></a>
                        </li>
                    </ul>
                }
                <button id='openmenu' onClick={()=>this.openmenu()} style={{fontSize:'1.4em',padding:'.2em'}} className="outline" type="button">{this.state.isopen ? '☰' : 'X'}</button>    
                <ul ref={this.refmenu} className="hidebtn">
                    {   
                        this.state.isLoggedIn?
                        <>
                            <li><a href="/">HOME</a></li> 
                            <li><a href="/buyproduct">BUY</a></li>
                            <li><a href="/sellproduct">SELL</a></li>
                            <li><a href="/product">PRODUCT</a></li> 
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


