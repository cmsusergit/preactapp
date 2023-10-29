import { Component } from "preact"
import db from "../db";

import _ from "lodash";
export default class FormBill extends Component{
    state={list:[],loading:false,error:''}
    async componentDidMount(){
        try{
            this.setState({loading:true})
            const dt=await db.collection('billdetail').getOne(this.props.orderid)
            this.setState({detail:dt})
        }
        
        catch(error){
            this.setState({error:`ERROR: ${error.message}`})
        }
        finally{
            this.setState({loading:false})
        }
    }
    render(){
        return(<>
            <p style={{color:'rgb(255,0,0)',fontSize:'140%'}}>{this.state.error??''}</p>
            {this.state.loading?<article aria-busy="true"></article>:''}
            <p>{JSON.stringify(this.state.detail)}</p>
            
            {/* <div>
                <div><b>Client Name: </b>{this.state.detail.client_name}</div>
                <div><b>Client Contact: </b>{this.state.detail.client_contact}</div>
                <div><b>Client Email: </b>{this.state.detail.email}</div>
                <div><b>Client Address: </b>{this.state.detail.client_addr}</div>
                <div><b>Product Detail: </b>{JSON.stringify(this.state.detail.productlist)}</div>
            </div> */}
        </>)





    }
}













