import { Component } from "preact";
import db from '../db'
import _ from 'lodash'
import UserTable from './usertable'
export default class extends Component{
    state={record_id:0}
    removeRecord(id){
        this.setState({record_id:id})
    }
    async removeRecord1(id){
        try{
            this.setState({loading:true})

            await db.collection('billdetail').delete(id);
            let  dt=[...this.state.sellDetail]
            _.remove(dt,ob=>ob.id==id)

            this.setState({sellDetail:dt})
        }catch(error){
            console.log('****',error)
            this.setState({error:`ERROR: ${error.message}`})
        }
        finally{
            this.setState({loading:false})
        }
    }
    async componentDidMount(){
        try{
            this.setState({loading:true})
            const dt = await db.collection('billdetail').getList(1, 5, {sort:'-created'})
            this.setState({sellDetail:dt.items})
        }catch(error){

            console.log('****',error)
            this.setState({error:`ERROR: ${error.message}`})
        }
        finally{
            this.setState({loading:false})
        }
    }
    render(){
        return (
        <>        
            <h4>Recent Sell Report</h4>
            {this.state.loading?<article aria-busy="true"></article>:''}
            <p style={{color:'rgb(255,0,0)',fontSize:'140%'}}>{this.state.error??''}</p>
            {
                this.state.sellDetail && <UserTable onremove={id=>this.removeRecord(id)} detail={this.state.sellDetail}></UserTable> 
            }
            <dialog open={this.state.record_id!=0}>
                <div>
                    <h2>Do you really Want to Remove a record?</h2>
                    <div style={{display:'flex',gap:'.4em'}}>
                        <button onClick={ee=>{this.removeRecord1(this.state.record_id);this.setState({record_id:0})}} className="secondary">Remove</button>
                        <button onClick={ee=>{this.setState({record_id:0})}}>Close</button>
                    </div>
                </div>
            </dialog>  
            {/* {
                this.state.sellDetail && 
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Sr.</th>
                            <th>ID</th>
                            <th>Product Detail</th>
                            <th>Quntity</th>
                            <th>Total Price</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.sellDetail.map((record,indx)=>
                            <>
                                <tr>
                                    <td rowSpan={record.productlist.length}>{indx+1}</td>
                                    <td rowSpan={record.productlist.length}>{record.id}</td>
                                    <td>
                                       {record.productlist[0].product.name} - ({record.productlist[0].product.weight})
                                    </td>
                                    <td>
                                        {record.productlist[0].quantity}    
                                    </td>
                                    <td rowSpan={record.productlist.length}>{_.sumBy(record.productlist,ob=>(ob.product.price*ob.quantity))}</td>
                                    <td rowSpan={record.productlist.length}>
                                        {new Date(record.created).toLocaleDateString()}
                                    </td>
                                </tr>
                                {
                                        record.productlist.map((product,indx1)=>
                                            indx1!==0 && 
                                            <tr>                                               
                                                <td>{product.product.name} - ({product.product.weight})</td>
                                                <td>{product.quantity}</td>
                                            </tr>
                                        )
                                    }
                            </>
                            )
                        }
                    </tbody>
                </table>
            } */}
        </>)

    }
}
