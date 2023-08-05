const forms=document.querySelectorAll(".form > div");
const progressBar=document.getElementById("steps");
const circles=document.querySelectorAll(".circle");
let CurrentStep;
getCurrentSteps();
updateStepBar();
//return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
forms.forEach((form)=>{
    const Nextbtn=form.querySelector("button.next");
    const prevBtn=form.querySelector("button.prev")
    Nextbtn.addEventListener("click",()=>{
        handleCards(form,Nextbtn,"next");
        updateStepBar()
    })
    prevBtn.addEventListener("click",()=>{
        handleCards(form,prevBtn,"prev")
        updateStepBar()
    })
    
}  
)

    
if(!CurrentStep){
    forms[0].classList.add("active")
}

function handleCards(form,btn,direction){
    if(direction=="next"){
        if(CurrentStep==2){
            btn.disabled=true;
        }else{
            CurrentStep++;
        }
        
        form.classList.remove("active");

        forms[CurrentStep].classList.add("active")
       
    }else{
        if(CurrentStep==0){
            btn.disabled=true;
        }
        else{
            CurrentStep--;
        }
        form.classList.remove("active");
        forms[CurrentStep].classList.add("active");

    }
}

function getCurrentSteps(){
    forms.forEach((form,index)=>
    {
    if(form.classList.contains("active")){
        CurrentStep=index
    }})
}

function updateStepBar(){
    var pourcentage=((CurrentStep+1) * 100)/3;
    progressBar.style.width=`${(pourcentage) * (400) / (100)}px`
    circles.forEach((circle,index)=>{
        if(CurrentStep == index || index <CurrentStep){
            circle.classList.add("filled")
        }else{
            circle.classList.remove("filled")
}})
}




