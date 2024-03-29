import React from 'react';
import Classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[
{label : 'Salad' , type : 'salad'},
{label : 'Bacon' , type : 'bacon'},
{label : 'Cheese' , type : 'cheese'},
{label : 'Meat' , type : 'meat'},
];

const buildControls=(props)=>
{
  return (<div className={Classes.BuildControls}> 
    <p> Total Price : <strong>{props.price.toFixed(2)}</strong></p>
     {controls.map(ctrl => {
         return <BuildControl key={ctrl.label} label={ctrl.label}
          added={() => {props.ingredientAdded(ctrl.type)}}
          subtracted={() => {props.ingredientSubtracted(ctrl.type)}}
          disabled={props.disabled[ctrl.type]}/>;
     })}
     <button className={Classes.OrderButton} onClick={props.ordered} disabled={!props.purchasable}>ORDER NOW </button>
  </div>);
};

export default buildControls;