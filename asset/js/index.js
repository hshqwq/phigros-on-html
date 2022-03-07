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

// info
function info(text='', type='none') { // 显示提示信息
    let time = new Date().getTime();
    switch (type) {
        case 'none':
            $('#infoList').append(`<li class="infos" start="${time}">${text}</li>`);
            console.log(`%c${text}`, 'font-size: 1rem;background-color: #bbbbbb;color: white;border-left: 4px solid;border-right: 4px solid;border-color: #939393;');
            break;
        case 'info':
            $('#infoList').append(`<li class="infos info-info" start="${time}">${text}</li>`);
            console.log(`%c${text}`, 'font-size: 1rem;background-color: #00bbbb;color: white;border-left: 4px solid;border-right: 4px solid;border-color: #00ffff;');
            break;
        case 'good':
            $('#infoList').append(`<li class="infos info-good" start="${time}">${text}</li>`);
            console.log(`%c${text}`, 'font-size: 1rem;background-color: #00bb00;color: white;border-left: 4px solid;border-right: 4px solid;border-color: #00ff00;');
            break;
        case 'warning':
            $('#infoList').append(`<li class="infos info-warning" start="${time}">${text}</li>`);
            console.warn(`%c警告: ${text}`, 'font-size: 1rem;background-color: #bbbb00;color: white;border-left: 4px solid;border-right: 4px solid;border-color: #ffff00;');
            break;
        case 'error':
            $('#infoList').append(`<li class="infos info-error" start="${time}">${text}</li>`);
            console.error(`%c错误: ${text}`, 'font-size: 1rem;background-color: #bb0000;color: white;border-left: 4px solid;border-right: 4px solid;border-color: #ff0000;');
            break;
    }
    // 信息提示框动画
    $(`.infos[start="${time}"]`).hide();
    $(`.infos[start="${time}"]`).fadeIn(1000);
    setTimeout(() => {
        $(`.infos[start="${time}"]`).fadeOut(1000, () => {
            $(`.infos[start="${time}"]`).remove();
        });
    }, 3000);
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
    audios[id].load;
    audios[id].onerror = () => {
        info(`音频加载错误/失败`, 'error');
    }
    audios[id].onstalled = () => {
        info(`音频加载错误/失败`, 'error');
    }
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

// base64中文乱码解决
function utf16to8(str) {
    var out, i, len, c;
  
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
      } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
      } else {
        out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
      }
    }
    return out;
}

function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;
  
    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
      c = str.charCodeAt(i++);
      switch(c >> 4) {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
          // 0xxxxxxx
      out += str.charAt(i-1);
      break;
    case 12: case 13:
      // 110x xxxx   10xx xxxx
      char2 = str.charCodeAt(i++);
      out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
      break;
    case 14:
      // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = str.charCodeAt(i++);
          char3 = str.charCodeAt(i++);
          out += String.fromCharCode(((c & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0));
          break;
      }
    }
    return out;
}

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
                let elS = element.style,elSb = Math.random() * 65 - 5, r = Math.round(Math.random() * 10 + 12);
                elS.width = elS.height = `${r}px`;
                elS.left = `${Math.random() * 100}vw`;
                elS.bottom = `${elSb}%`;
                setTimeout(() => {
                    element.remove();
                }, 12500);
            });
            break;
    }
}

//page main f
function toHome(chapter) {
    //chapters
    function addChapter(name='unknow', cnName='unknow', description='', bgUrl='asset/img/bg/img0.webp', all='?', clear='?', fC='?', phi='?'){ //在曲目列表中添加曲目
        $('#selects').append(`
        <span class="select" title="${name}">
        <h2 class="select-title">${name}</h2>
        <h2 class="select-cntitle">${cnName}</h2>
        <p class="select-description">${description}</p>
        <div class="select-play"></div>
        <div class="select-info">
            <span class="select-all">${all}</span>
            <span class="select-clear">${clear}</span>
            <span class="select-fc">${fC}</span>
            <span class="select-phi">${phi}</span>
        </div>
        <div class="select-blur"></div>
        <div class="select-bg" style="background-image: url(${bgUrl})"></div>
    </span>
        `);
    }
    // 更换页面及背景
    changePage("home");
    changeBg('homeBg.png');
    // 添加界面元素
    $('#ui').append(`<span id="settings" class="button"></span><div id="selects" class="scroll"></div>`);
    for (let i = 0; i < data['chapters'].length; i++) {
        addChapter(data['chapters'][i].info.name, data['chapters'][i].info.cnName, data['chapters'][i].info.description, data['chapters'][i].info.bgUrl, data['chapters'][i].songs.length, data['chapters'][i].info.clear, data['chapters'][i].info['FC.'], data['chapters'][i].info.Phi);
    }
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
                $('*').unbind();
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
        $('#settings').unbind('click').click(() => {
            setAudio(0, 'Tap1.wav');
            setAudio(1, 'Tap1.wav');
            setAudio(0, 'ChapterSelect.wav');
            $('*').unbind();
            $('*').finish();
            $('#ui,#effects,#bg').fadeOut(1000, () => {
                toSettings();
            });
        });
    });
}

// 跳转至章节（曲目选择界面）
function toChapter(chapter) {
    // songs
    function addSong(name='unknow', dfcy=''){ //在曲目列表中添加曲目
        $('#songs>div').append(`<div class="song"><span class="title">${name}</span><span class="dfcy">${dfcy}</span></div>`);
    }
    // search data
    function searchDataChapter(chapter) {
        for (let i = 0; i < data.chapters.length; i++) {
            if (data.chapters[i].info.name == chapter) {
                console.log(data.chapters[i]);
                return data.chapters[i];
            }
        }
    }
    function changeDfcy(dfcy) {
        if (dfDfcy != dfcy) {
            dfDfcy = dfcy;
            chapterData = searchDataChapter(chapter);
            $('.song .dfcy').empty();
            for (let i = 0; i < chapterData.songs.length; i++) {
                console.log($('.song').eq(i).children('.song-dfcy'));
                $('.song').eq(i).children('.dfcy').text(chapterData.songs[i].dfcy[dfDfcy].dfcy);
            }
        }
    }
    // 切换界面
    changePage("chapter");
    $('#blur').fadeOut(1000);
    changeBg('img0.webp');
    // 添加UI
    $('#ui').append(`<span id="settings" class="button"></span><span id="back" class="button"></span><div id="selects"><div id="songs"><div></div></div></div><div id="song"><img id="song-img"/>
    <div id="song-info">
    <div id="song-dfcy" dfcy="ez"><span id="song-dfcy-ez">?</span><span id="song-dfcy-hd">?</span><span id="song-dfcy-in">?</span><span id="song-dfcy-at">?</span><div id="song-dfcy-focus"></div></div>
    <div id="song-mark">0000000</div><div id="song-acc">00.00</div></div>
    </div></div>`);
    // 添加曲目
    let chapterData = searchDataChapter(chapter);
    for (let i = 0; i < chapterData.songs.length; i++) {
        if (chapterData.songs[i].dfcy[dfDfcy] === undefined) {
            addSong(chapterData.songs[i].name);
        } else {
            addSong(chapterData.songs[i].name, chapterData.songs[i].dfcy[dfDfcy].dfcy);
        }
    }
    $('.song:first').addClass('focus');
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
            changeDfcy('ez');
        });
        $('#song-dfcy-hd').unbind('click').click(() => {
            $('#song-dfcy').attr('dfcy', 'hd');
            changeDfcy('hd');
        });
        $('#song-dfcy-in').unbind('click').click(() => {
            $('#song-dfcy').attr('dfcy', 'in');
            changeDfcy('in');
        });
        $('#song-dfcy-at').unbind('click').click(() => {
            $('#song-dfcy').attr('dfcy', 'at');
            changeDfcy('at');
        });
        // 回到主页按键被点击事件处理
        $('#back').unbind('click').click(() => {
            $('*').unbind();
            $('*').finish();
            $('#ui,#bg').fadeOut(1000, () => {
                toHome();
            });
        });
        $('#settings').unbind('click').click(() => {
            setAudio(0, 'Tap1.wav');
            setAudio(1, 'Tap1.wav');
            setAudio(0, 'ChapterSelect.wav');
            $('*').unbind();
            $('*').finish();
            $('#ui,#effects,#bg').fadeOut(1000, () => {
                toSettings();
            });
        });
    });
    
}

// 跳转至设置页面
function toSettings() {
    changePage("settings");
    $('#ui').append(`<span id="back" class="button"></span><div id="selects"><div id="sets"><div>
    <div id="pmyc" class="set set-range">
        <div class="set-title">
            <h4>谱面延迟</h4><p id="pmyc-yc"></p>
        </div>
        <span class="set-range-lessen"></span><input type="range" min="-400" max="600" value="0" step="5"></input><span class="set-range-add"></span> 
    </div>
    <div id="bottonSize" class="set set-range">
        <h4 class="set-title">按键缩放</h4>
        <span class="set-range-lessen"></span><input type="range" min="100" max="200" value="100" step="5"></input><span class="set-range-add"></span> 
    </div>
    <div id="OFBlur" class="set set-check">
        <h4 class="set-title">开启实时模糊(对性能要求较高)</h4>
        <input type="checkbox">
    </div>
    <div id="bgBlur" class="set set-range">
        <h4 class="set-title">背景模糊</h4>
        <span class="set-range-lessen"></span><input type="range" min="0" max="20"  value="15" step="1"></input><span class="set-range-add"></span> 
    </div>
    <div id="OFAudio" class="set set-check">
        <h4 class="set-title">开启打击音效</h4>
        <input type="checkbox">
    </div>
    <div id="gameAudio" class="set set-range">
        <h4 class="set-title">音乐音量</h4>
        <span class="set-range-lessen"></span><input type="range" min="0" max="100" value="100" step="1"></input><span class="set-range-add"></span> 
    </div>
    <div id="uiAudio" class="set set-range">
        <h4 class="set-title">界面音效音量</h4>
        <span class="set-range-lessen"></span><input type="range" min="0" max="100" value="100" step="1"></input><span class="set-range-add"></span> 
    </div>
    <div id="touchAudio" class="set set-range">
        <h4 class="set-title">打击音效音量</h4>
        <span class="set-range-lessen"></span><input type="range" min="0" max="100" value="100" step="1"></input><span class="set-range-add"></span> 
    </div>
    <div id="OFDyfz" class="set set-check">
        <h4 class="set-title">开启多押辅助</h4>
        <input type="checkbox">
    </div>
    <div id="OFFcApzsq" class="set set-check">
        <h4 class="set-title">开启FC/AP指示器</h4>
        <input type="checkbox">
    </div>
    <div id="OFEffect" class="set set-check">
        <h4 class="set-title">开启特效(对性能要求较高)</h4>
        <input type="checkbox">
    </div>
    <div id="OFAutoPlay" class="set set-check">
        <h4 class="set-title">开启AutoPlay</h4>
        <input type="checkbox">
    </div>
    <div id="uploadData" class="set set-upload">
    <h4 class="set-title">上传曲目数据</h4>
        <input type="file" accept=".json" alt="浏览器不支持"></input>
    </div>
    <div id="uploadSettings" class="set set-upload">
        <h4 class="set-title">上传设置数据</h4>
        <input type="file" accept=".json" alt="浏览器不支持"></input>
    </div>
    <div id="initData" class="set set-button">
        <button type="booton">初始化曲目数据</button>
    </div>
    <div id="initSettings" class="set set-button">
        <button type="booton">初始化设置数据</button>
    </div>
    </div></div></div>`);
    $('.set-range input').each((index, element) => {
        element.value = settings[element.parentNode.id];
        element.onchange = () => {
            settings[element.parentNode.id] = Number(element.value);
            lS.settings = JSON.stringify(settings);
        };
        element.parentNode.children[1].onclick = () => {
            element.value = Number(element.value) - Number(element.step);
            settings[element.parentNode.id] = Number(element.value);
            lS.settings = JSON.stringify(settings);
        };
        element.parentNode.children[3].onclick = () => {
            element.value = Number(element.value) + Number(element.step);
            settings[element.parentNode.id] = Number(element.value);
            lS.settings = JSON.stringify(settings);
        };
    });
    $('.set-check input').each((index, element) => {
        element.checked = settings[element.parentNode.id];
        element.onchange = () => {
            if (element.parentNode.id == 'OFAutoPlay' && element.checked) {
                var key = prompt(utf8to16(atob('5byA5ZCv5q2k5Yqf6IO96ZyA6KaB5a+G6ZKl')) + '\n' + utf8to16(atob('5a+G6ZKlOg==')));
                if (key != null && key.length == 15) {
                    key = btoa(key);
                    if (key.length == 20) {
                        key = key.slice(4, 8) + key.slice(16, 20) + key.slice(0, 4) + key.slice(8, 16);
                        key = key.slice(0, 12) + key.slice(14, 16) + key.slice(12, 14) + key.slice(16, 20);
                        if (atob(key) === 'IU'+ atob('c2w=') + 'ay' + atob(atob('UXc9PQ==')) + 'anVTtoP') {
                            settings[element.parentNode.id] = element.checked;
                            lS.settings = JSON.stringify(settings);
                        } else {
                            info(utf8to16(atob('5a+G6ZKl6ZSZ6K+v')), 'error');
                        }
                    } else {
                        info(utf8to16(atob('5a+G6ZKl6ZSZ6K+v')), 'error');
                    }
                } else {
                    info(utf8to16(atob('5a+G6ZKl6ZSZ6K+v')), 'error');
                }
            } else {
                settings[element.parentNode.id] = element.checked;
                lS.settings = JSON.stringify(settings);
            }
            element.checked = settings[element.parentNode.id];
        };
    });
    $('.set-upload input').each((index, element) => {
        element.onchange = () => {
            if (!element.value) {
                info('未选择文件', 'error');
                return;
            }
            info('请确保文件数据正确性，以免发生错误', 'warning');
            info('如果出现错误请初始化数据', 'warning');
            let file = element.files[0];
            var reader = new FileReader();
            reader.onload = (e) => {
                fileData = e.target.result;
                fileData = fileData.slice(fileData.indexOf('base64,') + 7, fileData.length);
                fileData = utf8to16(atob(fileData));
                switch (element.parentNode.id) {
                    case 'uploadData':
                        lS.data = fileData;
                        data = JSON.parse(lS.data);
                        break;
                    case 'uploadSettings':
                        lS.settings = fileData;
                        settings = JSON.parse(lS.data);
                        settings.OFAutoPlay = false;
                        lS.settings = JSON.stringify(settings);
                        break;
                }
                var reload = confirm('上传的数据需要刷新网页才可以生效\n是否立刻刷新');
                if (reload) {
                    window.history.go(0);
                } else {
                    info('未刷新网页，可能出现数据错误', 'warning');
                }
            }
            reader.readAsDataURL(file);
        };
    });
    $('.set-button button').each((index, element) => {
        element.onclick = () => {
            switch (element.parentNode.id) {
                case 'initData':
                    lS['data'] = `{"chapters":[{"info":{"name":"Single","cnName":"单曲 精选集","description":"","bgUrl":"asset/img/bg/Single.png","clear":0,"FC.":0,"Phi":0},"songs":[{"name":"test","id":"song0","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}},{"name":"test1","id":"song1","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}}]},{"info":{"name":"Last Chapter","cnName":"过去的章节","description":"","bgUrl":"asset/img/bg/Last%20Chapter.png","clear":0,"FC.":0,"Phi":0},"songs":[{"name":"Glaciaxion","id":"cls0","author":"SunsetRay","dfcy":{"ez":{"dfcy":1,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":6,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":12,"FC.":false,"mark":0,"ACC":0},"legacy":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}},{"name":"Eradication Catastrophe","id":"cls1","author":"Nces","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}},{"name":"Credits","id":"cls2","author":"Frums","dfcy":{"ez":{"dfcy":4,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":10,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":13,"FC.":false,"mark":0,"ACC":0}}},{"name":"Dlyrotz","id":"cls3","author":"Likey","dfcy":{"ez":{"dfcy":6,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":14,"FC.":false,"mark":0,"ACC":0}}},{"name":"Engine x Start!!(melody mix)","id":"cls4","author":"CrossingSound","dfcy":{"ez":{"dfcy":4,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":10,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":13,"FC.":false,"mark":0,"ACC":0},"legacy":{"dfcy":15,"FC.":false,"mark":0,"ACC":0}}},{"name":"光","id":"cls5","author":"姜米條","dfcy":{"ez":{"dfcy":4,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":8,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":12,"FC.":false,"mark":0,"ACC":0},"legacy":{"dfcy":13,"FC.":false,"mark":0,"ACC":0}}},{"name":"Winter↑cube↓","id":"cls6","author":"Ctymax feat. NceS","dfcy":{"ez":{"dfcy":4,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":8,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":12,"FC.":false,"mark":0,"ACC":0},"legacy":{"dfcy":13,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":"?","FC.":false,"mark":0,"ACC":0}}}]},{"info":{"name":"Chapter4","cnName":"管道迷宫","description":"章节4","bgUrl":"asset/img/bg/Chapter4.png","clear":0,"FC.":0,"Phi":0},"songs":[{"name":"test","id":"song0","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}},{"name":"test1","id":"song1","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}}]},{"info":{"name":"Chapter5","cnName":"霓虹灯牌","description":"章节5","bgUrl":"asset/img/bg/Chapter5.png","clear":0,"FC.":0,"Phi":0},"songs":[{"name":"test","id":"song0","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}},{"name":"test1","id":"song1","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}}]}]}`;
                    data = JSON.parse(lS.data);
                    info('存储数据已初始化', 'info');
                    break;
                case 'initSettings':
                    lS['settings'] = `{"pmyc":0,"buttonSize":100,"OFBlur": true,"bgBlur":100,"OFAudio":true,"gameAudio":100,"uiAudio":100,"touchAudio":100,"OFDyfz":true,"OFFcApzsq":true,"OFEffect":true,"OFAutoPlay":false}`;
                    settings = JSON.parse(lS.data);
                    info('设置数据已初始化', 'info');
                    break;
            }
            var reload = confirm('上传的数据需要刷新网页才可以生效\n是否立刻刷新');
                if (reload) {
                    window.history.go(0);
                } else {
                    info('未刷新网页，可能出现数据错误', 'warning');
                }
        };
    });
    $('#ui,#bg').fadeIn(1000, () => {
        // 回到主页按键被点击事件处理
        $('#back').unbind('click').click(() => {
            $('#blur').css('backdrop-filter', `blur(${settings.bgBlur}px)`)
            try {clearInterval(efRBmT);$('#effects').empty();} catch (error) {}
            if (settings.OFEffect) {
                efRBmT = setInterval(() => {
                    addEffect('rBmT', Math.round(Math.random() + 1))
                }, 1500);
            }
            if (!settings.OFBlur) {
                $('#OFBlurCss').text('*{backdrop-filter: none !important;}');
            } else {
                $('#OFBlurCss').text('');
            }
            $('*').unbind();
            $('*').finish();
            $('#ui,#bg').fadeOut(1000, () => {
                toHome();
            });
        });
    });
}


//init
let audios = new Array, data, settings,loaded = false, dfDfcy = 'ez';
var efRBmT, lS = window.localStorage;
const DATAVERSION = 0.2, VERSION = '1.0.0 dev';
$(() => {
    // 更改/刷新进度条及进度
    function setProgress(progress=0, lenth=999){
        if (!loaded) {
           $('#progressTitle').text(`${progress} / ${lenth}`);
            document.querySelector('#progressBar-finished').style.width = progress / lenth * 100 + '%';
            if (progress == lenth) {
                $('#progress').slideUp(1000, () => {
                    $('#progress').remove();
                    loaded = true;
                });
            } 
        }
    }
    $('body *').hide();
    $('*').each((index, element) => {
        element.oncontextmenu = (e) => {return false;}
    });
    setProgress(0,15)
    $('#infoList,#landspace').show();
    $('#landspace').bind('click').click(() => {
        if ($('body').attr('landspace') == "true") {
            $('body').attr('landspace', 'false');
        } else {
            $('body').attr('landspace', 'true');
        }
    });
    changeBg(`img${Math.round(Math.random() * 14)}.webp`);
    $('#start').show().unbind('click').click(() => {
        $('#start,#landspace').remove();
        setTimeout(() => {
            setProgress(1, 14);
            $('#ui,#effects,#title').fadeIn(1000);
            $('#description,#progress,#progress *').fadeIn(2000);
            // 检查版本
            $('#infos').text(`v${VERSION}`);
            $('#infos').fadeIn(2000);
            setProgress(2, 14);
            // 检查浏览器兼容性
            let ua =navigator.userAgent;
            if (window.opera) {
                ua = 'opera';
                info('当前浏览器可能无法正常显示界面', 'warning');
                setProgress(3, 15);
            } else if (ua.includes('Firefox')) {
                ua = 'firefox';
                info('当前浏览器可能无法正常显示界面', 'warning');
                setProgress(4, 15);
            } else if (ua.includes('Chrome')) {
                ua = 'chrome';
                info('正常情况下当前浏览器可以完美适配游戏界面', 'good');
                setProgress(5, 15);
            } else {
                ua = 'unknow';
                info('当前浏览器可能无法正常显示界面', 'warning');
                setProgress(6, 15);
            }
            setProgress(7, 14)
            //检查已存储数据
            if(! window.localStorage){
                // 警告用户当前浏览器（模式）不支持存储
                info("浏览器不支持存储", 'error');
            }else{
                if (lS['data'] === undefined) { //如果没存储过数据则初始化存储数据
                    lS['data'] = `{"chapters":[{"info":{"name":"Single","cnName":"单曲 精选集","description":"","bgUrl":"asset/img/bg/Single.png","clear":0,"FC.":0,"Phi":0},"songs":[{"name":"test","id":"song0","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}},{"name":"test1","id":"song1","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}}]},{"info":{"name":"Last Chapter","cnName":"过去的章节","description":"","bgUrl":"asset/img/bg/Last%20Chapter.png","clear":0,"FC.":0,"Phi":0},"songs":[{"name":"Glaciaxion","id":"cls0","author":"SunsetRay","dfcy":{"ez":{"dfcy":1,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":6,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":12,"FC.":false,"mark":0,"ACC":0},"legacy":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}},{"name":"Eradication Catastrophe","id":"cls1","author":"Nces","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}},{"name":"Credits","id":"cls2","author":"Frums","dfcy":{"ez":{"dfcy":4,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":10,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":13,"FC.":false,"mark":0,"ACC":0}}},{"name":"Dlyrotz","id":"cls3","author":"Likey","dfcy":{"ez":{"dfcy":6,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":14,"FC.":false,"mark":0,"ACC":0}}},{"name":"Engine x Start!!(melody mix)","id":"cls4","author":"CrossingSound","dfcy":{"ez":{"dfcy":4,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":10,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":13,"FC.":false,"mark":0,"ACC":0},"legacy":{"dfcy":15,"FC.":false,"mark":0,"ACC":0}}},{"name":"光","id":"cls5","author":"姜米條","dfcy":{"ez":{"dfcy":4,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":8,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":12,"FC.":false,"mark":0,"ACC":0},"legacy":{"dfcy":13,"FC.":false,"mark":0,"ACC":0}}},{"name":"Winter↑cube↓","id":"cls6","author":"Ctymax feat. NceS","dfcy":{"ez":{"dfcy":4,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":8,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":12,"FC.":false,"mark":0,"ACC":0},"legacy":{"dfcy":13,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":"?","FC.":false,"mark":0,"ACC":0}}}]},{"info":{"name":"Chapter4","cnName":"管道迷宫","description":"章节4","bgUrl":"asset/img/bg/Chapter4.png","clear":0,"FC.":0,"Phi":0},"songs":[{"name":"test","id":"song0","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}},{"name":"test1","id":"song1","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}}]},{"info":{"name":"Chapter5","cnName":"霓虹灯牌","description":"章节5","bgUrl":"asset/img/bg/Chapter5.png","clear":0,"FC.":0,"Phi":0},"songs":[{"name":"test","id":"song0","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}},{"name":"test1","id":"song1","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}}]}]}`;
                    info('存储数据已初始化', 'info');
                };
                if (lS['settings'] === undefined) { //如果没存储过设置则初始化存储设置
                    lS['settings'] = `{"pmyc":0,"buttonSize":100,"OFBlur": true,"bgBlur":100,"OFAudio":true,"gameAudio":100,"uiAudio":100,"touchAudio":100,"OFDyfz":true,"OFFcApzsq":true,"OFEffect":true,"OFAutoPlay":false}`;
                    info('设置数据已初始化', 'info');
                };
                if (lS['version'] === undefined || lS['version'] < DATAVERSION) {
                    lS['version'] = DATAVERSION;
                    lS['data'] = `{"chapters":[{"info":{"name":"Single","cnName":"单曲 精选集","description":"","bgUrl":"asset/img/bg/Single.png","clear":0,"FC.":0,"Phi":0},"songs":[{"name":"test","id":"song0","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}},{"name":"test1","id":"song1","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}}]},{"info":{"name":"Last Chapter","cnName":"过去的章节","description":"","bgUrl":"asset/img/bg/Last%20Chapter.png","clear":0,"FC.":0,"Phi":0},"songs":[{"name":"Glaciaxion","id":"cls0","author":"SunsetRay","dfcy":{"ez":{"dfcy":1,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":6,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":12,"FC.":false,"mark":0,"ACC":0},"legacy":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}},{"name":"Eradication Catastrophe","id":"cls1","author":"Nces","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}},{"name":"Credits","id":"cls2","author":"Frums","dfcy":{"ez":{"dfcy":4,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":10,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":13,"FC.":false,"mark":0,"ACC":0}}},{"name":"Dlyrotz","id":"cls3","author":"Likey","dfcy":{"ez":{"dfcy":6,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":14,"FC.":false,"mark":0,"ACC":0}}},{"name":"Engine x Start!!(melody mix)","id":"cls4","author":"CrossingSound","dfcy":{"ez":{"dfcy":4,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":10,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":13,"FC.":false,"mark":0,"ACC":0},"legacy":{"dfcy":15,"FC.":false,"mark":0,"ACC":0}}},{"name":"光","id":"cls5","author":"姜米條","dfcy":{"ez":{"dfcy":4,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":8,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":12,"FC.":false,"mark":0,"ACC":0},"legacy":{"dfcy":13,"FC.":false,"mark":0,"ACC":0}}},{"name":"Winter↑cube↓","id":"cls6","author":"Ctymax feat. NceS","dfcy":{"ez":{"dfcy":4,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":8,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":12,"FC.":false,"mark":0,"ACC":0},"legacy":{"dfcy":13,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":"?","FC.":false,"mark":0,"ACC":0}}}]},{"info":{"name":"Chapter4","cnName":"管道迷宫","description":"章节4","bgUrl":"asset/img/bg/Chapter4.png","clear":0,"FC.":0,"Phi":0},"songs":[{"name":"test","id":"song0","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}},{"name":"test1","id":"song1","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}}]},{"info":{"name":"Chapter5","cnName":"霓虹灯牌","description":"章节5","bgUrl":"asset/img/bg/Chapter5.png","clear":0,"FC.":0,"Phi":0},"songs":[{"name":"test","id":"song0","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}},{"name":"test1","id":"song1","author":"","dfcy":{"ez":{"dfcy":3,"FC.":false,"mark":0,"ACC":0},"hd":{"dfcy":7,"FC.":false,"mark":0,"ACC":0},"in":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"at":{"dfcy":11,"FC.":false,"mark":0,"ACC":0},"sp":{"dfcy":11,"FC.":false,"mark":0,"ACC":0}}}]}]}`;
                    lS['settings'] = `{"pmyc":0,"buttonSize":100,"OFBlur": true,"bgBlur":100,"OFAudio":true,"gameAudio":100,"uiAudio":100,"touchAudio":100,"OFDyfz":true,"OFFcApzsq":true,"OFEffect":true,"OFAutoPlay":false}`;
                    info('存储与设置数据结构已更新', 'info');
                }
                // 将数据由json格式转为变量
                settings = JSON.parse(lS['settings']);
                data = JSON.parse(lS['data']);
            }
            setProgress(8, 15);
            // rBmT特效定时器
            if (settings.OFEffect) {
                efRBmT = setInterval(() => {
                    addEffect('rBmT', Math.round(Math.random() + 1))
                }, 1500);
            }
            setProgress(9, 14);
            // 检查背景实时模糊是否开启
            if (!settings.OFBlur) {
                $('#OFBlurCss').text('*{backdrop-filter: none !important;}');
            } else {
                $('#OFBlurCss').text('');
            }
            setProgress(10, 15);
            // 加载音频
            loadAudio('asset/audio/bgm/TouchToStart.wav').oncanplaythrough = () => {
            setProgress(11, 15);
            loadAudio('asset/audio/bgm/ChapterSelect.wav').oncanplaythrough = () => {
            setProgress(12, 15);
            loadAudio('asset/audio/ui/Tap3.wav').oncanplaythrough = () => {
            setProgress(13, 15);
            loadAudio('asset/audio/ui/Tap1.wav').oncanplaythrough = () => {
                setProgress(14, 15);
                settings.OFAutoPlay = false;
                lS.settings = JSON.stringify(settings);
                setProgress(15, 15);
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
                            $('*').unbind();
                            $('*').finish();
                            setAudio(0, 'TouchToStart.wav');
                            removeAudio('TouchToStart.wav');
                            $('#ui,#effects,#bg,#infos').fadeOut(1000, () => {
                                $('#infos').remove();
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