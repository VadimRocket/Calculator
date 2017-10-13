//global veriables
var numbers = document.querySelectorAll('.number'),// выбрали все числа
   operations = document.querySelectorAll('.operation'),//выбрали кнопки с операциями
   decimalBtn  = document.getElementById('decimal'),
   clearBtns = document.querySelectorAll('.clear-btn'),
   resultBtn = document.getElementById('result'), // Результат =
   howWorkBtn = document.getElementById('howWork'),
   display = document.getElementById('display'),// Экран
   MemoryCurrentNumber = 0, // текущее значение 
   MemoryNewNumber = false;  //Ввели мы новое число или нет (false) пссле нажатия на операторы( * / + - ) меняется на  true
   MemoryPendingOperation = '', // сохр-м операцию которая ожидается - значение текушей операции  на которую нажали
   operationsList = document.getElementById('operationsList');





// Повесим обработчики событий на эти кнопки чтоб запускать соотв-е ф-ции когда  и  на какой кнопку было нажатие

for(var i = 0; i < numbers.length; i++){
    var number = numbers[i];
         number.addEventListener('click', function(e){
            numberPress(e.target.textContent);     // textContent - текстовое содержание нашего элемента
         });
};

for(var i = 0; i < operations.length; i++){
    var operationBtn = operations[i];
         operationBtn.addEventListener('click', function(e){
            operation(e.target.textContent); // передаем с ф-цию свойство обьекта e -  textContent - текстовое содержание нашего элемента
         });
    };

for(var i = 0; i < clearBtns.length; i++){
    var clearBtn = clearBtns[i];
         clearBtn.addEventListener('click', function(e){    
               clear(e.srcElement.id);  //  строка с названием id  этой кнопки  
              
        });
    };

    decimalBtn.addEventListener('click', decimal);
    resultBtn.addEventListener('click', result);
    howWorkBtn.addEventListener('click', howWork);

  
function  numberPress(number){
    if(MemoryNewNumber){
        display.value = number; // если true 
        MemoryNewNumber = false;
    }else{
        if(display.value === '0'){
            display.value = number;  // если равно заменяй это значение текущим
         }else{
           display.value += number; // если  не равно прибавляй все знач-я кот ты ввел в виде строки
    }
    };// когда вволим новое число а когда нет
    
 

    console.log('Клик по кнопке с номером ' + number + ' ');
};
function operation(op){
    var  localOperationMemory = display.value;  //какое число было введено в момент нажания на операнд + или -  и т.д
    if(MemoryNewNumber && MemoryPendingOperation !== '='){ // true
        display.value = MemoryCurrentNumber;
    }else{
        MemoryNewNumber = true;
        if(MemoryPendingOperation === '+'){
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        }else if(MemoryPendingOperation === '-'){
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        }else if(MemoryPendingOperation === '*'){
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        }else if(MemoryPendingOperation === '/'){
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        }else{
            // =  результат
             MemoryCurrentNumber = parseFloat(localOperationMemory);
        };
        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = op; // Сохр текущую операцию которую нажали

    }

     console.log('Клик по кнопке с операцией ' + op + ' ');
};
// ф-ция добавления десятичной точки
function decimal(arg){
    var localDecimalMemory = display.value;
        if(MemoryNewNumber){ // если вводится новое число пер дается 0.
            localDecimalMemory = '0.';
            MemoryNewNumber = false;
        }else{
            if(localDecimalMemory.indexOf('.') === -1){
                localDecimalMemory  += '.';
            };
        };
        display.value = localDecimalMemory;

     console.log('Клик по кнопке с десятичной дробью (.) ');
};

function clear(id){ 
    if(id === 'ce'){
       display.value = '0';
       MemoryNewNumber = true;
    }else if(id === 'c'){
         display.value = '0';
       MemoryNewNumber = true;
       MemoryCurrentNumber = 0;
       MemoryPendingOperation = '';
    };
    console.log('Клик по кнопке ' + id+ ' !');
};

// как это работает
function howWork(e){
  
    for (var i = 0; i < operations.length; i++) {
        var newLi = document.createElement('li');
        var operationText = operations[i].value;  
        newLi.innerText = operationText;
        operationsList.appendChild(newLi); 

    };
     console.log(e);
     console.log('Клик по кнопке Как это работает !');
};