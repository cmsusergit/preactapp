import _ from "lodash";
import { Component } from "preact";

export default class UserTable extends Component{
    render(){
        return(
        <>
            <div className="usertable-container">
                <div className="usertable-header">
                    <div>Sr.</div>
                    <div>Client Detail</div>
                    <div>Product Detail</div>

                    <div className="hidecolumn">Total Price</div>
                    <div className="hidecolumn"></div>
                </div>
                {
                    this.props.detail.map((record,indx)=>
                        <div className="usertable-row">
                            <div className="usertable-indx">{indx+1}</div>
                            <header>{record.client_name} ({record.client_contact})</header>
                            <div>
                                <div style={{fontWeight:'bold'}} className="usertable-column">
                                    <div>Produt Name</div>
                                    <div>Quantity</div>
                                    <div>Price</div>
                                </div>
                                {record.productlist.map((ob,indx1)=>{
                                    return(                                         
                                        <div className="usertable-column">
                                            <div>{ob.product.name} - ({ob.product.weight})</div>
                                            <div>{ob.quantity}</div>
                                            <div>{ob.product.price*ob.quantity}</div>
                                        </div>
                                    )
                                })}
                               </div>
                            <div className="hidecolumn">{_.sumBy(record.productlist,ob=>(ob.product.price*ob.quantity))}</div>
                            <div className="hidecolumn">
                                    <button onClick={ee=>window.location.href=`/detail/${record.id}`} className="usertable-button">
                                    <svg class="svg-icon" viewBox="0 0 20 20">
                                        <path fill="none" d="M9.896,3.838L0.792,1.562v14.794l9.104,2.276L19,16.356V1.562L9.896,3.838z M9.327,17.332L1.93,15.219V3.27
                                            l7.397,1.585V17.332z M17.862,15.219l-7.397,2.113V4.855l7.397-1.585V15.219z"></path>
                                    </svg>
                                    </button>

                                    <button onClick={ee=>this.props.onremove(record.id)} className="secondary usertable-button">
                                       <svg class="svg-icon" viewBox="0 0 20 20">
                                            <path fill="none" d="M7.083,8.25H5.917v7h1.167V8.25z M18.75,3h-5.834V1.25c0-0.323-0.262-0.583-0.582-0.583H7.667
                                                c-0.322,0-0.583,0.261-0.583,0.583V3H1.25C0.928,3,0.667,3.261,0.667,3.583c0,0.323,0.261,0.583,0.583,0.583h1.167v14
                                                c0,0.644,0.522,1.166,1.167,1.166h12.833c0.645,0,1.168-0.522,1.168-1.166v-14h1.166c0.322,0,0.584-0.261,0.584-0.583
                                                C19.334,3.261,19.072,3,18.75,3z M8.25,1.833h3.5V3h-3.5V1.833z M16.416,17.584c0,0.322-0.262,0.583-0.582,0.583H4.167
                                                c-0.322,0-0.583-0.261-0.583-0.583V4.167h12.833V17.584z M14.084,8.25h-1.168v7h1.168V8.25z M10.583,7.083H9.417v8.167h1.167V7.083
                                                z"></path>
                                        </svg>                                
                                    </button>
                            </div>
                            <footer className="usertable-foot">                                
                                <div>Total</div>                                
                                <div>{_.sumBy(record.productlist,ob=>(ob.product.price*ob.quantity))}</div>
                                <div style={{display:'flex'}}>





                                    
                                    <button onClick={ee=>window.location.href=`/detail/${record.id}`} className="usertable-button">
                                      <svg class="svg-icon" viewBox="0 0 20 20">
                                            <path fill="none" d="M9.896,3.838L0.792,1.562v14.794l9.104,2.276L19,16.356V1.562L9.896,3.838z M9.327,17.332L1.93,15.219V3.27
                                                l7.397,1.585V17.332z M17.862,15.219l-7.397,2.113V4.855l7.397-1.585V15.219z"></path>
                                        </svg>
                                    </button>
                                    <button onClick={ee=>this.props.onremove(record.id)} className="secondary usertable-button">
                                        <svg class="svg-icon" viewBox="0 0 20 20">
                                            <path fill="none" d="M7.083,8.25H5.917v7h1.167V8.25z M18.75,3h-5.834V1.25c0-0.323-0.262-0.583-0.582-0.583H7.667
                                                c-0.322,0-0.583,0.261-0.583,0.583V3H1.25C0.928,3,0.667,3.261,0.667,3.583c0,0.323,0.261,0.583,0.583,0.583h1.167v14
                                                c0,0.644,0.522,1.166,1.167,1.166h12.833c0.645,0,1.168-0.522,1.168-1.166v-14h1.166c0.322,0,0.584-0.261,0.584-0.583
                                                C19.334,3.261,19.072,3,18.75,3z M8.25,1.833h3.5V3h-3.5V1.833z M16.416,17.584c0,0.322-0.262,0.583-0.582,0.583H4.167
                                                c-0.322,0-0.583-0.261-0.583-0.583V4.167h12.833V17.584z M14.084,8.25h-1.168v7h1.168V8.25z M10.583,7.083H9.417v8.167h1.167V7.083
                                                z"></path>
                                        </svg> 
                                    </button>
                                </div>
                            </footer>
                        </div>
                    )
                }
            </div>        
        </>)
    }
}