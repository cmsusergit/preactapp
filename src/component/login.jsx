import { Component } from "preact";
import db from '../db'

export default class extends Component{
    state={loading:false}
    async onlogin(ee){
        ee.preventDefault()
        try{
            this.setState({loading:true})
            await db.collection('users').authWithPassword(
                this.state.email,
                this.state.password,

            );
            this.setState({error:''})
            window.location.href='/'
        }catch(error){
            console.log('****',error);
            this.setState({error:`Login Error: ${error.message}`})
        }
        finally{
            this.setState({loading:false})
        }
    }
    render(){
        return(<>        
            <div style={{margin:'1em',fontSize:'1em'}}>
                <h1 style={{textAlign:'center',textDecoration:'underline'}}>LOGIN</h1>
            </div>

            {this.state.error && <p style={{color:'orangered',fontSize:'1.1em'}}>{this.state.error}</p>}
            <form onSubmit={(ee)=>this.onlogin(ee)}>
                <label htmlFor="email"><span style={{fontSize:'1.1em',fontWeight:'bold'}}>Email</span>
                    
                    <input value={this.state.email} onChange={(ee)=>this.setState({email:ee.target.value})} type="email" id="email" required/>
                </label>
                <label htmlFor="password"><span style={{fontSize:'1.1em',fontWeight:'bold'}}>Password</span>
                    <input value={this.state.password} onChange={(ee)=>this.setState({password:ee.target.value})} type="password" id="password" required/>
                </label>
                <button aria-busy={this.state.loading}>{!this.state.loading?'LOGIN':'Please Wait....'}</button>
            </form>
        </>)

    }
}


