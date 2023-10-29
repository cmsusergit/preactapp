import { Component, render } from 'preact'
import { App } from './app.jsx'
import './index.css'
import Router from 'preact-router'
import Header from './component/header.jsx'
import  About  from './component/about.jsx'
import FormBill from './component/form_t.jsx'
import BuyProduct from './pagelist/buyproduct.jsx'
import SellProduct from './pagelist/sellproduct.jsx'
import Product from './pagelist/inventory.jsx'
import Login from './component/login.jsx'
import db from './db.js'

class AppMain extends Component{
    async componentDidMount(){
        try{
            this.setState({loading:true})
            const dt = await db.collection('profile').getFullList()
            this.setState({profile:dt[0]})
            this.setState({isLoggedIn:db.authStore.isValid,isopen:true})
        }catch(error){
            this.setState({error:`ERROR: ${error.message}`})
        }
        finally{
            this.setState({loading:false})
        }
    }
    render(){
        return(
            <div className='container-fluid'>
                {this.state.loading && <p style={{fontSize:'1.4em',fontWeight:'bold',textAlign:'center',verticalAlign:'middle'}}>Please Wait, Loading Profile....</p>}
                {
                    this.state.error ? 
                    <p style={{color:'orange',fontSize:'1.4em',justifyContent:'flex-start',alignItems:'center'}}>
                        Error Downloading Profile <br />
                        {this.state.error}
                    </p>
                :
                <>
                    <Header profile={this.state.profile}></Header>
                    <div className='container'>
                        <Router>
                            <App path='/'/>
                            <About profile={this.state.profile} path='/about'/>
                            <FormBill path='/detail/:orderid?'/>
                            <BuyProduct path='/buyproduct'/>
                            <SellProduct path='/sellproduct'/>
                            <Product path='/product'/>
                            <Login path='/login'/>
                        </Router>
                    </div>
              </>}
            </div>
        )
    }
}
render(<AppMain />, document.getElementById('app'))
























