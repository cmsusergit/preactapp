import { Component } from "preact"
import db from "../db";
import _ from "lodash";

export default class FormBill extends Component{
    state={productList:[],billDetail:{},loading:false,orderDetail:[],selectedProduct:'',selectedQuantity:0,error:''}
    addProduct(){
        console.log('****');
        let temp1=[...this.state.orderDetail,{product_id:'',quantity:0}]//....
        this.setState(temp1)
    }
    
    
    
    updateOrderDetail(){
        console.log(this.state.selectedProduct)
        let temp1=[...this.state.orderDetail]
        if(temp1.findIndex(ob=>ob.product_id==this.state.selectedProduct)==-1)
            temp1.push({product_id:this.state.selectedProduct,quantity:this.state.selectedQuantity})
        console.log(temp1);
        this.setState({orderDetail:temp1})
        this.setState({selectedProduct:'',selectedQuantity:0})
    }
    removeOrder(id){
        let temp1=[...this.state.orderDetail]
        _.remove(temp1,ob=>ob.product_id==id)
        this.setState({orderDetail:temp1})
    }
    updateBillDetail(name,value){
        let temp1={...this.state.billDetail}
        temp1[name]=value
        this.setState({billDetail:temp1})
    }
    async componentDidMount(){  
        try{
            this.setState({loading:true})
            const dt = await db.collection('product').getFullList({
                sort: 'name',
            });
            console.log(dt);
            this.setState({productList:dt,loading:false})
            this.setState({
                billDetail:{
                    client_name:'',
                    client_contact:'',                    
                    client_email:'',
                    client_addr:'',
                }
            })
        }catch(error){    
            this.setState({error:'Error In Fetching Product List'})
            console.log(error);
        }
        finally{
            this.setState({loading:false})
        }
    }
    render(){
        return(<>
            <h1>Product Bill</h1>
            <p style={{color:'rgb(255,0,0)',fontSize:'140%'}}>{this.state.error??''}</p>
            {this.state.loading?<article aria-busy="true"></article>:''}
            <p>{JSON.stringify(this.state.billDetail)}</p>
            <p>{JSON.stringify(this.state.orderDetail)}</p>
            <form>                
                <div>
                    <label for="cname">Full Name
                        <input value={this.state.billDetail.client_name} onChange={(ee)=>this.updateBillDetail('client_name',ee.target.value)} type="text" id="cname" name="cname" placeholder="Full Name" required/>
                    </label>
                </div>
                <div class="grid">
                    <label for="contact">Contact
                        <input value={this.state.billDetail.client_contact} onChange={(ee)=>this.updateBillDetail('client_contact',ee.target.value)} type="text" id="contact" name="contact" placeholder="Contact Number" required/>
                    </label>
                    <label for="email">Email
                        <input value={this.state.billDetail.client_email} onChange={(ee)=>this.updateBillDetail('client_email',ee.target.value)} type="email" id="email" name="email" placeholder="Email" required/>
                    </label>
                </div>
                <div>
                    <label for="addr">Address
                        <textarea value={this.state.billDetail.client_addr} onChange={(ee)=>this.updateBillDetail('client_addr',ee.target.value)} id="addr" name="addr" placeholder="Address" required/>
                    </label>
                </div>
                <div>
                    <article> 
                        <header>Select Product</header>
                        <div className="flex-container">
                            <label htmlFor="product"> Product
                                <select value={this.state.selectedProduct} onChange={ee=>this.setState({selectedProduct:ee.target.value})} id="product" required>
                                    <option value=''>Product Name - (Product Weight) - (Price Per 1kg weight)</option>
                                    {
                                        this.state.productList.map(product=>{
                                            return(
                                                <option key={product.id} value={product.id}>{product.name} - ({product.weight}) - ({product.price})</option>
                                            )
                                        })
                                    }
                                </select>
                            </label>
                            <label htmlFor="quantity"> Quantity
                                <input value={this.state.selectedQuantity} onChange={(ee)=>{
                                    this.setState({selectedQuantity:ee.target.value})
                                }} type="number" name="quantity" id="quantity" min={0}/>
                            </label>                                
                        </div>
                        <footer style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'baseline'}}>
                            <span>Total Price:{this.state.selectedQuantity * (this.state.productList.find(ob=>ob.id==this.state.selectedProduct)?.price||0)}</span>
                            <button onClick={()=>this.updateOrderDetail()} style={{width:'10em',padding:'0.2em'}} type="button">Add Product</button>
                        </footer>
                    </article>
                </div>
                
                
                {(this.state.orderDetail && this.state.orderDetail.length>0) && 
                    <div style={{marginBottom:'2em',border:'1px groove grey'}}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.orderDetail.map((product)=>{
                                    return(
                                        <tr key={product.product_id}>
                                            <td>{this.state.productList.find(ob=>ob.id==product.product_id).name}</td>
                                            <td>{product.quantity}</td>
                                        <td>
                                                <button onClick={()=>this.removeOrder(product.product_id)} className="secondary" style={{padding:'0.2em'}}>Remove</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                }
                <div>
                    <button type="submit">SUBMIT</button>
                </div>
            </form>
        </>)


    }
}

