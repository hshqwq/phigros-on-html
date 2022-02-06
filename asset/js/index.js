// ui and page
function changePage(pageName){
    $('body').attr('page', pageName);
    $('#pageCss').attr('href', `asset/css/${pageName}.css`);
    $('#ui').empty();
}

// 切换背景
function changeBg (img) {
    $('#bg').attr('src', `asset/img/bg/${img}`);
}

// audio
function loadAudio(src) { // 加载音频
    // 将音频加入数组并加载
    for (let i = 0; i < audios.length; i++) {
        if (audios[i].currentSrc.includes(src)) {
            return;
        }
    }
    console.log('run loadAudio    ' + src);
    let id = audios.length;
    audios[id] = new Audio(src);
    audios.load;
    return audios[id];
}

function setAudio(type, audioId = 0){ // 操作音频（播放、暂停等）
    console.log('run setAudio    ' + type);
    let audio;
    // 处理audioId参数（查找对应id/src的音频）
    if (typeof audioId == 'string'){
        for (let i = 0; i < audios.length; i++) {
            if (audios[i].currentSrc.includes(audioId)) {
                audio = audios[i];
                break;
            }
        }
    } else if (typeof audioId == 'number') {
        audio = audios[audioId];
    } else {
        //audioId 参数错误处理
        console.error('audioId error');
        return 'error';
    }
    switch(type){
        case 0: //暂停音乐
            audio.currentTime = 0;
            audio.play();
            audio.pause();
            break;
        case 1: //播放音乐
            audio.play();
            break;
        case 2: //暂停/继续播放音乐
            audio.pause();
            break;
        case 3: //设置循环播放
            audio.loop = true;
            break;
        case 4: //取消循环播放
            audio.loop = false;
            break;
    }
}

// 删除数组中第几项或第几到第几项，并重排数组
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

function removeAudio(audioId) { // 删除指定音频
    console.log('run removeAudio');
    let audio;
    // 处理audioId参数（查找对应id/src的音频）
    if (typeof audioId == 'string'){
        for (let i = 0; i < audios.length; i++) {
            if (audios[i].currentSrc.includes(audioId)) {
                audio = i;
                break;
            }
        }
    } else if (typeof audioId == 'number') {
        audio = audioId;
    } else {
        //audioId 参数错误处理
        console.error('audioId error');
        return 'error';
    }
    audios.remove(audio);
}

//effect
function addEffect(type, many) { //添加一定数量的特效
    let el, time/*特效开始时间*/ = new Date().getTime();
    // 检测特效类型
    switch (type) {
        case 'rBmT': 
            el = `<span class="ef-rBmT" start="${time}"></span>`;
            break;
    }
    // 添加特效
    for (let i = 0; i < many; i++) {
        $('#effects').append(el);
    }
    // 执行特定类型特效的函数
    switch (type) {
        case 'rBmT': 
            $(`.ef-${type}[start=${time}]`).each((index, element) => {
                let els = element.style,elsb = Math.random() * 65 - 5;
                els.left = `${Math.random() * 100}vw`;
                els.bottom = `${elsb}%`;
                setTimeout(() => {
                    element.remove();
                }, 12500);
            });
            break;
    }
}

//chapter
function addSong(name, dfcy){ //在曲目列表中添加曲目
    $('#songs>div').append(`<div class="song"><span class="title">${name}</span><span class="dfcy">${dfcy}</span></div>`);
}

//page main f
function toHome(chapter) {
    // 更换页面及背景
    changePage("home");
    changeBg('homeBg.png');
    // 添加界面元素
    $('#ui').append(`<span id="settings" class="button"></span>
<div id="selects" class="scroll">
    <span class="select" title="Single">
        <h2 class="select-title">Single</h2>
        <h2 class="select-cntitle">单曲 精选集</h2>
        <div class="select-play"></div>
        <div class="select-info">
            <span class="select-all">?</span>
            <span class="select-clear">?</span>
            <span class="select-fc">?</span>
            <span class="select-phi">?</span>
        </div>
        <div class="select-blur"></div>
        <div class="select-bg"></div>
    </span>
    <span class="select" title="Test">
        <h2 class="select-title">Test</h2>
        <h2 class="select-cntitle">测试</h2>
        <div class="select-play"></div>
        <div class="select-info">
            <span class="select-all">?</span>
            <span class="select-clear">?</span>
            <span class="select-fc">?</span>
            <span class="select-phi">?</span>
        </div>
        <div class="select-blur"></div>
        <div class="select-bg"></div>
    </span>
    <span class="select" title="Test">
        <h2 class="select-title">Test</h2>
        <h2 class="select-cntitle">测试</h2>
        <div class="select-play"></div>
        <div class="select-info">
            <span class="select-all">?</span>
            <span class="select-clear">?</span>
            <span class="select-fc">?</span>
            <span class="select-phi">?</span>
        </div>
        <div class="select-blur"></div>
        <div class="select-bg"></div>
    </span>
    </div>`);
    // 设置音频
    setAudio(3, 'ChapterSelect.wav');
    setAudio(1, 'ChapterSelect.wav');
    // 显示界面
    $('#ui,#effects').fadeIn(1000);
    $('#bg').fadeTo(1000, 1, () => {
        // 当章节选择的空白处被点击移除所有章节的被选中class
        $('#selects').unbind('click').click((event) =>{
            if (event.target.id == 'selects') {
                $('.select').attr('class', 'select');
                $('.select-blur').finish().fadeIn(600);
            }
        });
        // 章节被点击
        $('.select').unbind('click').click((event) => {
            let el = event.currentTarget;
            // play按钮被点击则进入歌曲选择界面
            if (event.target.className == 'select-play' && el.className == 'select focus') {
                setAudio(0, 'Tap1.wav');
                setAudio(1, 'Tap1.wav');
                setAudio(0, 'ChapterSelect.wav');
                $('*').finish();
                $('#ui,#effects,#bg').fadeOut(1000, () => {
                    toChapter(el.title);
                });
            // 给予章节被选中class，并处理模糊动画
            } else if (el.className != 'select focus') {
                $('.select').attr('class', 'select');
                el.className = 'select focus';
                setAudio(0, 'Tap3.wav');
                setAudio(1, 'Tap3.wav');
                $('.select .select-blur').finish().fadeIn(600);
                $('.select.focus .select-blur').finish().fadeOut(600);
            }
        });
    });
}

// 跳转至章节（曲目选择界面）
function toChapter(chapter) {
    // 切换界面
    changePage("chapter");
    $('#blur').fadeOut(1000);
    changeBg('img0.webp');
    // 添加UI
    $('#ui').append(`<span id="settings" class="button"></span><span id="back" class="button"></span><div id="selects"><div id="songs"><div></div></div></div><div id="song"><img id="song-img"/><div id="song-dfcy" dfcy="ez"><span id="song-dfcy-ez">?</span><span id="song-dfcy-hd">?</span><span id="song-dfcy-in">?</span><span id="song-dfcy-at">?</span><div id="song-dfcy-focus"></div></div></div>`);
    // 添加曲目
    for (let i = 0; i < data[chapter].length; i++) {
        console.log(data[chapter][i]);
        addSong(data[chapter][i].name, data[chapter][i].dfcy.ez);
    }
    // 淡入界面
    $('#ui').fadeIn(1000);
    $('#bg').fadeTo(1000, 1, () => {
        // 曲目选择
        $('.song').unbind('click').click((event) => {
            let el = event.currentTarget;
            $('.song').attr('class', 'song');
            el.className = 'song focus';
        });
        // 难度选择点击事件处理
        $('#song-dfcy-ez').unbind('click').click(() => {
            $('#song-dfcy').attr('dfcy', 'ez');
        });
        $('#song-dfcy-hd').unbind('click').click(() => {
            $('#song-dfcy').attr('dfcy', 'hd');
        });
        $('#song-dfcy-in').unbind('click').click(() => {
            $('#song-dfcy').attr('dfcy', 'in');
        });
        $('#song-dfcy-at').unbind('click').click(() => {
            $('#song-dfcy').attr('dfcy', 'at');
        });
        // 回到主页按键被点击事件处理
        $('#back').unbind('click').click(() => {
            $('#back').unbind('click');
            $('*').finish();
            $('#ui,#bg').fadeOut(1000, () => {
                toHome();
            });
        });
    });
    
}


//init
let audios = new Array,data;
$(() => {
    $('body *').hide();
    changeBg(`img${Math.round(Math.random() * 14)}.webp`);
    $('#start').show().unbind('click').click(() => {
        $('#start').remove();
        setTimeout(() => {
            $('#ui,#effects,#title').fadeIn(1000);
            // rBmT特效定时器
            let efRBmT = setInterval(() => {
                addEffect('rBmT', Math.round(Math.random() + 1))
            }, 1500);
            $('#description').fadeIn(2000);
            // 加载音频
            loadAudio('asset/audio/bgm/TouchToStart.wav').oncanplaythrough = () => {
            loadAudio('asset/audio/bgm/ChapterSelect.wav').oncanplaythrough = () => {
            loadAudio('asset/audio/ui/Tap3.wav').oncanplaythrough = () => {
            loadAudio('asset/audio/ui/Tap1.wav').oncanplaythrough = () => {
                //检查已存储数据
                if(! window.localStorage){
                    // 警告用户当前浏览器（模式）不支持存储
                    info("浏览器不支持存储", 'error');
                }else{
                    data = window.localStorage;
                    if (data['data'] === undefined) { //如果没存储过数据则初始化存储数据
                        data['data'] = `{"Single":[{"name":"test","id":"song0","dfcy":{"ez":2,"hd":6,"in":10,"at":"none","sp":"none"},"mark":0,"ACC":0},{"name":"test1","id":"song1","dfcy":{"ez":4,"hd":9,"in":13,"at":"none","sp":"none"},"mark":0,"ACC":0}],"Chapter1":[{"name":"test","id":"song0","dfcy":{"ez":2,"hd":6,"in":10,"at":"none","sp":"none"},"mark":0,"ACC":0},{"name":"test1","id":"song1","dfcy":{"ez":4,"hd":9,"in":13,"at":"none","sp":"none"},"mark":0,"ACC":0}]}`
                    };
                    // 将数据由json格式转为变量
                    data = JSON.parse(data['data']);
                    console.log(data); //测试用
                }
                setAudio(3, 'TouchToStart.wav');
                setAudio(1, 'TouchToStart.wav');
                // 显示背景
                $('#bg').fadeTo(4000, 0.5);
                // 更改文本内容动画
                $('#description').animate({width: '0%'}, 1000, () => {
                    $('#description').text('touch to start');
                });
                setTimeout(() => {
                    $('#description').animate({width: '100%'}, 1000, () => {
                        // 页面被点击进入主页面（章节选择）
                        $('body').unbind('click').click(() => {
                            // 淡出界面并清除该页面事件
                            $('body').unbind('click');
                            $('*').finish();
                            setAudio(0, 'TouchToStart.wav');
                            removeAudio('TouchToStart.wav');
                            $('#ui,#effects,#bg').fadeOut(1000, () => {
                                // 进入章节选择界面
                                toHome();
                            });
                        });
                    });
                }, 2500);
            };};};};
        }, 1000);
    });
});