import { Component } from "preact";
import db from "../db";
export default class extends Component{

    render(){
        return(
            <>
                <h1>ABOUT</h1>
                <article>
                    <header style={{display:'flex',justifyContent:'space-between',fontWeight:'bold',alignItems:'center',flexDirection:'row'}}>
                        <div><img style={{width:'2.2em'}} src={db.files.getUrl(this.props.profile,this.props.profile.logo)} alt="logo" /></div>
                        <div>{this.props.profile.name}</div>
                    
                    </header>
                    <div style={{height:'80vh'}}>
                        <div>
                            <div><b>Address</b></div><div>{this.props.profile.addr}</div>
                        
                            <div><b>Contact</b></div><div>{this.props.profile.contact}</div>
                            <div><b>Email</b></div><div>{this.props.profile.email}</div>
                            <div><b>Description</b></div><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, esse ex. Sint dolorum ipsa vero accusantium harum error temporibus, porro alias esse pariatur et quasi voluptas, facere sit architecto, ut cupiditate consectetur? Et sapiente unde id at dolores voluptas sequi, in officia, blanditiis exercitationem quam autem dicta cum nulla. Enim!</div>
                        </div>
                    </div>
                    <footer>&copy; {this.props.profile.name}</footer>
                </article>
            </>
        )
    }
}