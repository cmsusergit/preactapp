import './app.css'
import { Component } from 'preact'
import { List } from './component/list'
import Header from './component/header'
import FormBill from './component/form_t'
export class App extends Component{
  state={title:''}
  componentDidMount(){
  }
  render(){
    return (<>


      <div className='container-fluid'>
        <Header/>
        <div className='container'>
          <FormBill/>
        </div>
      </div>
    </>)
  }
}