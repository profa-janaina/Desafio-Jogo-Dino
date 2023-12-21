const DINO = document.querySelector(".dino");
const BACKGROUND = document.querySelector(".background")
let isJumping = false;
let cactusSpeed = 4;
let position = 0; 

// Pulo do Dino
function jump(){    
    isJumping = true;  
    //console.log(screen.height/2)
    
    let upInterval = setInterval(() => {
        //console.log(DINO.style.bottom)
        if (position >= 200) {
            clearInterval(upInterval)            

            // Descer
            let downInterval = setInterval(() => {  
                if (position <= -60) {
                    clearInterval(downInterval) 
                    isJumping = false ;                  
                } else {
                    position -= 10;            
                    DINO.style.bottom = screen.height / 2  + position + 'px'                    
                }
            }, 20)

        } else {
            position += 20;            
            DINO.style.bottom = screen.height / 2  + position + 'px'
            
        }
    }, 20)
}

function handleKeyup(event){
    if (event.keyCode === 32) {
        if(!isJumping){
            jump();
        }
    }
}

// Gerar os cactos
function createCactus(){
    const CACTUS = document.createElement("div");
    let cactusPosition = screen.width * 0.95;

    CACTUS.classList.add('cactus')
    CACTUS.style.left = cactusPosition + 'px';
    BACKGROUND.appendChild(CACTUS);

    handleCactus(CACTUS, cactusPosition);
}

function handleCactus(cactus, cactusPosition){    
    let randomTime = Math.random()*6000;
     
    let leftInterval = setInterval(() => {
        if (cactusPosition <= -70) {
            clearInterval(leftInterval);
            BACKGROUND.removeChild(cactus);
        } else if(cactusPosition > 0 && cactusPosition <= 60 && position <=0){
            clearInterval(leftInterval);
            document.body.innerHTML = "<h1 class='gameOver'>Fim de Jogo</h1>"

        }else {
            cactusPosition -= cactusSpeed;            
            cactus.style.left = cactusPosition + 'px'; 
        }
    }, 20)

    let cactusSpeedInterval = setInterval(() => { 
        if (cactusSpeed < 36) {
            cactusSpeed += 2            
        }
        else{
            clearInterval(cactusSpeedInterval)
        }
    }, 30000)

    setTimeout(createCactus, randomTime)
}

createCactus();
window.addEventListener("keyup", handleKeyup)