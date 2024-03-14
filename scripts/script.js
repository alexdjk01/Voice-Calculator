window.onload=() => {
    
    rain_numbers();
    calculatorEvents();
}




function calculatorEvents()
{
    // get the id's of every button in the html page
    const operators = Array.from(document.getElementsByClassName("calculate"));
    const digits = Array.from(document.getElementsByClassName("digit"));
    const actions =Array.from(document.getElementsByClassName("action"));
    let currentResult="";
    let historyResult="";

    //let excludeElements=["+","-","*","/","%","="];
    var lastOperator="undefined";

    // set events for each button tagged as 'operator'
    operators.forEach(operator =>{
        operator.addEventListener("click", function(){
            let currentResult = getCurrent();

            if(operator.id !== "=")
            {
                if(historyResult ==="")
                {
                    historyResult =currentResult;
                    printHistory(historyResult+operator.id);
                    currentResult="";
                    printCurrent(currentResult);
                }
                else
                {
                    historyResult= historyResult + lastOperator + currentResult;
                    //let historyEvaluated = eval(historyResult).toString();
                    printHistory(historyResult+operator.id);
                    currentResult="";
                    printCurrent(currentResult);
                }

                // lastOperator for keeping in mind which operator was vefore the actual one
                // helps to create a string in order to efectuate the operations in thier mathematical order
                lastOperator= operator.id;
            }
            else    // if it's = then we need to evaluate the string with the last digit inputed
            {
                historyResult = historyResult+ lastOperator+ currentResult;
                let result = eval(historyResult); 
                let hasDecimals = result % 1 !== 0;
                let resultWithTwoDecimals = 0;
                if(hasDecimals)
                {
                     resultWithTwoDecimals = result.toFixed(2);
                }
                else
                {
                     resultWithTwoDecimals = result;
                }
                historyResult = "";
                currentResult = resultWithTwoDecimals;
                printCurrent(currentResult);
                printHistory(historyResult);
            }
            
            
        });
    });

    // set events for each button tagged as 'digit'
    digits.forEach(digit =>{
        digit.addEventListener("click", function(){
            currentResult = getCurrent();
            console.log("digit");
            if(currentResult!="")
            {
                if(this.id !== "zero")
                {
                    currentResult=currentResult+this.id;
                    printCurrent(currentResult);
                }
                else
                {
                    currentResult=currentResult+"0";
                    printCurrent(currentResult);
                }
                
            }
            else
            {
                if(this.id !== "zero")
                {
                    currentResult=this.id;
                    printCurrent(currentResult);
                }
                else
                {
                    currentResult="0";
                    printCurrent(currentResult);
                }
            }
        });
    });

    // set events for each button tagged as 'action'
    actions.forEach(action => {
        action.addEventListener("click", function(){
            console.log("action");
            if(action.id === "clear")
            {
                currentResult="";
                historyResult="";
                printCurrent("");
                printHistory("");
            }

            if(action.id ==="backspace")
            {
                currentResult = getCurrent();
                console.log(currentResult);
                if(currentResult !== "")
                {
                    var newValue = currentResult.slice(0,-1);
                    if(newValue == "")
                    {
                        currentResult="";
                        historyResult="";
                        printHistory("");
                        printCurrent("");
                    } 
                    else{
                        printCurrent(newValue);
                    } 
                }
               
            }
        });
    });

   
}

function getCurrent()
{
    return document.getElementById("current").innerText;    
}

function printCurrent(current_result)
{
    document.getElementById("current").innerText=current_result;
}

function getHistory()
{
    return document.getElementById("history").innerText;    
}

function printHistory(history_result)
{
    document.getElementById("history").innerText=history_result;
}


var microphone = document.getElementById("microphone-tap");
    microphone.onclick=function(){

        var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        recognition.lang = 'en-US';
	    recognition.start();
        operations = {"plus":"+",
                "substarct":"-",
                "sum":"+",
				 "minus":"-",
				 "multiply":"*",
				 "multiplied":"*",
                 "x":"*",
				 "x":"*",
                 "by": "",
                 "multiply by":"*",
				 "multiplied by":"*",
				 "divide":"/",
				 "divided":"/",
                 "divide by":"/",
                 "divided by":"/",
				 "reminder":"%",
                 "modulo":"%",
                "left bracket" :"(",
                "right bracket":")",
                "open brackets" :"(",
                "close brackets":")"}
        
    
        recognition.onresult = function(event){
            var input = event.results[event.results.length-1];  // last text said by user // Web Speech Recognition API stores the data into an array
            var text = input[0].transcript;
            if(getCurrent !== "")
            {
                text = getCurrent() + text;
            }
            console.log(text);
            for(property in operations){
                text= text.replace(property, operations[property]);
            }
            console.log(text);
            printHistory(text);
            setTimeout(function(){
                evaluate(text);
            },1000);
           
        
        }
}

function evaluate(input){
	try{
		var result = eval(input);
        let hasDecimals = result % 1 !== 0;
        let resultWithTwoDecimals = 0;
        if(hasDecimals)
        {
            resultWithTwoDecimals = result.toFixed(2);
        }
        else
        {
            resultWithTwoDecimals = result;
        }
       
		printCurrent(resultWithTwoDecimals);
        printHistory("");
	}
	catch(e){
		console.log(e);
		printCurrent("error");
	}
}



//function for canvas    
function rain_numbers()
{
        let canvas = document.getElementById("rain_numbers");
        let ctx = canvas.getContext('2d');

        let height = canvas.height;
        let width = canvas.width;

        let str = "A+jk js:2 @df349s 17 tr YY ufds M5rf0+-->><ds P87 #h7518 $!& ^dfs $Ew 00 er JH # $ * . (! ;) ,: :";
        let matrix = str.split("");
        let font = 14;
        let col = width / font;
        let arr = [];

        for(let i = 0; i < col; i++)
        {
            arr[i] = 1;
        }

        const draw = () => {
            ctx.fillStyle = "rgba(149,78,4,0.1)";
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = "white";
            ctx.font = font+"px system-ui";

            for(let i = 0; i < arr.length; i++)
            {
                let txt = matrix[Math.floor(Math.random() * matrix.length)];    // we select a random element of the matrix at indices between 0 and matrix length, then parse it to integer
                ctx.fillText(txt, i * font, arr[i] * font);

                if(arr[i] * font > height && Math.random() > 0.975) {
                    arr[i] = 0;
                }
                arr[i]++;
            }
        }

        setInterval(draw, 30);
        window.addEventListener("resize", () => location.reload());
}
   


            // if(operator.id === "+")
            // {
            //     if(historyResult ==="")
            //     {
            //         historyResult =currentResult;
            //         printHistory(historyResult);
            //         currentResult="";
            //         printCurrent(currentResult);
            //     }
            //     else
            //     {
            //         historyResult= historyResult + lastOperator + currentResult;
            //         //let historyEvaluated = eval(historyResult).toString();
            //         printHistory(historyResult+operator.id);
            //         currentResult="";
            //         printCurrent(currentResult);
            //     }
            // }

            // if(operator.id === "-")
            // {
            //     if(historyResult ==="")
            //     {
            //         historyResult =currentResult;
            //         printHistory(historyResult);
            //         currentResult="";
            //         printCurrent(currentResult);
            //     }
            //     else
            //     {
            //         historyResult= historyResult + lastOperator + currentResult;
            //         //let historyEvaluated = eval(historyResult).toString();
            //         printHistory(historyResult+operator.id);
            //         currentResult="";
            //         printCurrent(currentResult);
            //     }
            // }

            // if(operator.id === "*")
            // {
            //     if(historyResult ==="")
            //     {
            //         historyResult =currentResult;
            //         printHistory(historyResult);
            //         currentResult="";
            //         printCurrent(currentResult);
            //     }
            //     else
            //     {
            //         historyResult= historyResult + lastOperator + currentResult;
            //         //let historyEvaluated = eval(historyResult).toString();
            //         printHistory(historyResult+operator.id);
            //         currentResult="";
            //         printCurrent(currentResult);
            //     }
            // }

            // if(operator.id === "/")
            // {
            //     if(historyResult ==="")
            //     {
            //         historyResult =currentResult;
            //         printHistory(historyResult);
            //         currentResult="";
            //         printCurrent(currentResult);
            //     }
            //     else
            //     {
            //         historyResult= historyResult + lastOperator + currentResult;
            //         //let historyEvaluated = eval(historyResult).toString();
            //         printHistory(historyResult+operator.id);
            //         currentResult="";
            //         printCurrent(currentResult);
            //     }
            // }
