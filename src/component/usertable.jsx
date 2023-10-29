import _ from "lodash";
import { Component } from "preact";
export default class UserTable extends Component{

    render(){
        return(
        <>
            <div className="usertable-container">
                {
                    this.props.detail.map((record,indx)=>
                        <article>
                            <header>{indx+1} - {record.id}</header>
                            <div>

                                {record.productlist.map((ob,indx1)=>{
                                    return(                                         
                                        <div style={{display:'flex',justifyContent:'space-between',textAlign:'center',alignItems:'center','gap':'.4em'}}>
                                            <div style={{width:'50%'}}>{ob.product.name} - ({ob.product.weight})</div>
                                            <div>{ob.quantity}</div>
                                            <div>{ob.product.price*ob.quantity}</div>
                                        </div>
                                    )
                                })}
                            </div>
                            <footer style={{textAlign:'right'}}>{_.sumBy(record.productlist,ob=>(ob.product.price*ob.quantity))}</footer>
                        </article>
                    )
                }

            </div>        
        </>)
    }
}