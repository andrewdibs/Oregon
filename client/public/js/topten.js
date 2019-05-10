function topScore(name,score, date){
    this.playerName = name;
    this.playerScore = score;
    this.playerDate = date;
}

//document.addEventListener('DOMContentLoaded', () => {
//  let elements = []
//  let container = document.querySelector('#container')
//  // Add each row to the array
//  container.querySelectorAll('.row').forEach(el => elements.push(el))
//  // Clear the container
//  container.innerHTML = ''
//  // Sort the array from highest to lowest
//  elements.sort((a, b) => b.querySelector('.score').textContent - a.querySelector('.score').textContent)
//  // Put the elements back into the container
//  elements.forEach(e => container.appendChild(e))
//})

window.addEventListener("keydown",function(event){
    if(event.keyCode == 32)
        window.location.href = "../mainmenu";
    });

window.addEventListener("load",getScores());


function getScores(){
    fetch('/api/topTen/print').then(function(response){
        if (response.status!=200){
            console.log("problem with ajax call"+ response.status+"msg: "+response.vlaue);
            return;
        }
        response.text().then(function(data){
            console.log(data);
            printTopTen(data);
        });
    });
}
function sort(topScores){
    topScores.sort(function(a,b){
        return b-a;
    });
}

function printTopTen(data){
    var scores = JSON.parse(data);
    var topScores = [];
    
    for (var score in scores){
        topScores.push(scores[score]);
    }
    
    sort(topScores);
    
    if (topScores.length>10){
        for (var i =0; i<10; i++){
            var currentScore= topScores[i];
            document.getElementById("scoreID"+i).innerHTML = JSON.stringify(currentScore); 
        }
    }
    else{
        for(var i = 0;i<topScores.length;i++){
            var currentScore = topScores[i];
            document.getElementById("scoreID"+i).innerHTML = JSON.stringify(currentScore);
        }
    }
}
