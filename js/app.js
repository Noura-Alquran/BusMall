'use strict';
let leftImage = document.getElementById('leftImage');
let middleImage= document.getElementById('middleImage');
let rightImage = document.getElementById('rightImage');
let ImageCountar=document.getElementById('container');
let listResults=document.getElementById('results');
let maximumClicks = 25;
let arrOfObjects=[];
let calVotes=0;
let objectsName = [];

function busMallImage ( name,source) {
this.name =name;
this.source =source;
this.viewsCountar=0;
this.clickedCountar=0;
arrOfObjects.push(this);
objectsName.push(this.name);
}

new busMallImage('bag','img/bag.jpg');
new busMallImage('banana','img/banana.jpg');
new busMallImage('bathroom','img/bathroom.jpg');
new busMallImage('boots','img/boots.jpg');
new busMallImage('breakfast','img/breakfast.jpg');
new busMallImage('bubblegum','img/bubblegum.jpg');
new busMallImage('chair','img/chair.jpg');
new busMallImage('cthulhu','img/cthulhu.jpg');
new busMallImage('dog-duck','img/dog-duck.jpg');
new busMallImage('dragon','img/dragon.jpg');
new busMallImage('pen','img/pen.jpg');
new busMallImage('pet-sweep','img/pet-sweep.jpg');
new busMallImage('scissors','img/scissors.jpg');
new busMallImage('shark','img/shark.jpg');
new busMallImage('sweep','img/sweep.png');
new busMallImage('tauntaun','img/tauntaun.jpg');
new busMallImage('unicorn','img/unicorn.jpg');
new busMallImage('usb','img/usb.gif');
new busMallImage('water-can','img/water-can.jpg');
new busMallImage('wine-glass','img/wine-glass.jpg');

function generateRandomIndex(){   
let randomIndex = Math.floor(Math.random() *arrOfObjects.length); 
return randomIndex;
}

let leftImageIndex;
let middleImageIndex;
let rightImageIndex;
let previousShownImg=[];
function renderRandomImages(){
    leftImageIndex = generateRandomIndex(); 
    middleImageIndex=generateRandomIndex();
    rightImageIndex = generateRandomIndex(); 
    
    while(leftImageIndex === middleImageIndex || middleImageIndex === rightImageIndex ||rightImageIndex ===leftImageIndex||previousShownImg.includes(leftImageIndex)||previousShownImg.includes(middleImageIndex)||previousShownImg.includes(rightImageIndex)){
        leftImageIndex = generateRandomIndex(); 
        middleImageIndex=generateRandomIndex();
        rightImageIndex =generateRandomIndex();

    }
    previousShownImg[0]=leftImageIndex;
    previousShownImg[1]=middleImageIndex;
    previousShownImg[2]=rightImageIndex;
    for(let x=0; x < arrOfObjects.length ;x++){
      if (arrOfObjects[leftImageIndex] ===arrOfObjects[x]){
      arrOfObjects[x].viewsCountar ++ ; }
   else if (arrOfObjects[middleImageIndex]===arrOfObjects[x]){
       arrOfObjects[x].viewsCountar ++;
   }
   else if (arrOfObjects[rightImageIndex]===arrOfObjects[x]){
       arrOfObjects[x].viewsCountar ++;
   }
    }

    leftImage.setAttribute('src', arrOfObjects[leftImageIndex].source); 
    middleImage.setAttribute('src',arrOfObjects[middleImageIndex].source);
    rightImage.setAttribute('src', arrOfObjects[rightImageIndex].source);

}
renderRandomImages();


leftImage.addEventListener('click', handleClick);
middleImage.addEventListener('click', handleClick)
rightImage.addEventListener('click', handleClick);
let viewResults= document.getElementById('viewResults');
viewResults.addEventListener('click',result)

function handleClick(event){
    event.preventDefault();   
    calVotes ++;
    if(calVotes <= maximumClicks){
        if(event.target.id === 'leftImage'){
            arrOfObjects[leftImageIndex].clickedCountar++;
        }else if (event.target.id ==='middleImage'){
            arrOfObjects[middleImageIndex].clickedCountar++;
        } else if(event.target.id ==='rightImage'){
            arrOfObjects[rightImageIndex].clickedCountar++;
        }
        renderRandomImages();    }
    }

   let view =0; // to show the results one time .
    function result (event){
        if (calVotes>=maximumClicks && view ===0){
        let li;
        view=1;
        for(let i = 0 ; i < arrOfObjects.length; i++){

            li = document.createElement('li');
            listResults.appendChild(li);    
          li.textContent = `${arrOfObjects[i].name} had ${arrOfObjects[i].clickedCountar} votes , and was seen ${arrOfObjects[i].viewsCountar}  times ` }
          chartRender();

        leftImage.removeEventListener('click', handleClick);
        middleImage.removeEventListener('click',handleClick);
        rightImage.removeEventListener('click', handleClick); 
    }
    

}


function chartRender(){
let dataViews=[];
let dataClicked=[];
for (let n=0;n<arrOfObjects.length;n++){
 dataViews.push(arrOfObjects[n].viewsCountar);
 dataClicked.push(arrOfObjects[n].clickedCountar);
}
console.log(dataViews);
console.log(dataClicked);
    var context = document.getElementById('Rusults-Chart').getContext('2d');

    var chart = new Chart(context, {
        type: 'bar',
        data: {
            labels: objectsName,
            datasets: [{
                label: 'Votes per product by user ',
                backgroundColor:'lightgreen',
                borderColor: 'green',
               data: dataClicked,
            },{
                label: 'Viewed out of 25 times',
                backgroundColor: '#green',
                borderColor:'lightgreen',
              data:dataViews ,    
            }]
           }
    
    });
}
