import StopWatch from "./timer.js";
import Game from "./GameEngine.js"

const imageDataUrl = "./js/data/images.json";
var highScore;
window.onload = ()=>{

    if (window.localStorage) {
        highScore = localStorage.getItem('blocks-high-score');
        highScore = highScore ? highScore :0;
        document.getElementById('high_score').innerText= highScore; 
    } 
    else 
       document.querySelector('score-board > h4:first-child').style.visibility = "hidden";

    const timer = new StopWatch();
    const game = new Game();
    timer.update = () =>{

        document.getElementById("time_elapsed").innerText = timer.elaspsedTimeString;
        document.getElementById("blocks_flipped").innerText = game.flips;
        var timepenalty = (120 - timer.timeElapsed);
        timepenalty = timepenalty > 0 ? 0 : timepenalty;
        game.score = game.InitScore - (game.flips) - timepenalty;
        document.getElementById("score").innerText = game.score;


        if(game.gameOver){
            timer.stop();
            document.getElementById("score").innerText = game.score;
            document.getElementById('playAgain').style.display = 'block';

            if(highScore !=undefined && game.score > highScore) {
                localStorage.setItem('blocks-high-score', game.score);
                document.getElementById('high_score').innerText=  game.score;

            }
        }
    };

    fetch(imageDataUrl)
         .then(r=>r.json())
         .then(r=>Promise.all([r]))
         .then(r=>{
             const wholeSet = r[0].sort((a,b)=>{return Math.random() - 0.5}).slice(0,13);

             var  temp =[...wholeSet];
             var blocks = [];
             var selectedImage = null;

             for(var idx=0;idx<game.TileCount;idx++)
             {
                selectedImage = selectedImage == null ? 
                            temp[Math.random() * temp.length | 0 ] : selectedImage;
                blocks.push(selectedImage);
                
                swap(idx, Math.random() * (idx) | 0);
                selectedImage = temp.indexOf(selectedImage) > -1 ? selectedImage :null;
                if(selectedImage)
                    temp.splice(temp.indexOf(selectedImage),1);

                if(temp.length == 0 && selectedImage == null)
                    temp =[...wholeSet];
             }

             function swap(idx1,idx2){
                var temp = blocks[idx1];
                blocks[idx1] = blocks[idx2];
                blocks[idx2] = temp;
             }

             loadBlocks(blocks);

             [...document.getElementsByClassName('block')].map((block)=> 
                {block.addEventListener('click',()=>{timer.start();game.flip(block);});});
        });
    
};

function loadBlocks(blocks)
{
    const block_template_format = (block) => document.getElementById("block").innerHTML
                                                     .replace("$type",block.type)
                                                     .replace("$src",block.src);
    
    document.getElementsByTagName('game-board')[0].innerHTML += blocks.map(block_template_format)
                                                                  .join('');
    document.getElementById('playAgain').addEventListener("click",()=>{location.reload()});
                                                                  
}