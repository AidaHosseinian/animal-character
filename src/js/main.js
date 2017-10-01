(function(){


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

 
  
    // Handling questions behaviors
    var Question = function(){
        // getting references & default values
        var questionWrapper = document.getElementsByClassName('questions')[0];

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
    
    // Handling questions options slider in smaller size screen < 768px.
    var Options = function(){ 
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


    // objects execution
    Question();
    Options();
})()