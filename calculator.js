
class calculator{
    constructor(current_text,previous_text)
    {
      this.previous_text = previous_text;
      this.current_text = current_text;
      this.allclear()
    }

    allclear(){
        this.currentoperand ='';
        this.previousoperand ='';
        this.operation = null;
    }

    displaynumber(number)
    {  
      let numberdisplay
      const stringno = number.toString();
      const innerdigit = parseFloat(stringno.split('.')[0])
      const decimaldigit = stringno.split('.')[1]
      if(isNaN(innerdigit))
        numberdisplay = '';
      else 
        numberdisplay = innerdigit.toLocaleString('en' , { maximumFractionDigits:0});
      if(decimaldigit != null)
      {
        return `${numberdisplay}.${decimaldigit}`;
      }
      else
        return numberdisplay;
    }

    updatesolution()
    {
       this.current_text.innerText = this.displaynumber(this.currentoperand);
       if(this.operator != null){
        this.previous_text.innerText = `${this.displaynumber(this.previousoperand)} ${this.operator}`;
       }
       else{ this.previous_text.innerText = ''}
    }

    appendnumber(number)
    {  
    if(number === '.' && this.currentoperand.includes('.')) return;
      this.currentoperand =  this.currentoperand.toString() + number.toString();
    }

    appendoperator(operator){
       if(this.currentoperand === '')return;
       if(this.previousoperand != ''){
           this.equalto();
       }
       this.operator = operator;
       this.previousoperand = this.currentoperand;
       this.currentoperand = '';
    }

    equalto()
    {
       let result;
       const prev = parseFloat(this.previousoperand);
       const curr = parseFloat(this.currentoperand);
       if(isNaN(prev) || isNaN(curr)) return;
       switch(this.operator){
            case '+' :result = prev + curr;
                      break;
            case '-' :result = prev - curr;
                      break;
            case '*' :result = prev * curr;
                      break;
            case '/' :result = prev / curr;
                      break;
            default: return;
       }
       this.currentoperand = result;
       this.operator = undefined;
       this.previousoperand = '';
      }

      delete() 
      {
          this.currentoperand = this.currentoperand.toString().slice(0 , -1);
      }
}

const number = document.querySelectorAll('[data-number]')
const operator = document.querySelectorAll('[data-operator]')
const clear = document.querySelector('[data-clear]')
const del = document.querySelector('[data-delete]')
const equals = document.querySelector('[data-equals]')
const current_text = document.querySelector('[data-curr]')
const previous_text = document.querySelector('[data-prev]')


const calci = new calculator(current_text, previous_text)

number.forEach( button => {
    button.addEventListener('click',() => {
        calci.appendnumber(button.innerText)
        calci.updatesolution()
    })
})

operator.forEach( button => {
    button.addEventListener('click',() => {
        calci.appendoperator(button.innerText)
        calci.updatesolution()
    })
})

clear.addEventListener('click' ,() =>{
    calci.allclear();
    calci.updatesolution();
})


equals.addEventListener('click',()=> {
    calci.equalto();
    calci.updatesolution(); 
})

del.addEventListener('click',()=> {
    calci.delete();
    calci.updatesolution(); 
})




