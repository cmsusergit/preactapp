import { Component, render } from "preact"
export default class FormBill extends Component{

    state={productList:[],billDetail:{},loading:false,error:''}
    addProduct(){

        console.log('****');
        let temp1={...this.state.billDetail}//....
        //....
        temp1.product.push({name:'',weight:1,price:0,quantity:0})
        this.setState(temp1)
    }

    async componentDidMount(){  
        try{
            const url1='https://shayonafertilizer.pockethost.io/api/collections/product/records'
            this.setState({loading:true})
            const resp=await fetch(url1)
            const dt=await resp.json()
            this.setState({productList:dt.items})//....
            //....

            this.setState({loading:false})
            this.setState({
                billDetail:{
                    name:'',
                    contact:'',
                    email:'',
                    addr:'',
                    product:[
                      {name:'',weight:1,price:0,quantity:0}
                    ]
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
            <form>                
                <div>
                    <label for="cname">Full Name
                        <input type="text" id="cname" name="cname" placeholder="Full Name" required/>
                    </label>
                </div>
                <div class="grid">
                    <label for="contact">Contact
                        <input type="text" id="contact" name="contact" placeholder="Contact Number" required/>
                    </label>
                    <label for="email">Email
                        <input type="email" id="email" name="email" placeholder="Email" required/>
                    </label>
                </div>
                <div>
                    <label for="addr">Address
                        <textarea id="addr" name="addr" placeholder="Address" required/>
                    </label>
                </div>
                <article> 
                    <header>Select Product</header>
                    <div className="flex-container">
                        <label htmlFor="product"> Product
                            <select onChange={ee=>console.log(ee.target.value)} id="product" required>
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
                            <input type="number" name="quantity" id="quantity" min={0}/>
                        </label>                                
                        <button onClick={()=>this.addProduct()} className="flex-btn" type="button">+</button>
                    </div>
                    <footer style={{textAlign:'right',fontWeight:'bold'}}>Total Price:{}</footer>
                </article>
                <div>
                    <button type="submit">SUBMIT</button>
                </div>
            </form>
        </>)
    }
}