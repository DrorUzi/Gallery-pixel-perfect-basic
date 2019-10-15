var gNums;
var gTableSize;
var gNextNum;
var gTime;
var gTimerBegin;


function init(size) {
    gTime = 0;
    gTimerBegin = 0;
    gNextNum = 1;
    gTableSize = +size;
    // gNextNum = 1;
    gNums = getNums(gTableSize**2)
    gNums = shuffle(gNums);
    renderTable()
    console.log(gTableSize)
}


function getNums(size) {
    var nums = [];
    for (var i = 0; i < size; i++) {
        nums.push(i + 1)
    }
    return nums
}

function renderTable() {

    var strHtml = '';
    var elTable = document.querySelector('.board');
    for (var i = 0; i < gTableSize; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < gTableSize; j++) {
            var num = gNums.pop();
            strHtml += `<td data-num="${num}" onclick = "cellClicked(this)"> ${num} </td>`
        }
        strHtml += '</tr>'
    }
    elTable.innerHTML = strHtml
}


function cellClicked(elClickednum) {
    var num = +elClickednum.dataset.num
    if(num === 1) {
        gTimerBegin = 1;
        timer();
    }
    if (num === gNextNum) {
        elClickednum.style.backgroundColor = 'grey';
        gNextNum++;
    }if (num === gTableSize**2) {
        gTimerBegin = 0;
        timer()
    } 
        
}


function timer() {
    if (gTimerBegin === 1) {
        setTimeout(function () {
            gTime++;
            var min = Math.floor(gTime / 100 / 60);
            var sec = Math.floor(gTime / 100);
            var mSec = gTime % 100;

            if (min < 10) {
                min = "0" + min;
            }
            if (sec >= 60) {
                sec = sec % 60;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }
            if (mSec < 10) {
                mSec = "0" + mSec;
            }
            document.querySelector(".timer").innerHTML = min + ":" + sec + ":" + mSec;
            timer();
        }, 10)
    }
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(nums) {
    var randIdx, keep, i;
    for (i = nums.length - 1; i > 0; i--) {
        randIdx = getRandomIntInclusive(0, nums.length - 1);

        keep = nums[i];
        nums[i] = nums[randIdx];
        nums[randIdx] = keep;
    }
    return nums;
}