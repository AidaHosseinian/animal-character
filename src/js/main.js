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
                    text:'Raise your hand and say :<br/> Me , Me!',
                    value:1
                },
                {
                    imgsrc:'assets/img/q1/confidence-charecter.png',
                    text:'Raise your hand and say :<br/> Me , Me!',
                    value:1
                }
            ] 
        },
        {
            num: 2 , 
            title:  'At school one person are asked to read loadly a text',
            options:[
                {
                    imgsrc:'assets/img/q1/adamak-charecter.png',
                    text:'Raise your hand and say :<br/> Me , Me!',
                    value:1
                },
                {
                    imgsrc:'assets/img/q1/shame-charecter.png',
                    text:'Raise your hand and say :<br/> Me , Me!',
                    value:1
                },
                {
                    imgsrc:'assets/img/q1/confidence-charecter.png',
                    text:'Raise your hand and say :<br/> Me , Me!',
                    value:1
                }
            ] 
        },
        {
            num: 3 , 
            title:  'At school one person are asked to read loadly a text',
            options:[
                {
                    imgsrc:'assets/img/q1/adamak-charecter.png',
                    text:'Raise your hand and say :<br/> Me , Me!',
                    value:1
                },
                {
                    imgsrc:'assets/img/q1/shame-charecter.png',
                    text:'Raise your hand and say :<br/> Me , Me!',
                    value:1
                },
                {
                    imgsrc:'assets/img/q1/confidence-charecter.png',
                    text:'Raise your hand and say :<br/> Me , Me!',
                    value:1
                }
            ] 
        },
        {
            num: 4 , 
            title:  'At school one person are asked to read loadly a text',
            options:[
                {
                    imgsrc:'assets/img/q1/adamak-charecter.png',
                    text:'Raise your hand and say :<br/> Me , Me!',
                    value:1
                },
                {
                    imgsrc:'assets/img/q1/shame-charecter.png',
                    text:'Raise your hand and say :<br/> Me , Me!',
                    value:1
                },
                {
                    imgsrc:'assets/img/q1/confidence-charecter.png',
                    text:'Raise your hand and say :<br/> Me , Me!',
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
  
    
    var optionTemplate = getTemplate('content-box')


    // Handling questions behaviors
    var QuestionsHandler = function(){
        // getting references & default values
        var questionWrapper = document.getElementById('questions')
        var template = getTemplate('question') 
        var activeQuestion = 1;

        {
            function selectAnOption(e){
                if(hasClass(e.target,'question-option')){
                    var allOptions = document.getElementsByClassName('question-option')
                    for(var i = 0 ; i < allOptions.length;i++)
                        removeClass(allOptions[i],'selected')
                    
                    addClass(e.target,'selected')
                } 
            }
            // binding evetns
            questionWrapper.addEventListener('click',selectAnOption)
        }

        function setActiveQuestion(num){ 
            var prevBtn= document.getElementById('question-prev-btn');
            var nextBtn= document.getElementById('question-next-btn');
            var questions = questionWrapper.children
            for(var i=0;i<questions.length;i++){
                questions[i].style.display = 'none'
            }
            activeQuestion += num
            prevBtn.removeAttribute("disabled")
            nextBtn.removeAttribute("disabled")
            if(activeQuestion<=1){
                activeQuestion = 1 
                prevBtn.setAttribute("disabled", "disabled")
                
            }else if(activeQuestion >= questions.length){
                activeQuestion = questions.length
                nextBtn.setAttribute("disabled", "disabled")
            } 
            questions[activeQuestion-1].style.display = 'block'
        }

        return {
            generateQuestion:function(questionData){
                questionWrapper.innerHTML += template
                                                .replace('[num]',questionData.num)
                                                .replace('[title]',questionData.title) 
            },
            init:function(){
                setActiveQuestion(0)
            },
            next:function(){
                setActiveQuestion(+1)
            },
            prev:function(){
                setActiveQuestion(-1)
            }
        }
    }  
    // objects execution
    var questionHandler = QuestionsHandler();
   

    questionHandler.generateQuestion(questionsData[0])
    questionHandler.generateQuestion(questionsData[1])
    questionHandler.generateQuestion(questionsData[2])
    questionHandler.generateQuestion(questionsData[3])

    questionHandler.init()
 
   
    document.getElementById('question-prev-btn').addEventListener('click',function(){
        questionHandler.prev()
    })
    document.getElementById('question-next-btn').addEventListener('click',function(){
        questionHandler.next()
    })
 
    /*

    var questionTitle = document.getElementById('questionTitle')
    var questionOptions = document.getElementById('questionOptions')

    for(var questionIndex = 0; questionIndex< questions.length; questionIndex++ ){
        var question = questions[questionIndex]
        questionTitle.innerHTML = question.title
        for(var optionIndex = 0; optionIndex< question.options.length;optionIndex++ ){
            var option = question.options[optionIndex]
            questionOptions.innerHTML +=  '<div class="content-box">\
                                                <div class="question-option">\
                                                    <img src="'+option.imgsrc+'" alt="">\
                                                    <span>'+option.text+'</span>\
                                                </div>\
                                            </div>'
        } 
    }
      */               
    

          
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