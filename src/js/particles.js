const update = Symbol('update'),
	paint = Symbol('paint'),
	properties = {
		ctx:undefined,
		amount:null,
		width:null,
		height:null,
	},
	particles = [];

class Particle{
	constructor(ctx,radius,position,color,speed,angle){
		this.ctx = ctx;
		this.radius = radius;
		this.position = position;
		this.color = color;
		this.speed = speed;
		this.angle = angle;
	}
	[update](){
		if(this.position.x+this.radius >= properties.width || this.position.x-this.radius <= 0){
			this.speed = -this.speed;
			this.angle = 2*Math.PI-this.angle;
		}
		if(this.position.y+this.radius >= properties.height || this.position.y-this.radius <= 0){
			this.speed = -this.speed;
			this.angle = Math.PI-this.angle;
		}
		this.position.x += this.speed * Math.cos(this.angle);
		this.position.y += this.speed * Math.sin(this.angle);
	}
	[paint](){
		this.ctx.beginPath();
		this.ctx.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI);
		this.ctx.strokeStyle = "#000000";
		this.ctx.stroke();
		this.ctx.strokeStyle = this.color;
		for(let i=0;i<5;i++){
			let begin = 162*Math.PI/180+i*72*Math.PI/180;
			let end = Math.PI/10+i*72*Math.PI/180;
			this.ctx.beginPath();
			this.ctx.moveTo(this.position.x+(this.radius*Math.cos(begin)),this.position.y-(this.radius*Math.sin(begin)));
			this.ctx.lineTo(this.position.x+(this.radius*Math.cos(end)),this.position.y-(this.radius*Math.sin(end)));
			this.ctx.stroke();
		}
		this.ctx.closePath();
	}
}


const getPosition = function(){
	const x = Math.random()*properties.width,
		y = Math.random()*properties.height;
	return {x,y};
}
const getColor = function(){
	const r = Math.floor(Math.random()*256),
		g = Math.floor(Math.random()*256),
		b = Math.floor(Math.random()*256);
	return '#'+r.toString(16)+g.toString(16)+b.toString(16);
}

const init = function(){
	for(let i=0;i<properties.amount;i++){
		particles.push(new Particle(properties.ctx,Math.random()*10,getPosition(),getColor(),Math.random()*3+1,(Math.random()*360/180)*Math.PI));
	}
	loop();
}

function loop(){
	properties.ctx.clearRect(0,0,properties.width,properties.height);
	for(let particle of particles){
		particle[update]();
		particle[paint]();
	}
	window.requestAnimationFrame(loop);
}



export default ({canvas,amount}) => {
	properties.ctx = canvas.getContext('2d');
	properties.width = canvas.width = window.innerWidth;
	properties.height = canvas.height = window.innerHeight;
	properties.amount = amount;
	window.addEventListener('resize',function(){
		properties.width = canvas.width = window.innerWidth;
		properties.height = canvas.height = window.innerHeight;
	},false);
	init();
}

