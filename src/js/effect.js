const drawGrey = Symbol("drawGrey"),
    drawEmboss = Symbol("drawEmboss"),
    drawNegative = Symbol("drawNegative");

let player = undefined,
    id = undefined;

class Effects{
    constructor(video,ctx,w,h){
        this.video = video;
        this.ctx = ctx;
        this.w = w;
        this.h = h;
    }
    [drawGrey](){
        if(this.video.paused || this.video.ended) return false;
        this.ctx.drawImage(this.video,0,0,this.w,this.h);
        let imageData = this.ctx.getImageData(0,0,this.w,this.h);
        let data = imageData.data;
        for(let i=0,len=data.length;i<len;i+=4){
            let r = data[i];
            let g = data[i+1];
            let b = data[i+2];
            let brightness = (r+g+b)/3;
            data[i] = brightness;
            data[i+1] = brightness;
            data[i+2] = brightness;
        }
        this.ctx.putImageData(imageData,0,0);
    }
    [drawEmboss](){
        if(this.video.paused || this.video.ended) return false;
        this.ctx.drawImage(this.video,0,0,this.w,this.h);
        let imageData = this.ctx.getImageData(0,0,this.w,this.h);
        let data = imageData.data;
        let width = imageData.width;
        for(let i=0,len=data.length;i<len;i++){
            if( i%4 == 3 ) continue;
            data[i] = 127 + 2*data[i] - data[i + 4] - data[i + width*4];
        }
        this.ctx.putImageData(imageData,0,0);
    }
    [drawNegative](){
        if(this.video.paused || this.video.ended) return false;
        this.ctx.drawImage(this.video,0,0,this.w,this.h);
        let imageData = this.ctx.getImageData(0,0,this.w,this.h);
        let data = imageData.data;
        for(let i=0,len=data.length;i<len;i+=4){
            let r = data[i];
            let g = data[i+1];
            let b = data[i+2];
            data[i] = 255 - r;
            data[i+1] = 255 - g;
            data[i+2] = 255 - b;
        }
        this.ctx.putImageData(imageData,0,0);
    }
}
const draw = function(effects,effect){
    effects[effect]();
    id = setTimeout(draw,25,effects,effect);
}
const readyToDraw = function(canvas,effect){
    let context = canvas.getContext('2d');
    let e = new Effects(player,context,canvas.width,canvas.height);
    draw(e,effect);
}


const toGrey = function(canvas){
    readyToDraw(canvas,drawGrey);
}

const toNegative = function(canvas){
    readyToDraw(canvas,drawNegative);
}

const toEmboss = function(canvas){
    readyToDraw(canvas,drawEmboss);
}


export function ready({p,canvas,efName='toGrey'}={}){
    if(id){
        clearTimeout(id);
    }
    player = p;
    switch (efName) {
        case 'toGrey':
            toGrey(canvas);
            break;
        case 'toNegative':
            toNegative(canvas);
            break;
        case 'toEmboss':
            toEmboss(canvas);
            break;
        default:
            break;
    }
}