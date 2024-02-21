
let trackList = [
    { title: "All The Stars", artist: "Kendrick Lamar and SZA", src: "audio/all_the_stars.mp3", cover: "images/cover1.jpg" },
    { title: "Starboy", artist: "The Weeknd", src: "audio/starboy.mp3", cover: "images/cover2.png" },
    { title: "Lose Yourself", artist: "Eminem", src: "audio/lose_yourself.mp3", cover: "images/cover3.jpeg" },
    { title: "Night Changes", artist: "One Direction", src: "audio/night_changes.mp3", cover: "images/cover4.png" },
    { title: "Beat It", artist: "Michael Jackson", src: "audio/beat_it.mp3", cover: "images/cover5.jpg" },
    { title: "Call Out My Name", artist: "The Weeknd", src: "audio/call_out_my_name.mp3", cover: "images/cover6.jpg" },
    { title: "Live Your Life", artist: "T.I. featuring Rihanna", src: "audio/live_your_life.mp3", cover: "images/cover7.jpg" },
    { title: "Berzerk", artist: "Eminem", src: "audio/berzerk.mp3", cover: "images/cover8.jpg" },
    { title: "God's Plan", artist: "Drake", src: "audio/gods_plan.mp3", cover: "images/cover9.jpg" },
    { title: "Smooth Criminal", artist: "Michael Jackson", src: "audio/smooth_criminal.mp3", cover: "images/cover10.jpg" }
];


let trackNo = 0;
let audio = document.getElementById("audio-track");
let playPauseBtn = document.getElementById("play-pause");
let volInputEle = document.getElementById("volume-slider");
let prevBtn = document.getElementById("previous");
let nextBtn = document.getElementById("next");
let trackName = document.getElementById("track-name");
let trackAuthor = document.getElementById("track-author");
let trackImage = document.getElementById("cover");
let repeatBtn = document.getElementById("repeat");
let slider = document.getElementById("slider");
let currentTime = document.getElementById("currentTime");
let duration = document.getElementById("duration");

function volumeFn(){
    let volumeInput = volInputEle.value;
    volumeInput = volumeInput/100;
    audio.volume = volumeInput;
}

function playPauseFn(){
    if (audio.paused){
        audio.play();
        playPauseBtn.innerHTML = '<i class="bi bi-pause"></i>';
    }else{
        audio.pause();
        playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    }
}

function playTrack(e){
    audio.setAttribute('src',trackList[e].src);
    trackName.innerText = trackList[e].title;
    trackAuthor.innerText = trackList[e].artist;
    trackImage.setAttribute('src', trackList[e].cover);

    if(playPauseBtn.innerHTML === '<i class="bi bi-play-fill"></i>'){
        audio.pause();
    }else if(playPauseBtn.innerHTML === '<i class="bi bi-pause"></i>'){
        audio.play();
    }
}

function prevFn(){
    trackNo-=1;
    if(trackNo < 0) {
        trackNo = trackList.length - 1; 
    }
    playTrack(trackNo);
}

function nextFn(){
    trackNo+=1;
    if(trackNo >= trackList.length) {
        trackNo = 0; 
    }
    playTrack(trackNo);
}

function repeatFn(){
    if(repeatBtn.innerHTML === '<i class="bi bi-repeat"></i>'){
        audio.loop = true;
        repeatBtn.innerHTML = '<i class="bi bi-repeat-1"></i>';
    }else if(repeatBtn.innerHTML === '<i class="bi bi-repeat-1"></i>'){
        audio.loop = false;
        repeatBtn.innerHTML = '<i class="bi bi-repeat"></i>';
    }
}

function sliderInputFn() {
    audio.currentTime = this.value;
}

function sliderUpdateFn(){
    slider.max = audio.duration;
    slider.value = audio.currentTime;
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

playPauseBtn.addEventListener("click", playPauseFn);
volInputEle.addEventListener("click", volumeFn);
prevBtn.addEventListener("click", prevFn);
nextBtn.addEventListener("click", nextFn);
repeatBtn.addEventListener("click", repeatFn);
slider.addEventListener("input", sliderInputFn);
audio.addEventListener("timeupdate", sliderUpdateFn);

playTrack(trackNo);

