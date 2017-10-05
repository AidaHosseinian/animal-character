(function(){
    //question maker object
    var questionsData =  [
        {
            num: 1 , 
            title:  'At school one person are asked to read loadly a text',
            options:[
                {
                    imgsrc:'assets/img/q1/adamak-charecter.png',
                    text:'Raise your hand and say :<br/> Me , Me!',
                    value:1
                },
                {
                    imgsrc:'assets/img/q1/shame-charecter.png',
                    text:'Hide your face of your teacher,while you are shaking of stress  ',
                    value:2
                },
                {
                    imgsrc:'assets/img/q1/confidence-charecter.png',
                    text:'Quickly read the text and the raise your hand',
                    value:3 
                }
            ] 
        },
        {
            num: 2 , 
            title:  'In a basketball play you:',
            options:[
                {
                    imgsrc:'assets/img/q2/basketball1.png',
                    text:'You do nothing and waiting for a chance in the end of the court',
                    value:1
                },
                {
                    imgsrc:'assets/img/q2/basketball2.png',
                    text:'Suddenly you are unpredictable and you\'re trying to win the trophy.',
                    value:2
                },
                {
                    imgsrc:'assets/img/q2/basketball3.png',
                    text:'You run quickly everywhere and motivate the team ',
                    value:3
                }
            ] 
        },
        {
            num: 3 , 
            title:  'In your holiday:',
            options:[
                {
                    imgsrc:'assets/img/q3/shape1.png',
                    text:'Meeting friends',
                    value:1
                },
                {
                    imgsrc:'assets/img/q3/shape2.png',
                    text:'Do a Game',
                    value:2
                },
                {
                    imgsrc:'assets/img/q3/shape3.png',
                    text:'Your choice is reading a book',
                    value:3
                }
            ] 
        },
        {
            num: 4 , 
            title:  'In a boring party',
            options:[
                {
                    imgsrc:'assets/img/q4/pic1.png',
                    text:'You think about your tomorrow plan ',
                    value:1
                },
                {
                    imgsrc:'assets/img/q4/pic2.png',
                    text:'you sit in a corner and listen to others',
                    value:2
                },
                {
                    imgsrc:'assets/img/q4/pic3.png',
                    text:'You make fun for other people',
                    value:3
                }
            ] 
        },
        {
            num: 5 , 
            title:  'When you are asked to look after a child',
            options:[
                {
                    imgsrc:'assets/img/q5/pic1.png',
                    text:'You think all the time when she/he sleep. ',
                    value:1
                },
                {
                    imgsrc:'assets/img/q5/pic2.png',
                    text:'you engage him/her',
                    value:2
                },
                {
                    imgsrc:'assets/img/q5/pic3.png',
                    text:'You try to control him until his/her parents come to him',
                    value:3
                }
            ] 
        },
    ]
 
    // helpers
    function hasClass(element,className){
        var split = element.className.split(' ')
        for(var i = 0; i<split.length;i++){
            if(split[i]==className)
                return true
        }
        return false
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
    function findChildByClass(parent,className){  
        for (var i = 0; i < parent.children.length; i++) {
            if (hasClass(parent.children[i],className)) {
              return parent.children[i]; 
            }        
        }
        return null
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
    function showResultPage(){
        var selectedItems= document.getElementsByClassName('selected')
        var A=0,B=0,C=0
        for(i=0; i<questionsData.length; i++){
            var selectedItemsNum= selectedItems[i].getAttribute('data-value')
            if(selectedItemsNum == 1) A++
            else if (selectedItemsNum == 2) B++
            else C++
        }
        
        document.getElementById('questions-container').style.display = 'none'
        document.getElementById('result-container').style.display = 'block'

        var resultA = document.getElementById('content-result-a')
        var resultB = document.getElementById('content-result-b')
        var resultC = document.getElementById('content-result-c')

        if(A>=3){
            resultA.style.display = 'block'
        } else if(B>=3){
            resultB.style.display = 'block'
        }else if(C>=3){
            resultC.style.display = 'block'
        } else if (A >=2 && B >=2 ){
            resultA.style.display = 'block'
            resultB.style.display = 'block' 
        } else if (A >=2 && C >=2 ){
            resultA.style.display = 'block'
            resultC.style.display = 'block' 
        }else if (C >=2 && B >=2 ){
            resultB.style.display = 'block'
            resultC.style.display = 'block' 
        }
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
        var resultBtn= document.getElementById('question-result-btn')
        var resultPage= document.getElementById('result-container')
    
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
                    resultBtn.style.display='none'
                }
                else{
                    nextBtn.style.display='none'
                    resultBtn.style.display='inline-block'
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
            resultBtn.addEventListener('click',function(){
                showResultPage()
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
                        resultBtn.removeAttribute("disabled")
                    }
                } 
            })
        } 
        function generateQuestionOptions(options){
            var optionsHtml = ''
            for(var i=0;i<options.length;i++){
                var option = options[i] 
                optionsHtml += optionTemplate.replace('[imgsrc]','src="'+option.imgsrc+'"')
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
            },
            getCurrentQuestionElement:function(){
                return questionWrapper.children[activeQuestion-1]
            }
        }
    }  
    // objects execution
    var questionHandler = QuestionsHandler();
   
    for(i=0; i<questionsData.length ;i++)
        questionHandler.generateQuestion(questionsData[i])
    
    questionHandler.init()
 
          
 
    // Handling questions options slider in smaller size screen < 768px.
    var QuestionOptionsGlobal = function(){ 
        // getting references & default values  
        var currentOption = 1;

        // Sliding options
        function slideOptions(dir){
            var activeQuesionElement = questionHandler.getCurrentQuestionElement()

            var optionsWrapper = findChildByClass(activeQuesionElement,'options-wrapper') 
            var optionsNextBtn = findChildByClass(optionsWrapper,'options-next-btn')
            var optionsPrevBtn = findChildByClass(optionsWrapper,'options-prev-btn')

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
        document.getElementById('questions-container').addEventListener('click',function(e){ 
            if(hasClass(e.target,'options-next-btn'))
                slideOptions(1)
            else  if(hasClass(e.target,'options-prev-btn'))
                slideOptions(-1)
        })  
        slideOptions(0);
    }
    QuestionOptionsGlobal(); 
})()