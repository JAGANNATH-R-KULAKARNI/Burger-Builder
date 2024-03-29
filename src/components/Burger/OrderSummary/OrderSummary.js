import React from 'react';
import Aux from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';

const orderSummary= (props) =>
{
    const ingredientSummary=Object.keys(props.ingredients).map(igKey =>{
        return <li><span style={{textTransform : 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li>;
    });
    
    return (
    <Aux>
        <h3>Your Order</h3>
        <p> A delicious burger with the following Ingredients :</p>
        <ul>
             {ingredientSummary}
        </ul>
        <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
        <p>Continue to CheckOut ?</p>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
    );
};

export default orderSummary;