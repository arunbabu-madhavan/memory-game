export default class Game{
    constructor(){
      this.TileCount = 30;
      this.completedTiles = 0;
      this.flippedBlock =null;
      this.flips = 0;
      this.score = 0;
      this.rotateTransitionClass = ["rotate1", "rotate2", "rotate3", "rotate4"];
    }
    flip(block){
        if(this.flippedBlock 
                && this.flippedBlock === block)
            return;
        
        this.flips++;

        block.classList
            .add(this.rotateTransitionClass[Math.random() * this.rotateTransitionClass.length | 0]);
        
       if(this.flippedBlock && block.getAttribute("data-type") ===  this.flippedBlock.getAttribute("data-type"))
       {
           this.flippedBlock.classList.add('disappear');
           block.classList.add('disappear');
           this.score = this.score == 0 ? 1 : this.score;
           this.score += 1;
           this.completedTiles +=2;
           this.flippedBlock = null;
           this.gameOver = (this.TileCount == this.completedTiles);
       }
       else
           this.unflip(block);
    }
    unflip(block){
        if(this.flippedBlock)
            this.rotateTransitionClass.map((className) => 
                            this.flippedBlock.classList.remove(className));
             this.flippedBlock = block;
    }
    setBoard(){

    }
}