import { Component } from "preact";
export default class extends Component{

    onlogin(ee){
        ee.preventDefault()
        console.log('****',this.state);
    }
    render(){
        return(<>        
            <div>
                <h1 style={{textAlign:'center',textDecoration:'underline'}}>LOGIN</h1>
            </div>

            <form onSubmit={(ee)=>this.onlogin(ee)}>
                <label htmlFor="email"><span style={{fontSize:'1.1em',fontWeight:'bold'}}>Email</span>
                    
                    <input value={this.state.email} onChange={(ee)=>this.setState({email:ee.target.value})} type="email" id="email" required/>
                </label>
                <label htmlFor="password"><span style={{fontSize:'1.1em',fontWeight:'bold'}}>Password</span>
                    <input value={this.state.password} onChange={(ee)=>this.setState({password:ee.target.value})} type="password" id="password" required/>
                </label>
                <button>LOGIN</button>
            </form>
        </>)

    }
}
