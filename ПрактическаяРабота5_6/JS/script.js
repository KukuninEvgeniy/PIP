//переменные таймера
var countdownfunction; timePassedGlobal = 0
//Переменные квиза
const quizData = [
    {
        question:"Что получится, если сложить true + false?",
        a:"truefalse",
        b:"0",
        c:"1",
        d:"NaN",
        correct: "c",
        answer:undefined
    },
    {
        question:'Чему равно 0 || "" || 2 || undefined || true || falsе ?',
        a:"0",
        b:'""',
        c:"2",
        d:"true",
        correct: "c",
        answer:undefined
    },
    {
        question:'Язык JavaScript является подвидом языка Java – верно?',
        a:"да",
        b:'нет',
        c:"Наоборот, Java - подвид JavaScript",
        d:"JavaScript не является языком программирования",
        correct: "b",
        answer:undefined
    },
    {
        question:'Какие конструкции для циклов есть в javascript?',
        a:"Только две: for и while.",
        b:'Только одна: for.',
        c:"Три: for, while и do...while.",
        d:"javascript не содержит конструкций для циклов",
        correct: "c",
        answer:undefined
    },
    {
        question:'Верно ли сравнение: "ёжик" > "яблоко"?',
        a:"да",
        b:'нет',
        c:"Зависит от локальных настроек браузера.",
        d:"Зависит от настроек операционной системы.",
        correct: "b",
        answer:undefined
    },
    {
        question:'Переменные apple и Apple (с большой буквы) – это одна и та же или разные?',
        a:"Одна и та же.",
        b:'Разные.',
        c:"С большой буквы переменные называть нельзя.",
        d:"Слово «apple» является зарезервированным, нельзя использовать.",
        correct: "b",
        answer:undefined
    },
    {
        question:'Чему равно значение выражения 4 - "5" + 0xf - "1e1"?',
        a:"Цифре",
        b:'Строке',
        c:"NaN",
        d:"true",
        correct: "a",
        answer:undefined
    },
    {
        question:'Что делает оператор **?',
        a:"Возводит в степень.",
        b:'Умножает число само на себя.',
        c:"Нет такого оператора.",
        d:"Возвращает ссылку на ячейку памяти, где зарезервировано число",
        correct: "a",
        answer:undefined
    },
    {
        question:'Сколько параметров можно передать функции ?',
        a:"Ровно столько, сколько указано в определении функции.",
        b:'Сколько указано в определении функции или меньше',
        c:"Сколько указано в определении функции или больше.",
        d:"Любое количество.",
        correct: "d",
        answer:undefined
    },
    {
        question:'Что делает оператор ===?',
        a:"Сравнивает по ссылке, а не по значению.",
        b:'Сравнивает без приведения типа.',
        c:"Нет такого оператора.",
        d:"Присваивает значение переменной",
        correct: "c",
        answer:undefined
    },
];
var currentQuiz;divA;


//Обработчики событий дополнительных окон
function Hello() {

    divHellow = document.createElement('div');
    let name = document.getElementById("name")
    let lastname = document.getElementById("lastName")
    divHellow.innerHTML = "<p>Приветствую" + " " + name.value + " " + lastname.value + "</p>";
    document.body.append(divHellow)

    userData = [
        {
            userName: name.value,
            userLastName: lastName.value

        }
    ]

    localStorage.setItem('userData', JSON.stringify(userData));

    window.opener.funonloadindex();

}
function triangle() {

    divResult = document.createElement('div');
    let square = 0.5 *
        document.getElementById("aSide").value *
        document.getElementById("hSide").value;
    divResult.innerHTML = square;
    document.body.append(divResult)

}

function comparison() {

    divResult = document.createElement('div');
    // let compare = 0.5*
    //     document.getElementById("aSide").value*
    //         document.getElementById("hSide").value;
    divResult.innerHTML =
        (document.getElementById("str1").value === document.getElementById("str2").value);
    document.body.append(divResult)

}

function array() {

    divResult = document.createElement('div');
    let arrayString = document.getElementById("arrayString").value
    let array = arrayString.split(",");
    divResult.innerHTML = "Минимальное значение массива: <b>" + Math.min(...array) +
        "</b>; максимальное значение массива:<b>" + Math.max(...array) + "</b>";
    document.body.append(divResult)

}

function timerStart() {

    // var timePassed = 0,
    let timeLeft = 0; timePassed = 0;
    let timerInput = document.getElementById('time');
    let timeLimit = timerInput.valueAsNumber;

    countdownfunction = setInterval(function () {
        // Количество времени, которое прошло, увеличивается на  1
        timePassed = timePassed += 1;
        //Обновляем глобальные переменные
        timePassedGlobal = timePassed;
        //считаем сколько времени осталось
        timeLeft = timeLimit - timePassed;
        // Обновляем метку оставшегося времени
        timerInput.valueAsNumber = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdownfunction);
        }
        //сбросим глобальные переменные

    }, 1000)
}

function timerPass() {
    divResult = document.createElement('div');
    divResult.innerHTML = timePassed;
    document.body.append(divResult)
}

function timerStop() {

    clearInterval(countdownfunction);
    timePassedGlobal = 0;

}

function deselectAnswers(){
    let answerElements = document.querySelectorAll('.answer');
    answerElements.forEach(answerEl => answerEl.checked = false)
}

function  testNext()
{
    let answer;
    if (currentQuiz==undefined){//инициализация, обработчик кнопки начать тест
     createAnswerRadio();
     currentQuiz=0;
     answer = true;
     document.getElementById('button').value = 'Продолжить';
    }else if(currentQuiz>=10){//все задания пройдены, вывести результат
     finishTest();
     answer = true;
    }else{  
        answer = getSelected();
        if (answer){
        quizData[currentQuiz-1].answer = answer;// на прошлой итерации счетчик уже сдвинули
        toggleTimeLune();
        deselectAnswers();
    }
}    
    if(currentQuiz==9){
        document.getElementById('button').value = 'Завершить';
    }
    
    if (answer){
    let questionElement = document.getElementById('question');
    setDataQuiz(questionElement,currentQuiz);
    currentQuiz++;}

}

function getSelected(){
    let answer;
    let answerElements = document.querySelectorAll('.answer');

    // for (let index = 0; index < answerElements.length; index++) {
    //     const element = answerElements[index];
    //     if(element.checked){
    //         answer = element.id;
   
    answerElements.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });

    return answer;
}

function finishTest(){

   // divA.hidden=false;
    let countCorrect=0;

    for (let i = 0; i < currentQuiz; i++) {
        //const element = array[i];
        nDivA = divA.cloneNode(true);
        nDivA.id = 'answer_'+i;        
        divSub = document.getElementById('QuestionSubmit');
        let questionElement = nDivA.firstChild;
        if(quizData[i].answer == quizData[i].correct){
            nDivA.style.borderColor = 'green';
            countCorrect++;
        }else{
            nDivA.style.borderColor = 'red';   
        }
        
        setDataQuiz(questionElement,i,true);
        divSub.before(nDivA);
               
    }
    // divA.remove();
    // divResult = document.createElement('div');
    divA.innerHTML = countCorrect + ' правильных ответов';
    // document.body.append(divResult)


}

function createAnswerRadio(){

    let ulAnswers = document.createElement("ul");
    ulAnswers.className='variants';
    
    let liAnswer = document.createElement('li');
    liAnswer.innerHTML='<input type="radio" name="answer" id="a" class="answer"><label id="a_text"></label>'
    liAnswer.className='variant';
    ulAnswers.appendChild(liAnswer);
    
    liAnswer = document.createElement('li');
    liAnswer.innerHTML='<input type="radio" name="answer" id="b" class="answer"><label id="b_text"></label>'
    liAnswer.className='variant';
    ulAnswers.appendChild(liAnswer);
    
    liAnswer = document.createElement('li');
    liAnswer.innerHTML='<input type="radio" name="answer" id="c" class="answer"><label id="c_text"></label>'
    liAnswer.className='variant';
    ulAnswers.appendChild(liAnswer);
    
    liAnswer = document.createElement('li');
    liAnswer.innerHTML='<input type="radio" name="answer" id="d" class="answer"><label id="d_text"></label>'
    liAnswer.className='variant';
    ulAnswers.appendChild(liAnswer);
        
    divA = document.getElementById('answers');
    divA.appendChild(ulAnswers);
}

function setDataQuiz(questionElement,i,finish=false) {
    //const questionElement = document.getElementById('question');
    const currentQuizData = quizData[i];
    questionElement.innerText = currentQuizData.question;
    if (finish){
    //d.checked = true;
    let answerElements = questionElement.parentNode.querySelectorAll('.answer');
    answerElements.forEach(answerEl => {
        answerEl.name = answerEl.name+'_'+i ;
        if(currentQuizData.answer==answerEl.id){
            answerEl.checked = true;
            }            
        if(currentQuizData.correct==answerEl.id){
           answerEl.parentNode.lastChild.style.backgroundColor = 'green';           
        }  
        answerEl.parentNode.lastChild.innerHTML =currentQuizData[answerEl.id];
    });
    // document.getElementById(quizData[i].answer).checked = true
    // questionElement.parentNode.getElementById(quizData[i].correct+'_text').style.backgroundColor = 'green';
}else{
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}
}

function toggleTimeLune() {
    let elTimeLine = document.getElementById('timeLine');
    let elsPage = elTimeLine.childNodes;
    let flToggl = false;
    for (let i = 0; i < elsPage.length; i++) {
        let elem = elsPage[i];
        if (elem.classList.contains('questionTimelineCurrent')) {
            elem.classList.toggle('questionTimelineCurrent');
            flToggl = true;
        } else if (flToggl == true) {
            elem.classList.toggle('questionTimelineCurrent');
            flToggl = false;
            break;
        }


    };
}

//Функции открытия окна
function helloOpen() {


    let newWin = window.open("", "", "width=800,height=600");
    fillHead(newWin);
    newWin.document.write('<div class="DataUser">');
    newWin.document.write('<div id="HelloUser" class="datauser">');
    newWin.document.write('            <form>');
    newWin.document.write('                <h1>Введите данные пользователя</h1>');
    newWin.document.write('                <label>Фамилия<input type="text" id="name"></label>');
    newWin.document.write('                <label>Имя<input type="text" id = "lastName"></label>');
    newWin.document.write('                <input type="button" value="Представиться" size="25" onclick="Hello()"></input>');
    newWin.document.write('            </form></div>');
    newWin.document.write('            </div>');
    newWin.document.write('<div id="helloUserAdv">');
    newWin.document.write('     <p>Из основного окна вызывается функция "helloOpen", ');
    newWin.document.write('В функции выполняется получение нового окна:');
    newWin.document.write('"let newWin = window.open("", "", "width=800,height=600");";</p>');
    newWin.document.write('<p> С помощью метода "newWin.document.write"');
    newWin.document.write('выполняется заполнение новой страницы текстом HTML</p>');
    newWin.document.write('<p> Новое окно содержит кнопку "представится", на которой висит обработчик');
    newWin.document.write('"Hello()" - в обработчике создается новый элемент ');
    newWin.document.write('методом "divHellow = document.createElement(\'div\');" и элементу ');
    newWin.document.write('присваивается текст приветствия: "divHellow.innerHTML = "приветствую"</p>');
    newWin.document.write('<p>Затем элемент выводится в тег body:  document.body.append(divHellow)"</p>');
    newWin.document.write('<p> Помимо приветствия формируется объект JSON:');
    newWin.document.write('userData =[{userName: name.value,userLastName: lastName.value}] с последующим его ');
    newWin.document.write('сохранением в локальный кэш:  localStorage.setItem(\'userData\',JSON.stringify(userData));</p>');
    newWin.document.write('<p>После заполнения кэша вызывается функция открывающего окна: window.opener.funonloadindex();');
    newWin.document.write('для обновления данных о пользователе на основной странице. Этот же обработчик прописан');
    newWin.document.write('для тега body основно страницы: "body onload="funonloadindex();">body"            ');
    newWin.document.write('</p>   ');
    newWin.document.write('</div>');
    newWin.document.write('</body>');

}

function triangleOpen() {

    let newWin = window.open("", "", "width=800,height=600");
    fillHead(newWin);
    newWin.document.write('<div class="DataUser">');
    newWin.document.write('<div id="triangle" class="datauser">');
    newWin.document.write('            <form>');
    newWin.document.write('                <h1>Площадь треугольника</h1>');
    newWin.document.write('                <label>Основание<input type="number" id="aSide" ></label>');
    newWin.document.write('                 <label>Высота<input type="number" id="hSide"></label>');
    newWin.document.write('                <input type="button" value="Результат" size="25" onclick="triangle()"></input>');
    newWin.document.write('            </form></div>');
    newWin.document.write('            </div>');
    newWin.document.write('<div id="triangleUserAdv">');
    newWin.document.write('     <p>Из основного окна вызывается функция "triangleOpen", ');
    newWin.document.write('В функции выполняется получение нового окна:');
    newWin.document.write('"let newWin = window.open("", "", "width=800,height=600");";</p>');
    newWin.document.write('<p> С помощью метода "newWin.document.write"');
    newWin.document.write('выполняется заполнение новой страницы текстом HTML</p>');
    newWin.document.write('<p> Новое окно содержит кнопку "Результат", на которой висит обработчик');
    newWin.document.write('"triangle()" - в обработчике создается новый элемент ');
    newWin.document.write('методом "divResult = document.createElement(\'div\');" ');
    newWin.document.write('Введенные значения находятся по ид элемента методом document.getElementById("hSide").value;');


}

function comparisonOpen() {

    let newWin = window.open("", "", "width=800,height=600");
    fillHead(newWin);
    newWin.document.write('<div class="DataUser">');
    newWin.document.write('<div id="comparison" class="datauser">');
    newWin.document.write('            <form>');
    newWin.document.write('                <h1>Сравнение строк</h1>');
    newWin.document.write('                <label>Строка 1<input type="text" id="str1"></label>');
    newWin.document.write('                <label>Строка 2<input type="text" id="str2"></label>');
    newWin.document.write('                <input type="button" value="Результат" size="25" onclick="comparison()"></input>');
    newWin.document.write('            </form></div>');
    newWin.document.write('            </div>');
    newWin.document.write('<div id="triangleUserAdv">');
    newWin.document.write('     <p>Из основного окна вызывается функция "triangleOpen", ');
    newWin.document.write('В функции выполняется получение нового окна:');
    newWin.document.write('"let newWin = window.open("", "", "width=800,height=600");";</p>');
    newWin.document.write('<p> С помощью метода "newWin.document.write"');
    newWin.document.write('выполняется заполнение новой страницы текстом HTML</p>');
    newWin.document.write('<p> Новое окно содержит кнопку "Результат", на которой висит обработчик');
    newWin.document.write('"comparsion()" - в обработчике создается новый элемент ');
    newWin.document.write('методом "divResult = document.createElement(\'div\');" ');
    newWin.document.write('Введенные значения находятся по ид элемента методом document.getElementById("hSide").value;');
    newWin.document.write('Сравнение выполняется оператором "==="');
    newWin.document.write('</body>');


}

//TODO Проверитьтексты описания

function arrayOpen() {

    let newWin = window.open("", "", "width=800,height=600");
    fillHead(newWin);
    newWin.document.write('<div class="DataUser">');
    newWin.document.write('<div id="array" class="datauser">');
    newWin.document.write('            <form>');
    newWin.document.write('                <h1>Массив</h1>');
    newWin.document.write('                <label>Введите ряд чисел, разделенных запятой<input type="text" id="arrayString"></label>');
    newWin.document.write('                <input type="button" value="Результат" size="25" onclick="array()"></input>');
    newWin.document.write('            </form></div>');
    newWin.document.write('            </div>');
    newWin.document.write('<div id="arrayUserAdv">');
    newWin.document.write('     <p>Из основного окна вызывается функция "triangleOpen", ');
    newWin.document.write('В функции выполняется получение нового окна:');
    newWin.document.write('"let newWin = window.open("", "", "width=800,height=600");";</p>');
    newWin.document.write('<p> С помощью метода "newWin.document.write"');
    newWin.document.write('выполняется заполнение новой страницы текстом HTML</p>');
    newWin.document.write('<p> Новое окно содержит кнопку "Результат", на которой висит обработчик');
    newWin.document.write('"array()" - в обработчике создается новый элемент ');
    newWin.document.write('методом "divResult = document.createElement(\'div\');" ');
    newWin.document.write('Введенные значения находятся по ид элемента методом document.getElementById("hSide").value;');
    newWin.document.write('Преобразование строкового ряда в массив выполняется методом "arrayString.split(",");"');
    newWin.document.write('Выделение максимума и минимума выполняется методом Math.max(...array)"');
    newWin.document.write('</body>');


}

function timerOpen() {

    let newWin = window.open("timer.html", "", "width=800,height=600");
}

//function splashscreenOpen() {



//}


//TODO выровнять по левому краяю переключатели
function testOpen() {
    let newWin = window.open("", "", "width=800,height=600");
    newWin.onload = "javascript:testNext()";
    fillHead(newWin);
    newWin.document.write('<div class="questions">');
    newWin.document.write(' <div id="headQest"><h1>JavaScript</h1></div> ');
    newWin.document.write('<div class="questionTimeline" id="timeLine">');
    newWin.document.write('<span class="quiz-timeline__number questionTimelineCurrent">1</span>');;
    newWin.document.write('<span class="quiz-timeline__number">2</span>');
    newWin.document.write('<span class="quiz-timeline__number">3</span>');
    newWin.document.write('<span class="quiz-timeline__number">4</span>');
    newWin.document.write('<span class="quiz-timeline__number">5</span>');
    newWin.document.write('<span class="quiz-timeline__number">6</span>');
    newWin.document.write('<span class="quiz-timeline__number">7</span>');
    newWin.document.write('<span class="quiz-timeline__number">8</span>');
    newWin.document.write('<span class="quiz-timeline__number">9</span>');
    newWin.document.write('<span class="quiz-timeline__number">10</span>');
    newWin.document.write('</div>');

    newWin.document.write('<div class="question" id="answers">');
    newWin.document.write('<h2 id="question">Нажмите старт для начала тестирования</h2>');
    // newWin.document.write('<ul class="variants">');
    // newWin.document.write('<li><input type="radio" name="answer" id="a" class="answer"><label id="a_text"></label></li>');
    // newWin.document.write('<li><input type="radio" name="answer" id="b" class="answer"><label id="b_text"></label></li>');
    // newWin.document.write('<li><input type="radio" name="answer" id="c" class="answer"><label id="c_text"></label></li>');
    // newWin.document.write('<li><input type="radio" name="answer" id="d" class="answer"><label id="d_text"></label></li>');


    newWin.document.write('</div>');
    newWin.document.write('<div class="QuestionSubmit" id="QuestionSubmit">');
    //newWin.document.write('<button id="submit">Начать тестирование</button>');
    // newWin.document.write('<span class="button__text">Продолжить</span>');
    newWin.document.write(' <input type="button" id="button" value="Начать тестирование" size="25" onclick="testNext()"></input>');
    newWin.document.write('</button>');
    newWin.document.write('</div>');
    newWin.document.write('</div>');
    
    newWin.document.write('</body>');

    
}

//Общего назначения
function fillHead(newWin) {
    newWin.document.write('<!DOCTYPE html>');
    newWin.document.write('<html lang="en">');
    newWin.document.write('<head>');
    newWin.document.write('    <meta charset="UTF-8">');
    newWin.document.write('    <meta http-equiv="X-UA-Compatible" content="IE=edge">');
    newWin.document.write('    <meta name="viewport" content="width=device-width, initial-scale=1.0">');
    newWin.document.write('    <title>Document</title>');
    newWin.document.write('    <link rel="stylesheet" href="CSS/main.css">');
    newWin.document.write('    <script src="JS/script.js">');
    newWin.document.write('     </script>');
    newWin.document.write('   </head>');
    newWin.document.write('<body>');
}

//Обработчики событий основного окна
function funonloadindex() {

    let userData = JSON.parse(localStorage.getItem('userData'))[0];
    let name = userData.userName;
    let lastName = userData.userLastName;
    let divUserName = document.getElementById('user_name');
    divUserName.innerHTML = name + ' ' + lastName;


}

//Заставка

function popupToggle(){
    const  popup = document.getElementById('popup');
    popup.classList.toggle('active');
   // popup.classList.remove('active')
   divResult = document.createElement('div');
  
   let userData = JSON.parse(localStorage.getItem('userData'))[0];
   let name = userData.userName;
   let lastName = userData.userLastName;
   divResult.innerHTML ='<p>' + name + ' ' + lastName+ '</p>' + '<p>'+ new Date() +'<p/>';
   divResult.style.color = 'white';
   let popup_div = document.getElementById('popup');
   popup_div.appendChild(divResult);

}

// function closePop(){
//     document.querySelector('тут указываете id блока popup').style.display = 'none';
//   }

   function closePop(){
    document.getElementById("popup").classList.remove('active'); 
   }

  