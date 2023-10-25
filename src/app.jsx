import './app.css'
import { Component } from 'preact'
import { List } from './component/list'
import '@picocss/pico'
import FormBill from './component/form_t'
export class App extends Component{
  state={title:''}
  componentDidMount(){
  }
  render(){
    return (<>


      <h1>Main Page</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil praesentium incidunt perferendis enim dolore modi soluta optio sit ut, neque quasi quaerat officiis, minus quisquam suscipit fugiat ducimus dignissimos. Optio dolore voluptas ab aliquam molestias maxime enim minima, dolorum ipsam nesciunt consectetur quos possimus vitae sequi? Nemo accusantium adipisci odio illo! Hic, eius magni tempora exercitationem obcaecati nesciunt ullam ut optio autem laborum. Maiores minima explicabo modi ut, in, consectetur quaerat itaque deleniti illum quasi aliquid odit velit at impedit ipsum assumenda saepe est. Dicta sint ipsum ab quae iste corporis autem sunt quisquam nemo. Quasi asperiores voluptas dicta illo!</p>
    </>)
  }
}