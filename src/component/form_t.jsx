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
            {
                this.state.detail && 
                <>
                    <div className="detail-container">
                        <div style={{borderBottom:'1px solid lightgray'}}><b>Client Name: </b></div>
                        <div style={{borderBottom:'1px solid lightgray'}}>{this.state.detail.client_name}</div>
                        <div style={{borderBottom:'1px solid lightgray'}}><b>Client Contact: </b></div>
                        <div style={{borderBottom:'1px solid lightgray'}}>{this.state.detail.client_contact}</div>
                        <div style={{borderBottom:'1px solid lightgray'}}><b>Client Email: </b></div>
                        <div style={{borderBottom:'1px solid lightgray'}}>{this.state.detail.client_email}</div>
                        <div style={{borderBottom:'1px solid lightgray'}}><b>Client Address: </b></div>
                        <div style={{borderBottom:'1px solid lightgray'}}>{this.state.detail.client_addr}</div>
                    </div>
                    <div>
                        <div style={{marginTop:'1em',borderBottom:'1px solid lightgray'}}><b>Product Detail: </b></div>
                        <div>
                            <table style={{width:'100%'}}>
                                <thead>
                                    <tr>
                                        <th>Prduct Name</th>
                                        <th>Unit Price</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                {
                                    this.state.detail.productlist.map(product=> 
                                        <tr>
                                            <td>{product.product.name} - ({product.product.weight})</td>
                                            <td>{product.product.price}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.product.price * product.quantity}</td>
                                        </tr>
                                    )
                                }
                                <tr><td style={{textAlign:'center',fontWeight:'bold'}} colSpan={4}>Total: {_.sumBy(this.state.detail.productlist,ob=>ob.product.price*ob.quantity)}</td></tr>
                            </table>
                        </div>
                    </div> 
                    <div>
                        <a style={{padding:'0.4em',float:'right'}} href="/" role='button'>Goto MainPage</a>
                        <div style={{clear:'both'}}></div>
                    </div>
                    </>
            }
        </>)
    }
} 