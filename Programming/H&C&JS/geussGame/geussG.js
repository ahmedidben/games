// setting game Name
let gameName="Guess The Word";
document.title=gameName;
document.querySelector("h1").innerHTML=gameName;
document.querySelector("footer").innerHTML=`${gameName} Game created By Amine Idbenadi In ${ new Date().getFullYear()}`;
// set parametres 
const hintB=document.querySelector(".hint");
const checkB=document.querySelector(".check");
hintB.disabled=true;
checkB.disabled=true;
const pop=document.querySelector(".popup");
const popupBtn=document.querySelector("#Submit");
const select=document.querySelector("#Level");
console.log(select)
const inpP=document.querySelector("#lenght");
console.log(popupBtn)
let words = [];
//random word
let TheRightWord="";
// setting inputs  dynm 
let numOFTries=6;
let numOFLetters=6;
let currenttry=1;
let numOfhits=2;
popupBtn.addEventListener("click",function(e){
    e.preventDefault();
    const v=inpP.value;
    console.log(v)
    if(v){
        const fileName="./"+select.value+".json";
        fetch(fileName).then(
            res=>{
                if(!res.ok){
                    throw new Error("File Not found");
                }
                return  res.json();
            }
        )
        .then(
            fileJ=>{
                words=fileJ.A1.filter(e=>[...e].length===+v);
                console.log(words);
                numOFLetters=+v;
                pop.style.display="none";
                hintB.disabled=false;
                checkB.disabled=false;
                TheRightWord=words[Math.floor(Math.random()*words.length)].toLowerCase();
                console.log(TheRightWord);
                generateInputs()
            }
        )
    }

});



//fieldmessage
const messageArea=document.querySelector(".message");



function generateInputs(){
    const inputsContainer=document.querySelector(".inputs");
    
    for(let i=1;i<=numOFTries;i++){
        const tryDiv=document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML=`<span>Try ${i}</span>`;
        if(i!== 1) tryDiv.classList.add("disabled-inputs");
        for(let j=1;j<=numOFLetters;j++){
            const input=document.createElement("input");
            input.type="text";
            input.id=`geuss-${i}-letter-${j}`;
            input.setAttribute("maxlength","1");
            tryDiv.appendChild(input);
        }


        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus();

    // Disable All inputs Except the first 
const inputsDisabled =document.querySelectorAll(".disabled-inputs input");
//console.log(inputsDisabled)
inputsDisabled.forEach((e)=>(e.disabled=true));
// convert Input to upperCase
let inputs=document.querySelectorAll("input");
inputs.forEach((e,i)=>{
    e.addEventListener("input",function(){
        this.value=this.value.toUpperCase(); 
        const nextinp=inputs[i+1];
        if(nextinp) nextinp.focus();
    });
   e.addEventListener("keydown",function(event){
    //console.log(event)
    const currenI=Array.from(inputs).indexOf(event.target);
    if(event.key==="ArrowRight"){
        const nextInput= currenI+1;
        if(nextInput < inputs.length) inputs[nextInput].focus();
    }
    if(event.key==="ArrowLeft"){
        const nextInput= currenI-1;
        if(nextInput >=0) inputs[nextInput].focus();
    }
   })
})
}




// setting game logic

checkB.addEventListener("click",handleGeusses);

function handleGeusses(){
    let successGame=true;
    for(let i=1;i<=numOFLetters;i++){
        const inputField=document.querySelector(`#geuss-${currenttry}-letter-${i}`);
        //console.log(inputField)
         if(inputField){
            const letterG=inputField.value.toLowerCase();
        const actuelLetter=TheRightWord[i-1];
        //console.log(document.querySelector(`#guess-${currenttry}-letter-${i}`))
        //
        if(letterG === actuelLetter){
            //Letter is Right in the place
            inputField.classList.add("Ok");
        }else if(TheRightWord.includes(letterG) && letterG!==""){
            //Letter Is correct but not the R.place
            inputField.classList.add("no-inTheRightP");
            successGame=false;

        }else{
            //the letter not exist
            inputField.classList.add("no");
            successGame=false;
        }
         }else{
            successGame=false;
         }
        
    }
   if(successGame){
    const winExpressions = [
         "🎉 Boom! You crushed it!",
         "🔥 Nailed it! You're on fire!",
          "🎯 Bullseye! That was epic!",
          "💡 Genius mode: ACTIVATED!",
          "🏆 Victory dance time!",
          "🚀 Blast off! You did it!",
          "😂 Even I’m impressed!",
          "🎶 Winning looks good on you!",
          "💥 Kaboom! That was awesome!",
          "👏 Give yourself a high five!",
          "🎊 Confetti time! You rock!",
          "😎 Too easy for you, huh?",
          "🎩 Hats off to you, champ!",
          "🥳 Party mode: ON!",
          "🍕 You deserve a pizza for that!"
      ];
      let Exp=winExpressions[Math.floor(Math.random()*winExpressions.length)];
      messageArea.innerHTML=`${Exp},<span> In ${currenttry} Try </span>`;
      // now the Game IS Over

      let AllTries=document.querySelectorAll(".inputs > div");
      //console.log(AllTries);
      AllTries.forEach(e=>{
        if(!(e.classList.contains("disabled-inputs"))){
            //console.log(e.classList.contains("disabled-inputs"))
            e.classList.add("disabled-inputs");
        }
            
    });
      checkB.disabled = true;
      hintB.disabled=true;
      currenttry=1;
   }else{
        currenttry++;
        for(let i=1;i<=numOFTries;i++){
            if(i!=currenttry){
                const div=document.querySelector(`.try-${i}`);
                div.classList.add("disabled-inputs");
                [...div.children].forEach((e,i)=>{
                    if(i!==0) e.disabled=true;
                });
            }
            else{

                const div=document.querySelector(`.try-${i}`);
                if(div){
                    div.classList.remove("disabled-inputs");
                    [...div.children].forEach((e,i)=>{
                    if(i!==0) e.disabled=false;
                    });
                    div.children[1].focus();
                    console.log(div)
                }
            }
        }
        if(currenttry>6){
            checkB.disabled=true;
            hintB.disabled=true;
            const loseExpressions = [
                "This is why she left you... 😂",
                "You tried your best... and failed miserably. 💀",
                "Even my grandma plays better than this. 😆",
                "Did you even have a game plan? Or just vibes? 🤡",
                "Congratulations! You lost in record time! ⏳",
                "If losing was an Olympic sport, you'd get gold. 🥇",
                "Maybe gaming isn’t your thing… try knitting? 🧶",
                "That was embarrassing. Even the AI feels bad for you. 🤖💔",
                "Skill issue? More like life issue. 😭",
                "Bro, uninstall the game. It’s for your own good. 🚪"
              ];
              let Exp=loseExpressions[Math.floor(Math.random()*loseExpressions.length)];
              messageArea.innerHTML=`${Exp},The word Is <span>${TheRightWord}</span>`;              
        }
   } 
}

//hints function 


hintB.children[0].innerHTML=` ${numOfhits} `;
//console.log(hintB);
hintB.addEventListener("click",Givehit);

function Givehit(){
    if(numOfhits>0){
        numOfhits--;
        hintB.children[0].innerHTML=` ${numOfhits} `;
    }
    if(numOfhits===0){
        hintB.disabled=true;
    }

    const NotDisbledinputs=document.querySelectorAll(".geuss-game input:not(:disabled)");
    console.log(NotDisbledinputs);
    const emptyInput=Array.from(NotDisbledinputs).filter(inp=>inp.value==="");
    // get a rindom empty input 
    if(emptyInput.length!==0){
        let i=Math.floor(Math.random()*emptyInput.length);
        
        const Inputtarget=emptyInput[i];
        let j=Array.from(NotDisbledinputs).indexOf(Inputtarget);
       console.log(Inputtarget);
       Inputtarget.value=TheRightWord[j].toUpperCase();

    }
}

// some Function
function handelBackspace(event){
    //console.log(event);
    if(event.key==="Backspace"){
        const inputs=document.querySelectorAll("input:not(:disabled)");
        const active=document.activeElement;
        IndexOfElement=Array.from(inputs).indexOf(active);
        if(IndexOfElement!==-1){
            currentEle=inputs[IndexOfElement];
            prevousEle=inputs[IndexOfElement-1];
            currentEle.value="";
            prevousEle.focus();
            prevousEle.value="";
        }
    }

    if(event.key==="Enter"){
        checkB.click();
    }

}

document.addEventListener("keydown",handelBackspace);

window.onload=function(){
    
}

