export const getOperatorClass = (operator: Operator) => {
  switch(operator) {
   case "Danielle":
     return 'bg-lime-200';
   case "Pascal":
     return 'bg-orange-200';
   case "Raphaël":
     return 'bg-purple-200';
   default:
     return 'bg-white';
  }
 } 