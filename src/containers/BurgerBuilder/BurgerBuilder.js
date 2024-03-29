import React ,{ Component} from 'react';
import Aux from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import orderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGERDIENT_PRICES=
{
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
}

class BurgerBuilder extends Component
{
    state={
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0
        },
        totalPrice : 4,
        purchesable : false,
        purchasing : false,
        loading : false
    }

 
    purchaseHandler =()=>
    {
        this.setState({purchasing : true});
    }

    purchaseCloseHandler = () =>
    {
        this.setState({purchasing : false});
    }

   

    purchaseContinueHandler=()=>
    {
       // alert("You continue ;)");
       this.setState({loading : true});

       const order={
           ingredients : this.state.ingredients,
           price : this.state.totalPrice,
           customer : {
               name : 'Jagannath R Kulakarni',
               address : {
                   street : '4th block',
                   zipCode : '570029',
                   country : 'India'
               },
               email : 'jagannathrkulakarni.171845@gmail.com'
           },
           deliveryMethod : 'fastest'
       }
       axios.post('/orders.json',order)
       .then(response => {
           this.setState({loading : false, purchasing : false});
       })
       .catch(error => {
           this.setState({loading : false , purchasing : false});
       })
       ;
    }
    updatePurchaseState(ingredients)
    {
        

        const sum=Object.keys(ingredients).map(
            igKey =>
            {
                return ingredients[igKey];
            }
        ).reduce((sum,el)=>{
            return sum+el;
        },0);

        this.setState({purchesable : sum > 0})
    }
   addIngredientHandler = (type) =>
   {
    const oldCount=this.state.ingredients[type];
    const updatedCount=oldCount+1;
    const updatedIngredients={
        ...this.state.ingredients
    };
    updatedIngredients[type]=updatedCount;
    const priceAddition=INGERDIENT_PRICES[type];
    const oldPrice=this.state.totalPrice;
    const newPrice=oldPrice+priceAddition;
    this.setState({totalPrice : newPrice , ingredients : updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
   }

   removeIngredientHandler = (type) =>
   {
     const oldCount=this.state.ingredients[type];
     let updatedCount=oldCount-1;
     if(updatedCount < 0)
     updatedCount=0;

     const updatedIngredients={
         ...this.state.ingredients
     };
     updatedIngredients[type]=updatedCount;
     const priceSubtraction=INGERDIENT_PRICES[type];
     const oldPrice=this.state.totalPrice;
     let newPrice=oldPrice-priceSubtraction;
     if(newPrice < 0)
     newPrice=0;
     this.setState({totalPrice:newPrice , ingredients : updatedIngredients});
     this.updatePurchaseState(updatedIngredients);
   }

  
    render()
    {
        const disabledInfo={
            ...this.state.ingredients
        };

        for(let key in disabledInfo)
        {
            disabledInfo[key]= disabledInfo[key] <= 0
        }

        let orderSummary=<OrderSummary 
        purchaseCancelled={this.purchaseCloseHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
        ingredients={this.state.ingredients}/>;

        if(this.state.loading)
        {
              orderSummary=<Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCloseHandler}>
               {orderSummary}
                </Modal>
                <Burger Ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler} ingredientSubtracted={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchesable}
                ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);