import { render } from 'preact'
import { App } from './app.jsx'
import './index.css'
import Router from 'preact-router'
import Header from './component/header.jsx'
import  About  from './component/about.jsx'
import FormBill from './component/form_t.jsx'
import Login from './component/login.jsx'
const AppMain=()=>{
    return(<div className='container-fluid'>
        <Header></Header>
        <div className='container'>

            <Router>
                <App path='/'/>
                <About path='/about'/>
                <FormBill path='/bill'/>
                <Login path='/login'/>
        </Router>
        </div>
    </div>)
}
render(<AppMain />, document.getElementById('app'))
