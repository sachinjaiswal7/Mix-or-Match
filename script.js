// varibles and code  for starting audio
let creepy = document.querySelector("#creepy")
let flip = document.querySelector("#flip");
let gameOver = document.querySelector("#gameover");
let match = document.querySelector("#match")
let victory = document.querySelector("#victory")
creepy.play()







// code for choosing the difficulty of the game
let select = document.querySelector("#difficulty")
let flips = document.querySelector("#flips")
let remainingFlips = Number(flips.innerText)
console.log(remainingFlips)

select.addEventListener("input",(e)=>{
    putCardsBack()
   if(e.target.value== "easy"){
       flips.innerText = 32;
   }
   else if(e.target.value == "medium"){
       flips.innerText = 28
   }
   else if(e.target.value == "hard"){
       flips.innerText = 22
   }
   remainingFlips = Number(flips.innerText)
})











// code for card mathing and non matching stuff
let gameOverOverlay = document.querySelector(".overlay.gameover")
let victoryOverlay =  document.querySelector(".overlay.victory");
let prev  = [];
let countOfMatched  = 0;
document.addEventListener("click",(e)=>{
    let elem = e.target.closest(".card");
    if(elem!=null){
      let check = false;
        elem.classList.forEach((e)=>{
            if(e == "matched" || e == "visible"){
                check = true;
            }
        })
       if(!check){
          remainingFlips--;
             flip.currentTime  = 0;
             flip.play()
           elem.classList.add("visible")
           let imageElem = elem.querySelector(".card-value");
           let obj = {
               imageElem:imageElem,
               element:elem,
               src:imageElem.src
            }
            if(prev.length == 0){
                prev.push(obj)
            }
            else if(prev.length == 1){
                if(prev[0].imageElem != obj.imageElem){
                    prev.push(obj)
                    if(isMatched(prev)){
                        countOfMatched++;
                        match.play()
                        if(countOfMatched == 8){
                            if(isVictory()){
                                victory.play();
                                victoryOverlay.classList.add("active")

                            }
                            
                            creepy.pause();
                            creepy.currentTime = 0;
                        }
                        prev = []
                    }
                }
                else{
                    prev = []
                }
            }
            else if(prev.length == 2 ){
                if(obj.imageElem == prev[0]){
                }
                prev[0].element.classList.remove("visible");
                prev[1].element.classList.remove("visible");
                prev = [];
                prev.push(obj)
            }
            if(remainingFlips == 0 && !isVictory()){
                gameOverOverlay.classList.add("active")
                gameOver.play()
                return
 
            }
            else {
                flips.innerText = ""+remainingFlips
            }
           
           
           
       }
        
    }
    
})

function isMatched(prev){
    if(prev[0].src ===  prev[1].src){
        prev[0].element.classList.add("matched");
        prev[1].element.classList.add("matched")
        return true
    }
    return false
}

let buttons = document.querySelectorAll("button");
buttons.forEach((e)=>{
    e.addEventListener("click",()=>{
        location.reload()
    })
})

// function for deciding the victory
function isVictory(){
let cards = document.querySelectorAll(".card");
for(let i = 0;i<cards.length;i++){
    let classList = cards[i].classList;
    let check = false;
    for(let j =0;j<classList.length;j++){
        if(classList[j] === "matched")check = true;

    }
    if(!check)return false;
}
return true;
}

// code to reload the cards in random order
function reloadCards(){
let cards = document.querySelectorAll(".card-value")
let srcs = []
cards.forEach((e)=>{
  srcs.push(e.src)
})
for(let i = srcs.length-1;i>0;i--){
    let random = Math.floor(Math.random() * (i+1))
    let temp = srcs[random]
    srcs[random] = srcs[i]
    srcs[i] = temp
}
for(let i = 0;i<cards.length;i++){
    cards[i].src = srcs[i]
}
}

reloadCards()

// code to put cards back in the position for difficutly purpose 
function putCardsBack(){
    let cards = document.querySelectorAll(".card");
    cards.forEach((e)=>{
        e.classList.remove("visible")
    })
}