function changePage(pageName){
    $('body').attr('page', pageName);
    $('#pageCss').attr('href', `asset/css/${pageName}.css`);
    $('#ui *').remove();
}

function changeBg (img) {
    $('#bg').attr('src', `asset/img/bg/${img}`);
}

function loadAudio(src) {
    console.log('run loadAudio    ' + src);
    // 将音频加入数组并加载
    for (let i = 0; i < audios.length; i++) {
        if (audios[i].currentSrc.includes(src)) {
            return;
        }
    }
    let id = audios.length;
    audios[id] = new Audio(src);
    audios.load;
    return audios[id];
}

function setAudio(type, audioId = 0){
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
    $('#ui').fadeIn(1000);
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
                $('#ui,#bg').fadeOut(1000, () => {
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

function toChapter(chapter) {
    changePage("chapter");
    $('#blur').fadeOut(1000);
    changeBg('img0.webp');
    $('#ui').append(`<span id="settings" class="button"></span><span id="back" class="button"></span><div id="selects">
    <div class="song">
        <span class="title">test</span>
        <span class="dfcy">?</span>
    </div>
    <div class="song">
        <span class="title">test</span>
        <span class="dfcy">?</span>
    </div>
    <div class="song">
        <span class="title">test</span>
        <span class="dfcy">?</span>
    </div>
    </div><div id="song"><img id="song-img"/><div id="song-dfcy" dfcy="ez"><span id="song-dfcy-ez">?</span><span id="song-dfcy-hd">?</span><span id="song-dfcy-in">?</span><span id="song-dfcy-at">?</span><div id="song-dfcy-focus"></div></div></div>`);
    $('#ui').fadeIn(1000);
    $('#bg').fadeTo(1000, 1, () => {
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
let audios = new Array;
$(() => {
    $('body *').hide();
    $('#bg').attr('src', `asset/img/bg/img${Math.round(Math.random() * 14)}.webp`);
    $('#start').show().unbind('click').click(() => {
        $('#start').remove();
        setTimeout(() => {
            $('#ui,#title').fadeIn(1000);
            $('#description').fadeIn(2000);
            // loading audios
            loadAudio('asset/audio/bgm/TouchToStart.wav').oncanplaythrough = () => {
            loadAudio('asset/audio/bgm/ChapterSelect.wav').oncanplaythrough = () => {
            loadAudio('asset/audio/ui/Tap3.wav').oncanplaythrough = () => {
            loadAudio('asset/audio/ui/Tap1.wav').oncanplaythrough = () => {
                setAudio(3, 'TouchToStart.wav');
                setAudio(1, 'TouchToStart.wav');
                $('#bg').fadeTo(4000, 0.5);
                $('#description').animate({width: '0%'}, 1000, () => {
                    $('#description').text('touch to start');
                });
                setTimeout(() => {
                    $('#description').animate({width: '100%'}, 1000, () => {
                        // 页面被点击进入主页面（章节选择）
                        $('body').unbind('click').click(() => {
                            $('body').unbind('click');
                            $('*').finish();
                            setAudio(0, 'TouchToStart.wav');
                            removeAudio('TouchToStart.wav');
                            $('#ui,#bg').fadeOut(1000, () => {
                                toHome();
                            });
                        });
                    });
                }, 2500);
            };};};};
        }, 1000);
    });
});