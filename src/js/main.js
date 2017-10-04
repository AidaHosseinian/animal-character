(function(){
    //question maker object
    var questionsData =  [
        {
            num: 1 , 
            title:  'At school one person are asked to read loadly a text',
            options:[
                {
                    imgsrc:'assets/img/q1/adamak-charecter.png',
                    whichoption:'A',
                    text:'Raise your hand and say :<br/> Me , Me!',
                    value:1
                },
                {
                    imgsrc:'assets/img/q1/shame-charecter.png',
                    whichoption:'B',
                    text:'Hide your face of your teacher,while you are shaking of stress  ',
                    value:1
                },
                {
                    imgsrc:'assets/img/q1/confidence-charecter.png',
                    whichoption:'C',
                    text:'Quickly read the text and the raise your hand',
                    value:1 
                }
            ] 
        },
        {
            num: 2 , 
            title:  'In a basketball play you:',
            options:[
                {
                    imgsrc:'assets/img/q2/basketball1.png',
                    whichoption:'A',
                    text:'You do nothing and waiting for a chance in the end of the court',
                    value:1
                },
                {
                    imgsrc:'assets/img/q2/basketball2.png',
                    whichoption:'B',
                    text:'Suddenly you are unpredictable and you\'re trying to win the trophy.',
                    value:1
                },
                {
                    imgsrc:'assets/img/q2/basketball3.png',
                    whichoption:'C',
                    text:'You run quickly everywhere and motivate the team ',
                    value:1
                }
            ] 
        },
        {
            num: 3 , 
            title:  'In your holiday:',
            options:[
                {
                    imgsrc:'assets/img/q3/shape1.png',
                    whichoption:'A',
                    text:'Meeting friends',
                    value:1
                },
                {
                    imgsrc:'assets/img/q3/shape2.png',
                    whichoption:'B',
                    text:'Do a Game',
                    value:1
                },
                {
                    imgsrc:'assets/img/q3/shape3.png',
                    whichoption:'C',
                    text:'Your choice is reading a book',
                    value:1
                }
            ] 
        },
        {
            num: 4 , 
            title:  'In a boring party',
            options:[
                {
                    imgsrc:'assets/img/q4/pic1.png',
                    whichoption:'A',
                    text:'You think about your tomorrow plan ',
                    value:1
                },
                {
                    imgsrc:'assets/img/q4/pic2.png',
                    whichoption:'B',
                    text:'you sit in a corner and listen to others',
                    value:1
                },
                {
                    imgsrc:'assets/img/q4/pic3.png',
                    whichoption:'C',
                    text:'You make fun for other people',
                    value:1
                }
            ] 
        },
        {
            num: 5 , 
            title:  'When you are asked to look after a child',
            options:[
                {
                    imgsrc:'assets/img/q5/pic1.png',
                    whichoption:'A',
                    text:'You think all the time when she/he sleep. ',
                    value:1
                },
                {
                    imgsrc:'assets/img/q5/pic2.png',
                    whichoption:'B',
                    text:'you engage him/her',
                    value:1
                },
                {
                    imgsrc:'assets/img/q5/pic3.png',
                    whichoption:'C',
                    text:'You try to control him until his/her parents come to him',
                    value:1
                }
            ] 
        },
    ]


    // helpers
    function hasClass(element,className){
        return element.className.indexOf(className) >= 0  
    }
    function addClass(element,className){
        if(hasClass(element,className)===false){
            element.className += ' '+className;
        }
    }
    function removeClass(element,className){
        if(hasClass(element,className)===true){
            element.className = element.className.replace(' '+className,'');
        }
    }
    function getTemplate(className){
        var placeHolder = document.getElementsByClassName(className)[0]
        var markup = placeHolder.outerHTML
        placeHolder.parentNode.removeChild(placeHolder)
        return markup 
    }
    function ifAllQuestionsIsAnswered(){
        var selectedItems= document.getElementsByClassName('selected')
        return selectedItems.length == 5  
    } 


    // Handling questions behaviors
    var QuestionsHandler = function(){
        // getting references & default values
        var template = getTemplate('question') 
        var optionTemplate = getTemplate('option') // each option

        var activeQuestion = 1;
        var questionWrapper = document.getElementById('questions')
        var prevBtn= document.getElementById('question-prev-btn')
        var nextBtn= document.getElementById('question-next-btn')
        var resultbtn= document.getElementById('question-result-btn')
    
        bindEvents()
   
        function setActiveQuestion(num){  
            var questions = questionWrapper.children
            for(var i=0;i<questions.length;i++){
                questions[i].style.display = 'none'
            } 
            activeQuestion += num
            if(activeQuestion<1)
                activeQuestion = 1 
            else if(activeQuestion > questions.length)
                activeQuestion = questions.length

            questions[activeQuestion-1].style.display = 'block'

            handleButtonState()
        }
        function handleButtonState(){
            prevBtn.removeAttribute("disabled")
            nextBtn.removeAttribute("disabled")
            isResultBtnDisable('none')

            function isResultBtnDisable(displayvalue){
                if(displayvalue=='none'){
                    nextBtn.style.display='inline-block'
                    resultbtn.style.display='none'
                }
                else{
                    nextBtn.style.display='none'
                    resultbtn.style.display='inline-block'
                }
            } 
            

            if(activeQuestion<=1)
                prevBtn.setAttribute("disabled", "disabled") 
            else if(activeQuestion >= questionsData.length) {
                 
                isResultBtnDisable('inline-block')
            }
           
                
        }
        function bindEvents(){ 
            prevBtn.addEventListener('click',function(){
                setActiveQuestion(-1)
            })
            nextBtn.addEventListener('click',function(){
                setActiveQuestion(1)
            })
            questionWrapper.addEventListener('click',function (e){
                if(hasClass(e.target,'question-option')){
                    var optionsWrapper = e.target.parentNode.parentNode

                    var allOptions = optionsWrapper.children 
                    for(var i = 0 ; i < allOptions.length;i++){ 
                        if(hasClass(allOptions[i],'option'))
                            removeClass(allOptions[i].children[0],'selected')
                    }
                    
                    addClass(e.target,'selected')

                    if(ifAllQuestionsIsAnswered()){ 
                        resultbtn.removeAttribute("disabled")
                    }
                } 
            })
        } 
        function generateQuestionOptions(options){
            var optionsHtml = ''
            for(var i=0;i<options.length;i++){
                var option = options[i] 
                optionsHtml += optionTemplate.replace('[imgsrc]','src="'+option.imgsrc+'"')
                                             .replace('[whichoption]',option.whichoption)
                                             .replace('[text]',option.text)
                                             .replace('[value]',option.value)
            }
            return optionsHtml;
        }
        return {
            generateQuestion:function(questionData){
                questionWrapper.innerHTML += 
                    template.replace('[num]',questionData.num)
                            .replace('[title]',questionData.title) 
                            .replace('[options]',generateQuestionOptions(questionData.options)) 
            },
            init:function(){
                setActiveQuestion(0)
            } 
        }
    }  
    // objects execution
    var questionHandler = QuestionsHandler();
   
    for(i=0; i<questionsData.length ;i++)
        questionHandler.generateQuestion(questionsData[i])
    
    questionHandler.init()
 
          
    return
    // Handling questions options slider in smaller size screen < 768px.
    var QuestionOptionsGlobal = function(){ 
        // getting references & default values
        var optionsWrapper = document.getElementsByClassName('options-wrapper')[0];
        var optionsNextBtn = document.getElementById('options-next-btn');
        var optionsPrevBtn = document.getElementById('options-prev-btn');
        var currentOption = 1;

        // Sliding options
        function slideOptions(dir){
            // remove option-x class from wrapper
            for(var i = 1;i<=3;i++){
                removeClass(optionsWrapper,'option-'+i)
            }

            // pick option
            currentOption += dir;

            // fix less than 1 and more than 3
            if(currentOption <=1) {
                currentOption = 1;
                addClass(optionsPrevBtn,'disable')
            } else {
                removeClass(optionsPrevBtn,'disable')
            }
            if(currentOption >=3){
                currentOption = 3; 
                addClass(optionsNextBtn,'disable')
            } else {
                removeClass(optionsNextBtn,'disable')
            }


            // set current option to wrapper to slide to the option
            addClass(optionsWrapper,'option-'+currentOption)
        } 
        // binding evetns
        optionsNextBtn.addEventListener('click',function(){
            slideOptions(1);
        })
        optionsPrevBtn.addEventListener('click',function(){
            slideOptions(-1);
        })
        // initial calls 
        slideOptions(0);
    }
    QuestionOptionsGlobal(); 
})()