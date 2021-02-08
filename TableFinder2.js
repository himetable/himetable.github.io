var nowtable = 0;
window.onload = function() {
    var str = decodeURIComponent(location.search.substr(1, location.search.length));
    sub = str.split(',');
    history.replaceState({}, null, location.pathname);
    var n = search(0);
    setSub("loading", "");
    setSub("tablenum", n);
    displayTable(nowtable);
}

function setSub(block_id, block_html) {
    obj = document.getElementById(block_id);
    if (obj == null) {
        alert(block_id + ' Error');
        return;
    }
    obj.innerHTML = block_html;
}

window.onkeydown = function() {
    if (event.keyCode == '37' || event.keyCode == '40') {
        if(nowtable != 0) {
            displayTable(--nowtable);
            this.setSub("nownum", nowtable+1);
        }
    }
    else if (event.keyCode == '39' || event.keyCode == '38') {
        if(nowtable != n - 1) {
            displayTable(++nowtable);
            this.setSub("nownum", nowtable+1);.
        }
    }
}

function leftClick() {
    if(nowtable != 0) {
        displayTable(--nowtable);
        this.setSub("nownum", nowtable+1);
    }
}

function rightClick() {
    if(nowtable != n - 1) {
        displayTable(++nowtable);
        this.setSub("nownum", nowtable+1);
    }
}

/** USE PARSING TOOL **/
var sorted =
[['중국어 문법', '일본어 문법', 'AP생물학I', '언어와매체', 'AP미시경제', 'AP통계학', 'AP화학I', '문학', '기하', '수학I', '심화 영어 독해I'],//
['선형대수학', '화학I', 'AP미시경제', 'AP물리학C 역학', '생명과학I', 'AP화학I', '문학', '기하', '수학I', '심화 미분적분학I'],//
['윤리와 사상', 'AP통계학', '영미문학I', '생명과학I', '문학', '기하', '수학I', '심화 영어 독해I'],//
['드로잉', '음악 연주(무학년)', 'AP물리학C 역학', '생명과학I', '문학', '기하', '수학I'],//
['AP물리학C 역학', '수학I'],//
['지구과학I', 'AP생물학I', '화학I', '정치와법', '영미문학I', 'AP화학I', '문학', '기하', '수학I', '심화 미분적분학I'],//
['정치와법', '문학', '수학I', '심화 미분적분학I', '심화 영어 독해I'],//
['물리학II', '세계사', '언어와매체', '음악 연주(무학년)', 'AP화학I', '문학', '기하', '수학I', '심화 미분적분학I', '심화 영어 독해I'],//
['정보과학', '퍼블릭스피킹과 프리젠테이션', '미술사(무학년)', '문학과 매체', '음악사(무학년)', '과학과제 연구(생명과학)', '생활과 과학', '사회과제 연구(사회과학)', '경제'],//
['사회과제 연구(인문학)', '과학과제 연구(수학통계)', '문학과 매체', '과학과제 연구(물리)+(정보전산)', '과학과제 연구(생명과학)', '생활과 과학', '사회과제 연구(사회과학)', '경제', '운동과 건강'],//
['과학과제 연구(물리)+(정보전산)', '생활과 과학', '사회과제 연구(사회과학)', '경제', '운동과 건강'],//
['동아시아사', '과학과제 연구(화학+지구환경)', '음악사(무학년)', '과학과제 연구(생명과학)', '사회과제 연구(사회과학)', '경제','운동과 건강'],//
['과학과제 연구(화학+지구환경)', '과학과제 연구(물리)+(정보전산)', '과학과제 연구(생명과학)', '경제','운동과 건강']];
/** USE PARSING TOOL **/

var n = 0;
var subchk = Array(10).fill(false);
var timechk = Array(13).fill(false);
var tempTable = Array.from(Array(7), () => Array());
var allTable = Array(500);
var sub = Array(10);

function search(idx) {
    if (idx == 10) {
        tempTable[6][2] = "창체"; // WED7 Always NULL

        for (var i = 0; i < 13; i++) {
            if (!timechk[i]) {
                set(i, "공강"); // NULL --> "공강"
            }
        }

        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 5; j++) {
                if(tempTable[i][j].includes("과제연구")){
                    tempTable[i][j] = "과제연구";
                }
            }
        }
        
        for(var i=0; i<n; i++){

            nextLoop:
            for(var j=0; j<7; j++){
                for(var k=0; k<5; k++){
                    if(allTable[i][j][k] != tempTable[j][k]){
                        break nextLoop;
                    }
                }

                if(j == 6){
                    return 0;   // Do not save
                }
            }
        }
        
        allTable[n] = Array.from(Array(7), () => Array());
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 5; j++) {
                allTable[n][i][j] = tempTable[i][j];
            }
        }
        n++;

        return 0;
    }
    
    for (var i = idx; i < 13; i++) { // Block
        for (var j = 0; j < sorted[i].length; j++) { // Subjects
            for (var k = 0; k < 10; k++) { // My Subject
                if (sorted[i][j]==(sub[k]) && !subchk[k] && !timechk[i]) {

                    /** Check Subject & Block **/
                    subchk[k] = true;
                    timechk[i] = true;
                    if (i == 4) {
                        timechk[9] = timechk[11] = true;
                    } else if (i == 6) {
                        timechk[10] = timechk[12] = true;
                    } else if (i == 9 || i == 11) {
                        timechk[4] = true;
                    } else if (i == 10 || i == 12) {
                        timechk[6] = true;
                    }

                    set(i, sub[k]); // PUSH
                    search(idx + 1); // DFS(index + 1);

                    /** Undo Check **/
                    subchk[k] = false;
                    timechk[i] = false;
                    if (i == 4) {
                        timechk[9] = timechk[11] = false;
                    } else if (i == 6) {
                        timechk[10] = timechk[12] = false;
                     } else if (i == 9 || i == 11) {
                        timechk[4] = false;
                    } else if (i == 10 || i == 12) {
                        timechk[6] = false;
                    }

                    set(i, null); // POP
                    break;
                }
            }
        }
    }

    return n;
}

function set(time, subName) {

    switch (time) {

    /** 4A ~ 4H **/
    case 0:
        tempTable[2][0] = subName;
        tempTable[3][0] = subName;
        tempTable[0][3] = subName;
        tempTable[1][3] = subName;
        break;
    case 1:
        tempTable[4][0] = subName;
        tempTable[5][0] = subName;
        tempTable[2][2] = subName;
        tempTable[3][2] = subName;
        break;
    case 2:
        tempTable[6][0] = subName;
        tempTable[6][1] = subName;
        tempTable[2][3] = subName;
        tempTable[3][3] = subName;
        break;
    case 3:
        tempTable[0][1] = subName;
        tempTable[1][1] = subName;
        tempTable[2][4] = subName;
        tempTable[3][4] = subName;
        break;
    case 4:
        tempTable[2][1] = subName;
        tempTable[3][1] = subName;
        tempTable[4][3] = subName;
        tempTable[5][3] = subName;
        break;
    case 5:
        tempTable[4][1] = subName;
        tempTable[5][1] = subName;
        tempTable[6][3] = subName;
        tempTable[6][4] = subName;
        break;
    case 6:
        tempTable[0][2] = subName;
        tempTable[1][2] = subName;
        tempTable[4][4] = subName;
        tempTable[5][4] = subName;
        break;
    case 7:
        tempTable[4][2] = subName;
        tempTable[5][2] = subName;
        tempTable[0][4] = subName;
        tempTable[1][4] = subName;
        break;

    /** 2A ~ 2E **/
    case 8:
        tempTable[0][0] = subName;
        tempTable[1][0] = subName;
        break;
    case 9:
        tempTable[2][1] = subName;
        tempTable[3][1] = subName;
        break;
    case 10:
        tempTable[0][2] = subName;
        tempTable[1][2] = subName;
        break;
    case 11:
        tempTable[4][3] = subName;
        tempTable[5][3] = subName;
        break;
    case 12:
        tempTable[4][4] = subName;
        tempTable[5][4] = subName;
        break;
    }
}

function displayTable(idx) {
    var day = ["mon", "tue", "wed", "thu", "fri"];
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 5; j++) {
            setSub(day[j]+String(i+1), allTable[idx][i][j]);
        }
    }
}
