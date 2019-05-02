export default class StopWatch{
    constructor(){
        this.timer = null;
        this.update = function(){};
        this.startTime = new Date().getTime();
        this.timeElapsed = 0;
        this.running = false;
    }
    start(){
        if(!this.running)
        {   
            this.startTime = new Date().getTime();
            this.timer = setInterval(this.tick.bind(this),1000);
            this.running = true;
        }
    }
    get elaspsedTimeString(){
        const diff = this.timeElapsed;
        return ((diff/360) >= 1 ? Math.floor((diff/3600)).toString()
        .padStart(2,"0") +" : " : "" )+ (Math.floor((diff/60)%60)).toString().padStart(2,"0") 
                    + " : " 
                        +(diff%60).toString().padStart(2,"0") ;
    }
    tick(){
        const currentTime = new Date().getTime();
        const diff = currentTime - this.startTime;
        this.timeElapsed = Math.floor(diff / 1000);    
        this.update();
    }
  
    stop(){
        clearInterval(this.timer);
        this.running = false;
    }
    reset(){
        this.startTime = new Date().getTime();
        this.timeElapsed = 0;
    }
}