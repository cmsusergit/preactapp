import { Component } from "preact"
import db from "../db";
import _ from "lodash";
export default class FormBill extends Component{
    state={productList:[],billDetail:{},loading:false,selectedProduct:'',selectedQuantity:0,error:''}
    
    async onsubmit(ee){
        ee.preventDefault()
        this.setState({loading:true})
        console.log('****',this.state.billDetail);
        let billRecord=''
        try{
            
            billRecord = await db.collection('billdetail').create(this.state.billDetail);
            console.log(billRecord)
            window.location.href='/'
        }
        catch(error){
                console.log('****',error);
        }
        finally{
            this.setState({loading:false})
        }
    }
    updateOrderDetail(){
        if(!this.state.selectedProduct){
            alert('Name Required')
           return
        }         
        if(!this.state.selectedQuantity || this.state.selectedQuantity==0){
            alert('Quantity Required')
           return
        } 
        let temp1={...this.state.billDetail}
        if(!temp1.productlist)
            temp1.productlist=[]
        if(_.findIndex(temp1.productlist,product=>product.product.id==this.state.selectedProduct)!==-1)
            return
        const currProduct=this.state.productList.find(ob=>ob.id==this.state.selectedProduct)        
        temp1.productlist=[...temp1.productlist,{product:currProduct,quantity:this.state.selectedQuantity}]    
        this.setState({billDetail:temp1})
        let totalBillPrice=0
        temp1.productlist.map(product=>{            
            totalBillPrice=totalBillPrice+(product.product.price*product.quantity)                                  
        })
        this.setState({totalBillPrice:totalBillPrice})
        this.setState({selectedProduct:'',selectedQuantity:0})
    }
    removeOrder(id){
        let temp1={...this.state.billDetail}
        _.remove(temp1.productlist,ob=>ob.product.id==id)
         let totalBillPrice=0

        temp1.productlist.map(product=>{            
            totalBillPrice=totalBillPrice+(product.product.price*product.quantity)
        })
        this.setState({billDetail:temp1,totalBillPrice:totalBillPrice})
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
            if(!dt || dt.length==0){
                this.setState({error:'Unauthorized'})
                return
            }
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
            <p style={{color:'rgb(255,0,0)',fontSize:'140%'}}>{this.state.error??''}</p>
            {this.state.loading?<article aria-busy="true"></article>:''}
            <form onSubmit={ee=>this.onsubmit(ee)}>   
                <article> 
                    <header>Client Information</header>       
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
                </article>
                <article> 
                    <header>Select Product</header>
                    <div className="flex-container">
                        <label htmlFor="product"> Product
                            <select value={this.state.selectedProduct} onChange={ee=>this.setState({selectedProduct:ee.target.value})} id="product">
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
                {(this.state.billDetail && this.state.billDetail.productlist && this.state.billDetail.productlist.length>0) && 
                    <div style={{marginBottom:'2em',overflow:'auto'}}>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{textAlign:'center',fontWeight:'bold'}}>Product Name</th>
                                    <th style={{textAlign:'center',fontWeight:'bold'}} width="40">Quantity</th>
                                    <th style={{textAlign:'center',fontWeight:'bold'}}>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.billDetail.productlist.map((product)=>{
                                    return(
                                        <tr key={product.product.id}>
                                            <td style={{textAlign:'center',padding:'0px'}}>{product.product.name} - {product.product.weight}</td>
                                            <td style={{textAlign:'center',padding:'0px'}}>{product.quantity}</td>
                                            <td style={{textAlign:'center',padding:'0px'}}>{product.product.price*product.quantity}</td>                                            
                                            <td style={{textAlign:'center',paddingTop:'1em',paddingBottom:'0px'}}>
                                                <button onClick={()=>this.removeOrder(product.product.id)} className="secondary" style={{padding:'0.2em'}} type="button">Remove</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td style={{backgroundColor:'gray',color:'white',textAlign:'right',fontSize:'1.1em',fontWeight:'bold'}} colSpan={4}>Total Bill: {this.state.totalBillPrice}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                }
                <div>
                    <button aria-busy={this.state.loading} type="submit">{!this.state.loading?'SUBMIT':'Please, Wait....'}</button>
                </div>
            </form>
        </>)


    }
}

