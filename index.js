const quizData = [
    {
        question:' Which of these is a correct way to declare a constant in JavaScript?',
        options:[
            'let PI = 3.14;',
            'const PI = 3.14;',
            'var PI = 3.14;',
            'constant PI = 3.14;'
        ],
        correct:1
    },
    {
        question:" What will be the result of 2 + '2' in JavaScript?",
        options:[
            '4',
            '22',
            'NaN',
            'Error'
        ],
        correct:1
    },
    {
        question:'Which method is used to parse a JSON string into a JavaScript object?',
        options:[
            'JSON.toObject()',
            'JSON.parse()',
            'JSON.stringify()',
            'parse.JSON()'
        ],
        correct:1
    },
    {
        question:' Which of the following is NOT a JavaScript data type?',
        options:[
            'String',
            'Boolean',
            'Character',
            'Number'
        ],
        correct:2
    },
    {
        question:'What is the correct syntax for a function expression?',
        options:[
            'function myFunc() = {}',
            'let myFunc = function() {}',
            'func myFunc() {}',
            'function: myFunc() {}'
        ],
        correct:1
    },
    {
        question:'How can you prevent a default action in an event handler?',
        options:[
            'event.stop()',
            'event.cancel()',
            'event.preventDefault()',
            'event.denyDefault()'
        ],
        correct:2
    },
    {
        question:'What is the output of: console.log([] + [])?',
        options:[
            '0',
            '[]',
            '"" (empty string)',
            'undefined'
        ],
        correct:2
    },
    {
        question:' Which symbol is used for optional chaining in JavaScript?',
        options:[
            '!!',
            '?',
            '::',
            '??'
        ],
        correct:1
    },
    {
        question:' What is a closure in JavaScript?',
        options:[
            'A way to write loops',
            'A function inside another function that can access outer variables',
            'A type of loop',
            'A method to close the browser'
        ],
        correct:1
    },
    {
        question:'What does the === operator do in JavaScript?',
        options:[
            'Compares values only',
            'Compares both value and type',
            'Converts values before comparing',
            'Assigns a value'
        ],
        correct:1
    },
    {
        question:'Which array method is used to add elements to the end of an array?',
        options:[
            'shift()',
            'unshift()',
            'pop()',
            'push()'
        ],
        correct:3
    },
    {
        question:'What will typeof NaN return?',
        options:[
            'undefined',
            'object',
            'number',
            'NaN'
        ],
        correct:2
    }
];

const questions = [...quizData].sort(()=> Math.random - 0.5);
let currentQuestion = 0 ;
let score = 0;
let timer;
let leftTimer;

const timerEl = document.getElementById('timer')
const questionEl = document.getElementById('question')
const optionsEl = document.getElementById('options')
const nextBtn = document.getElementById('next-btn')
const resultEl = document.getElementById('result')

function loadQuestion(){
       clearInterval(timer);
       leftTimer = 15;
       updateTimer();
       timer = setInterval(countdown, 1000);
      const q = questions[currentQuestion];
      questionEl.textContent = `Q${currentQuestion + 1}.${q.question}`
      optionsEl.innerText = '';
      

      q.options.forEach((option, index)=>{
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = option;
        btn.addEventListener('click', ()=> selectAnswer(index))
        optionsEl.appendChild(btn);
      });

      nextBtn.style.display = 'none';
}

function countdown(){
    leftTimer--;
    updateTimer();

    if(leftTimer === 0){
        clearInterval(timer);
        selectAnswer(questions[currentQuestion]?.correct)
    }
}

function updateTimer(){
    timerEl.innerHTML = `<p>⏰<span class="text-2xl ml-1">${leftTimer}</span></p>`
}

function selectAnswer(index){
    clearInterval(timer)
    const q = questions[currentQuestion]
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);
    if(index === q.correct){
        score++
        buttons[index].classList.add('correct');
    }else{
        buttons[index].classList.add('wrong');
        buttons[q.correct].classList.add('correct')
    }

    nextBtn.style.display = 'inline-block'
};

nextBtn.addEventListener('click', ()=>{
    currentQuestion++

    if(currentQuestion < questions.length){
        loadQuestion();
    }else{
        showResult();
    }
});

function showResult(){
 
     const highScore = localStorage.getItem('quizHighScore') || 0;
     const isNew = score > highScore;

     if(isNew){
        localStorage.setItem('quizHighScore', score);
     }

     resultEl.innerHTML=`
        <img class="h-50 w-50 mx-auto mb-2" src="completed.jpg" alt="No photo available">
        <h2 class="text-4xl mb-4 font-bold">Hurray!!! Quiz Completed</h2>
        <p class="font-semibold text-xl">You have scored <span class="bg-green-800 rounded-2xl p-2 text-white">${score}</span> out of <span class="bg-orange-600 rounded-2xl p-2 text-white">${questions.length}</span> questions</p>
        <button class="bg-green-700 p-3 text-xl font-semibold mt-6 rounded-xl text-white cursor-pointer" onclick="location.reload()">Restart</button>
     `
     timerEl.style.display = 'none'
     questionEl.style.display = 'none'
     optionsEl.style.display = 'none'
     nextBtn.style.display = 'none'
}

loadQuestion();