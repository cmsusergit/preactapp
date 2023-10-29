import { Component } from "preact";
import db from '../db'

export default class extends Component{
    async componentDidMount(){
        try{
            this.setState({loading:true})
            const dt = await db.collection('product').getFullList({sort:'name'})
            this.setState({productList:dt})
        }catch(error){
            console.log('****',error)
            this.setState({productList:[],error:`ERROR: ${error.message}`})

        }
        finally{
            this.setState({loading:false})
        }
    }
    render(){
        return(
        <>
            <h4>Product Detail</h4>
            {this.state.loading?<article aria-busy="true"></article>:''}
            <p style={{color:'rgb(255,0,0)',fontSize:'140%'}}>{this.state.error??''}</p>
            {

                this.state.productList && 
                <div>











                    <div className="producttable-header" style={{textAlign:'center',padding:'0.1em',borderBottom:'1px solid lightgrey'}}>
                        <div>Sr.</div>
                        <div>Product Name</div>
                        <div>Unit Price</div>
                        <div>Remaining Quantity</div>
                        <div></div>
                    </div>
                    {
                        this.state.productList.map((product,indx)=>{
                            return(
                                <div className="grid" style={{textAlign:'center',padding:'0.1em',borderBottom:'1px solid lightgrey'}}>
                                    <div>{indx+1}</div>
                                    <div className="producttable-column">Product Name</div> <div>{product.name} - ({product.weight})</div>
                                    <div className="producttable-column">Unit Price</div><div>{product.price}</div>
                                    <div className="producttable-column">Remaining Quantity</div><div>{product.quantity}</div>
                                    <div style={{display:'flex',paddingTop:'0.2em',gap:'.1em'}}><button style={{padding:'.1em'}}>UPDATE</button><button className="secondary" style={{padding:'.2em'}}>REMOVE</button></div>
                                </div>
                            )
                        })
                    }
                </div>
            }       
        </>)
    }
}