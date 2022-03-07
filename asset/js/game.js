Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
function gaming() {
    var audio;
    function loadGame({music, bg = 'none', songName='?', author='unknown', tDfcy='EZ', dfcy='?'}) {
        audio = new Audio(music);
        if (bg != 'none') $('#bg').attr('src', bg);
    }
    
    // init UI
    $('body>*').hide();
    $('#ui, #info, #bg').show();
    // initCanvas
    var cvs = document.getElementById('canvas');
    var lS = window.localStorage;
    var settings = JSON.parse(lS.settings);
    if (settings.proportion == '16:9' || settings.proportion == undefined) {
        cvs.width = 4000;
        cvs.height = 2250;
        cvs.style.maxWidth = $('body').height() / 9 * 16;
    } else {
        cvs.width = 3000;
        cvs.height = 2250;
        cvs.style.maxWidth = $('body').height() / 9 * 16;
    }
    cvs = cvs.getContext('2d');
    cvs.transform(1, 0, 0, 1, $('#canvas').attr('width') / 2, 1125);
    cvs.save();
    // init vars
    let time = -300, startTime = 0, lineColor = '#ffffff', runTime = setInterval(() => {time += 1}, 10),
    imgs = {
        tap: new Image(),
        drag: new Image()
    }
    spectral = {
        lines: [],
        lineMoves: [
            {line: 0, x: 0, y: 0, deg: 0, width: 0, alpha: 1, endX: 0, endY: 0, endDeg: 0, endWidth: 10000, endAlpha: 1, startT: -200, endT: -100},
            {line: 1, alpha: 0, endAlpha: 1, startT: 0, endT: 200},
            {line: 1, alpha: 0, endAlpha: 0, startT: -500, endT: 0},
            {line: 2, alpha: 0, endAlpha: 0, startT: -500, endT: 0},
            // {line: 0, width: 10000, alpha: 1, endAlpha: 0, startT: -100, endT: 0},
            /*{line: 1, x: 0, y: 0, deg: -90, width: 10000, endX: 200, endY: 200, endDeg: 0, endWidth: 10000, startT: 0, endT: 300},
            {line: 2, x: 0, y: 0, deg: -45, width: 10000, endX: 200, endY: 200, endDeg: 45, endWidth: 10000, startT: 0, endT: 300},
            {line: 0, x: 0, y: 0, deg: 0, width: 10000, alpha: 1, endX: 200, endY: 200, endDeg: 90, endWidth: 10000, startT: 0, endT: 300},
            {line: 3, x: 0, y: 0, deg: 45, width: 10000, endX: 200, endY: 200, endDeg: 135, endWidth: 10000, startT: 0, endT: 300},
            {line: 4, x: 0, y: 0, deg: -90, width: 10000, endX: -200, endY: -200, endDeg: 0, endWidth: 10000, startT: 0, endT: 300},
            {line: 5, x: 0, y: 0, deg: -45, width: 10000, endX: -200, endY: -200, endDeg: 45, endWidth: 10000, startT: 0, endT: 300},
            {line: 6, x: 0, y: 0, deg: 0, width: 10000, endX: -200, endY: -200, endDeg: 90, endWidth: 10000, startT: 0, endT: 300},
            {line: 7, x: 0, y: 0, deg: 45, width: 10000, endX: -200, endY: -200, endDeg: 135, endWidth: 10000, startT: 0, endT: 300},
            {line: 0, endAlpha: 0, startT: 300, endT: 400},
            {line: 1, endAlpha: 0, startT: 300, endT: 400},
            {line: 2, endAlpha: 0, startT: 300, endT: 400},
            {line: 3, endAlpha: 0, startT: 300, endT: 400},
            {line: 4, endAlpha: 0, startT: 300, endT: 400},
            {line: 5, endAlpha: 0, startT: 300, endT: 400},
            {line: 6, endAlpha: 0, startT: 300, endT: 400},
            {line: 7, endAlpha: 0, startT: 300, endT: 400},*/
            {line: 0, endY: 300, endAlpha: 1, startT: 0, endT: 100},
            {line: 0, endDeg: 15, endY: 300, startT: 200, endT: 1000},
            {line: 1, endDeg: -165, endY: 300, startT: 200, endT: 1000},
            {line: 2, deg: 15, endDeg: 375, x: 220, y: 360, endX: 220, endY: 360, startT: 870, endT: 1100},
            {line: 0, x: 0, y: 0, deg: 0, width: 10000, endX: 0, endY: 0, endDeg: 0, endWidth: 0, startT: 1200, endT: 1300}
        ],
        notes: [],
        noteMoves: [
            {line: 0, note: 0, x: 0, y: 1000, endX: 0, endY: 'down', startT: 200, endT: 400},
            {line: 1, note: 1, x: 250, y: 1000, endX: 50, endY: 'down', startT: 250, endT: 450},
            {line: 0, note: 3, x: 600, y: 1000, endX: 200, endY: 500, startT: 450, endT: 600},
            {line: 1, note: 2, x: 400, y: 1000, endX: 400, endY: 'down', startT: 600, endT: 800},
            {line: 0, note: 3, x: 200, y: 500, endX: 200, endY: 'down', startT: 800, endT: 900},
            {line: 0, note: 4, x: 900, y: 2400, endX: 200, endY: 'down', type: 'drag', startT: 800, endT: 900}
        ],
    }
    imgs.tap.src = '../asset/img/ui/tap.svg';
    imgs.drag.src = '../asset/img/ui/drag.svg';
    console.log(imgs.tap);
    loadGame({music: '../asset/audio/music/test.wav'});
    audio.oncanplaythrough = () => {
        console.log('loaded');
        function distance(x, y, endX, endY){
            return Math.sqrt(Math.abs(x - endX) ** 2 + Math.abs(y - endY) ** 2);
        }
        function addLine(context, x, y, deg, width, alpha, notes) {
            spectral.lines.push(new line(context, x, y, deg, width, alpha));
        }
        function removeLine(arrayNum) {
            spectral.lines.remove(arrayNum);
        }
        function addNote(line, context, x, y, type, trueNote) {
            spectral.notes.push(new note(line, context, x, y, type, trueNote));
        }
        class line {
            constructor(context = cvs, x = 0, y = 0, deg = 0, width = 10000, alpha = 1) {
                this.context = context;
                this.x = x;
                this.y = y;
                this.deg = deg;
                this.width = width;
                this.alpha = alpha;
            }
            draw(){
                this.context.fillStyle = lineColor;
                this.context.strokeColor = lineColor;
                this.context.setTransform(1, 0, 0, 1, $('#canvas').attr('width') / 2 + this.x, 1125 + this.y);
                this.context.rotate(this.deg * Math.PI / 180);
                this.context.globalAlpha = this.alpha;
                this.context.fillRect(0 - this.width / 2, -4, this.width, 8);
                this.context.restore();
            }
            move({x = this.x, y = this.y, deg = this.deg, width = this.width, alpha = this.alpha, endX = 0, endY = 0, endDeg = 0, endWidth = 10000, endAlpha = 1, startT, endT} = {}) {
                // console.log(x, y, deg, width, endX, endY, endDeg, endWidth, startT, endT);
                if (time >= startT && time <= endT) {
                    let vx = (endX - x) / (endT - startT);
                    let vy = (endY - y) / (endT - startT);
                    let vdeg = (endDeg - deg) / (endT - startT);
                    let vwidth = (endWidth - width) / (endT - startT);
                    let valpha = (endAlpha - alpha) / (endT - startT);
                    this.x = x + (time - startT) * vx;
                    this.y = y + (time - startT) * vy;
                    this.deg = deg + (time - startT) * vdeg;
                    this.width = width + (time - startT) * vwidth;
                    this.alpha = alpha + (time - startT) * valpha;
                }
                if (time > endT) {
                    this.x = endX;
                    this.y = endY;
                    this.deg = endDeg;
                    this.width = endWidth;
                    this.alpha = endAlpha;
                    return true;
                }
                return false;
            }
            refresh(context) {
            }
        }
        class note {
            constructor(line = 0, context = cvs, x = 0, y = 5000, type = 'tap', trueNote = false) {
                this.line = line;
                this.context = context;
                this.x = x;
                this.y = y;
                this.type = type;
                this.over = false;
            }
            draw() {
                let noteImg;
                if (!this.over) {
                    if (spectral.lines[this.line] === undefined) {
                        addLine();
                    }
                    switch(this.type) {
                        case 'tap':
                            noteImg = imgs.tap;
                            break;
                        case 'drag':
                            noteImg = imgs.drag;
                            break;
                    }
                    this.context.strokeColor = lineColor;
                    this.context.setTransform(1, 0, 0, 1, $('#canvas').attr('width') / 2 + spectral.lines[this.line].x, 1125 + spectral.lines[this.line].y);
                    this.context.rotate(spectral.lines[this.line].deg * Math.PI / 180);
                    this.context.globalAlpha = 1;
                    this.context.drawImage(noteImg, this.x - 150, 0 - (this.y - 15), 300, 30);
                    this.context.restore();
                }
            }
            move({line, x = this.x, y = this.y, endX = 0, endY = 0, startT, endT} = {}) {
                // console.log(x, y, deg, width, endX, endY, endDeg, endWidth, startT, endT);
                let deleteNote = false;
                if (endY == 'down') {
                    endY = 0;
                    deleteNote = true;
                }
                if (line !== undefined) {
                    this.line = line;
                }
                if (time >= startT && time <= endT) {
                    let vx = (endX - x) / (endT - startT);
                    let vy = (endY - y) / (endT - startT);
                    this.x = x + (time - startT) * vx;
                    this.y = y - 2 + (time - startT) * vy;
                }
                if (time > endT) {
                    this.x = endX;
                    this.y = endY;
                    if (deleteNote) {
                        this.over = true;
                    }
                    return true;
                }
                return false;
            }
        }
        class gameBoard {
            constructor() {
                this.startTime;
                this.init();
                this.process();
            }
            init() {
                addLine(cvs, 3000, 3000, 0, 1);
                addNote(0, cvs, 0, 1000, 'tap', true);
            }
            removeAllLine() {
                for (let i = 1; i < spectral.lines.length; i++) {
                    removeLine(i);
                }
            }
            // 动画循环（帧率）
            process(now){
                //init time
                if(!startTime){
                    startTime = now;
                }
                let seconds = (now - startTime) / 1000;
                startTime = now;
                cvs.clearRect(-10000, -10000, 20000, 20000);for (let i = 0; i < spectral.lineMoves.length; i++) {
                    while (!spectral.lines[spectral.lineMoves[i].line]) {
                        addLine();
                    }
                    if (spectral.lines[spectral.lineMoves[i].line].move({x: spectral.lineMoves[i].x, y: spectral.lineMoves[i].y, deg: spectral.lineMoves[i].deg, width: spectral.lineMoves[i].width, alpha: spectral.lineMoves[i].alpha, endX: spectral.lineMoves[i].endX, endY: spectral.lineMoves[i].endY, endDeg: spectral.lineMoves[i].endDeg, endWidth: spectral.lineMoves[i].endWidth, endAlpha: spectral.lineMoves[i].endAlpha, startT: spectral.lineMoves[i].startT, endT: spectral.lineMoves[i].endT})) {
                        spectral.lineMoves.remove(i)
                    }
                }
                for (let i = 0; i < spectral.noteMoves.length; i++) {
                    while (!spectral.notes[spectral.noteMoves[i].note]) {
                        addNote(spectral.noteMoves[i].line, undefined, undefined, undefined, spectral.noteMoves[i].type);
                    }
                    if (spectral.notes[spectral.noteMoves[i].note].move({line: spectral.noteMoves[i].line, x: spectral.noteMoves[i].x, y: spectral.noteMoves[i].y, endX: spectral.noteMoves[i].endX, endY: spectral.noteMoves[i].endY, startT: spectral.noteMoves[i].startT, endT: spectral.noteMoves[i].endT})) {
                        spectral.noteMoves.remove(i);
                    }
                }
                for(var i = 0; i < spectral.lines.length; i++) {
                    spectral.lines[i].draw(cvs);
                }
                for(var i = 0; i < spectral.notes.length; i++) {
                    spectral.notes[i].draw(cvs);
                }
                
                // console.log('canvas refresh', now, startTime, seconds);
                // 动画循环（帧率）
                var gameLoop = window.requestAnimationFrame(this.process.bind(this));
                if (time >= 1400) {
                    window.cancelAnimationFrame(gameLoop)
                }
                if (time >= 1200) {
                    this.removeAllLine();
                }
            }
        }

        var gameMain = new gameBoard();
    };
}
$(() => {
    gaming();
});