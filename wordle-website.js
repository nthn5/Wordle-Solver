let boxContainer = document.querySelector('#box-container');
function boxes(){
    for(let i = 0; i < 30; i++){
        let box = document.createElement('div');
        box.setAttribute('style', 'font-weight: bold; display: flex; justify-content: center; align-items: center; text-transform: uppercase; width: 52px; height: 52px; border: 2px solid #3a3a3c; margin: 3px; color: white; font-size: 42px;')
        box.classList.add('box');
        boxContainer.appendChild(box);
    }
}
boxes();

wordFunction();//from words.js
wordFunction2();//from words2.js

let parent = document.querySelector('#parent');
let items;
let guess;
let series='';
let xyg = ['1', '2', '3'];

function restart(){
    wordFunction();
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
    colCount = 0;
    rowCount = 1;
    count = 0;
    colCountSeries = 0;
    for(let i = 0; i <box.length; i++){
        box[i].textContent = '';
        box[i].style.backgroundColor = '#121213'; box[i].style.borderColor = '#3a3a3c';
    }
}

function check(guess, series){
    let xyg_count = 0;
    for(let i = 0; i < series.length; i++){
        if(xyg.includes(series[i])){
            xyg_count+=1;
        }
    }
    if(words2.includes(guess) && xyg_count == 5){ 
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
        display();
        wordleSolver(guess, series);
    }
    else{
        rowCount-=1;
        colCount = rowCount*5;
        colCountSeries = colCount;
        count = rowCount - 1;
        alert('word is invalid');
    }
}

let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let run = 0;
function wordleSolver(guess, series){
    let total;
    let letters = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let removeCounter = 0;
    const wordsTup = Array.from(words);
    for(let word in wordsTup){
        for(let i in series){
            if(series[i] == '1' && wordsTup[word].includes(guess[i])){
                words.splice(words.indexOf(words[word - removeCounter]), 1);
                removeCounter++;
                break;
            }
            else if(series[i] == '3' && wordsTup[word][i] != guess[i]){
                words.splice(words.indexOf(words[word - removeCounter]), 1);
                removeCounter++;
                break;
            }
            else if(series[i] == '2' && wordsTup[word].includes(guess[i]) == false){
                words.splice(words.indexOf(words[word - removeCounter]), 1);
                removeCounter++;
                break;
            }
            else if(series[i] == '2' && wordsTup[word][i] == guess[i]){
                words.splice(words.indexOf(words[word - removeCounter]), 1);
                removeCounter++;
                break;
            }
        }
    }
    removeCounter = 0;
    let score = 0;
    let dict = {};
    for(let word in words){
        for(let i in guess){
            for(let x in letters){
                if(alphabet[x] == words[word][i]){
                    letters[x]++;
                }
            }
        }
    }
    for(let word in words){
        for(let i in letters){
            if(words[word].includes(alphabet[i])){
                score += letters[i];
            }
        } 
        total = words.length * 5;
        dict[words[word]] = (score/total).toFixed(3);
        score = 0;
    }
    for(let i in letters){
        letters[i] = 0
    }
    //sorts based on score. 
    items = Object.keys(dict).map(function(key) {
        return [key, ' ' + dict[key]];
    });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    for(i in items){
        let displayWord = document.createElement('div');
        displayWord.textContent = items[i];
        displayWord.setAttribute('style', 'color: white; text-align: center;')
        parent.appendChild(displayWord);
    }
    run++;
}

let colCount = 0;
let rowCount = 1;
let box = boxContainer.children;
function display(letter){
    if(colCount < rowCount*5){
        box[colCount].textContent = letter;
        box[colCount].style.borderColor = '#565758';
        box[colCount].classList.add('animate-letters');
        setTimeout(() => {
            box[colCount-1].classList.remove('animate-letters');
        }, 40);
    }
    else{return;}
}
 
let count = 0;
let colCountSeries = (rowCount-1)*5;
document.addEventListener('keydown', function(e){
    let letter = e.key;
    if(alphabet.includes(letter)){
        display(letter);
        if(colCount < rowCount*5){colCount++;}
    }
    if(letter == 'Backspace'){
        if(colCount > count*5 && colCountSeries == count*5){
            box[colCount-1].textContent = '';
            box[colCount-1].style.backgroundColor = '#121213'; box[colCount-1].style.borderColor = '#3a3a3c';
            colCount--;
            if(colCountSeries > count*5){colCountSeries--;}
        }
        if(colCountSeries > count*5){
            box[colCountSeries-1].style.backgroundColor = '#121213'; box[colCountSeries-1].style.borderColor = '#3a3a3c';
            colCountSeries--;
            series = series.slice(0,(colCountSeries-count*5));
            if(box[colCountSeries].textContent != ''){
                box[colCountSeries].style.borderColor = '#565758';
            }
        }
    }
    if(letter == '1'){
        if(colCountSeries < rowCount*5){
            box[colCountSeries].style.backgroundColor = '#3a3a3c'; box[colCountSeries].style.borderColor = '#3a3a3c';
            colCountSeries++;
            series+='1';
            box[colCountSeries-1].classList.add('animate-letters');
            setTimeout(() => {
                box[colCountSeries-1].classList.remove('animate-letters');
            }, 40);
        }
    }
    if(letter == '2'){
        if(colCountSeries < rowCount*5){
            box[colCountSeries].style.backgroundColor = '#b59f3b'; box[colCountSeries].style.borderColor = '#b59f3b';
            colCountSeries++;
            series+='2';
            box[colCountSeries-1].classList.add('animate-letters');
            setTimeout(() => {
                box[colCountSeries-1].classList.remove('animate-letters');
            }, 40);
        }
    }
    if(letter == '3'){
        if(colCountSeries < rowCount*5){
            box[colCountSeries].style.backgroundColor = '#538d4e'; box[colCountSeries].style.borderColor = '#538d4e';
            colCountSeries++;
            series+='3';
            box[colCountSeries-1].classList.add('animate-letters');
            setTimeout(() => {
                box[colCountSeries-1].classList.remove('animate-letters');
            }, 40);
        }
    }
    if(letter == 'Enter' && checkCounts(colCountSeries, colCount) == true){
        guess = '';
        for(let i = count*5; i < rowCount*5; i++){
            guess+=box[i].textContent;
        }
        colCount = rowCount*5;
        rowCount++;
        count++;
        check(guess, series);
        series = '';
        box[colCount].classList.remove('animate-letters');
        box[colCount].style.borderColor = '#3a3a3c';
    }
});

function checkCounts(colCountSeries, colCount){
    colCountSeries/=rowCount;
    colCount/=rowCount;
    if(colCount == 5 && colCountSeries == 5){return true;}
    else{return false;}
}

let restartBtn = document.querySelector('#restart-button');
restartBtn.addEventListener('mousedown', (e) => {
    e.preventDefault();
})

//take back previous guess button 