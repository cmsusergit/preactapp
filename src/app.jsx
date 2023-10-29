import './app.css'
import { Component } from 'preact'

import '@picocss/pico'
import List from './component/list'
export class App extends Component{
  state={title:''}
  componentDidMount(){
  }
  render(){
    return (<>
      <h1>Main Page</h1>

      <List/>
    </>)
  }
}