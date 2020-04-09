"use strict"


var fieldWidth=350;//ширина игрового поля
var fieldHeight=250;//высота игрового поля
var fieldTop=30;//координата Y игрового поля
var fieldLeft;//координата X игрового поля
var racketWidth=8;//ширина ракеток
var racketHeight=50;//высота ракеток
var ballRadius=20;//радиус шара
var ballLeft;//координата X мяча 
var ballTop;//координата Y мяча
var countDivWidth=40;//ширина циферблата со счетом
var countDivHeight=20;//высота циферблата со счетом
var countDivLeft;//координата X циферблата
var countWidth=20;//ширина цифр
var countHeight=20;//высота цифр
var moveX;//перемещение мяча по координате X
var moveY;//перемещение мяча по координате Y
var znakX;//направление движения мяча по координате X
var znakY;//направление движения мяча по координате Y
var racket1top;//координата Y левой ракетки
var racket2top;//координата Y правой ракетки
var racket1Speed;//скорость левой ракетки
var racket2Speed;//скорость правой ракетки
var racketSpeed=1.2;//скорость ракеток 
var count1=0;//счет для левой ракетки
var count2=0;//счет для правой ракетки
var random1=80;//диапазон для генерации случайного числа для расчета скорости мяча
var random2=90;//диапазон для генерации случайного числа для расчета скорости мяча
var play=0;//состояние игры

var field=document.getElementById('field');
field.style.width=fieldWidth+'px';
field.style.height=fieldHeight+'px';
field.style.top=fieldTop+'px';
fieldLeft=field.offsetLeft;
var countDiv=document.getElementById('count');
countDiv.style.width=countDivWidth+'px';
countDiv.style.height=countDivHeight+'px';
countDivLeft=fieldWidth/2-countDivWidth/2;
countDiv.style.left=countDivLeft-field.offsetLeft/2+'px';
countDiv.style.top=fieldTop-countDivHeight+'px';
countDiv.innerHTML=(count1+' : '+count2)
var racket1=document.getElementById('racket1');
racket1.style.width=racketWidth+'px';
racket1.style.height=racketHeight+'px';
racket1.style.top=racket1top+'px';
var racket2=document.getElementById('racket2')
racket2.style.width=racketWidth+'px';
racket2.style.height=racketHeight+'px';
racket2.style.left=(fieldWidth-racketWidth)+'px';
var ball=document.getElementById('ball');
ball.style.width=ballRadius+'px';
ball.style.height=ballRadius+'px';
ballLeft=fieldWidth/2-ballRadius
ball.style.left=ballLeft+'px';
ballTop=fieldHeight/2-ballRadius
ball.style.top=ballTop+'px';


function znak(){
  var z=Math.round(Math.random())
  if (z==1){
    return 1
  }
  if (z==0){
    return -1
  }
}
function randomDiap(n,m) {
  return Math.floor(
    Math.random()*(m-n+1)
    )+n;
}

function start(){
  play=1;
  racket1top=0
  racket2top=0
  racket1Speed=0;
  racket2Speed=0;
  ballLeft=fieldWidth/2-ballRadius
  ballTop=fieldHeight/2-ballRadius 
  znakX=znak()
  znakY=znak()
  moveX=znakX*(randomDiap(random1,random2)/100);
  moveY=znakY*(randomDiap(random1,random2)/100);   
  requestAnimationFrame(ballmove)   
}
window.addEventListener("keydown", function(EO) {
	EO = EO || window.event;
    EO.preventDefault();

    if (EO.keyCode===17) {
   		racket1Speed=racketSpeed;
   	}

   	if (EO.keyCode===16) {
   		racket1Speed=-racketSpeed;
   	}

   	if (EO.keyCode===40) {
   		racket2Speed=racketSpeed;
   	}

   	if (EO.keyCode===38) {
   		racket2Speed=-racketSpeed;
   	}
});

window.addEventListener("keyup", function(EO) {
	EO = EO || window.event;
    EO.preventDefault();

    if (EO.keyCode===17) {
   		racket1Speed=0;
   	}

   	if (EO.keyCode===16) {
   		racket1Speed=0;
   	}

   	if (EO.keyCode===40) {
   		racket2Speed=0;

    }

   	if (EO.keyCode===38) {
   		racket2Speed=0;
   	}
});

function ballmove() {

racket1top+=racket1Speed;  
racket1.style.top=racket1top+'px'; 
racket2top+=racket2Speed;  
racket2.style.top=racket2top+'px';
ballTop+=moveY;
ball.style.top=ballTop+'px';
  if ( ballTop+ballRadius>fieldHeight) {
    moveY=-moveY;    
  }
  if ( ballTop<0 ) {
    moveY=-moveY;   
  }  

ballLeft+=moveX;
ball.style.left=ballLeft+'px';

if ( ballLeft+ballRadius>=fieldWidth){
   moveX=0;
   moveY=0;   
   if (play==1){
     count2+=1;
   }
   
   play=2;
 

}
  if ( ballLeft<0 ) {
   moveX=0;
   moveY=0; 
   if (play==1){
     count1+=1;
   }
   
   play=2;  
  
  }
if ( ballLeft<=racketWidth&&ballTop>=racket1top&&ballTop<=racket1top+racketHeight){
    moveX=-moveX;
    } 
 
if ( ballLeft+ballRadius>=fieldWidth-racketWidth&&ballTop>=racket2top&&ballTop<=racket2top+racketHeight){
    moveX=-moveX;
    }  
            if (racket1top<=0){
racket1Speed=0
  racket1top=0
}  
      if (racket2top<=0){
  racket2Speed=0
racket2top=0
} 
       if (racket2top>=fieldHeight-racketHeight){
  racket2Speed=0
racket2top=fieldHeight-racketHeight
}
       if (racket1top>=fieldHeight-racketHeight){
  racket1Speed=0
racket1top=fieldHeight-racketHeight
}
countDiv.innerHTML=(count1+' : '+count2)
requestAnimationFrame(ballmove)

}
