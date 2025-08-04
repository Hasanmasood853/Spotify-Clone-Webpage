console.log("Welcome to the Spotify Clone!");
const masterPlay = document.getElementById('masterplay');
const gif = document.getElementById('gif');
const progress = document.getElementsByClassName('progress');
const songName = document.getElementById('songName');
const nextBtn = document.getElementById('next');
const previousBtn = document.getElementById('previous');
const listPlay = document.getElementsByClassName('listPlay');

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let songs = [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji-Heroes-Tonight-feat-Johnning", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Afusic_-_Pal_Pal__Official_Music_", filePath: "songs/6.mp3", coverPath: "covers/6.jpeg" },
    { songName: "Full___Raanjhan___Do_Patti___", filePath: "songs/7.mp3", coverPath: "covers/7.jpeg" },
    { songName: "Barbaad___ Saiyara Song__mp3__official", filePath: "songs/8.mp3", coverPath: "covers/8.jpeg" },
    { songName: "Saiyaara-Official__Name_Song", filePath: "songs/9.mp3", coverPath: "covers/9.jpeg" },
    { songName: "Tera Kasoor Music by__Vishal Mishra", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
]
function playSong() {
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    Array.from(listPlay).forEach((el) => {
        el.classList.remove('fa-pause-circle');
        el.classList.add('fa-play-circle');
    });
    listPlay[songIndex].classList.remove('fa-play-circle');
    listPlay[songIndex].classList.add('fa-pause-circle');
    gif.style.opacity = 1;

}
function pauseSong() {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    listPlay[songIndex].classList.remove('fa-pause-circle');
    listPlay[songIndex].classList.add('fa-play-circle');
    gif.style.opacity = 0;
}
function setSong() {
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    songName.innerText = songs[songIndex].songName;
    Array.from(progress).forEach((element) => {
        element.value = 0;
    });
}

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        pauseSong();
    }
    songName.innerText = songs[songIndex].songName;
});

audioElement.addEventListener('timeupdate', () => {
    let progressValue = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    Array.from(progress).forEach((element) => {
        element.value = progressValue;
    });
});
Array.from(progress).forEach((element) => {
    element.addEventListener('input', () => {
        audioElement.currentTime = (element.value * audioElement.duration) / 100;
    });
})

nextBtn.addEventListener('click', () => {
    {
        if (songIndex < songs.length - 1) {
            songIndex++;
        } else {
            songIndex = 0;
        }
        setSong();
        playSong();
    }
})
previousBtn.addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex += 9;
    } else {
        songIndex--;
    }
    setSong();
    playSong();
})

Array.from(listPlay).forEach((element, index) => {
    element.addEventListener('click', () => {
        if (songIndex === index && !audioElement.paused) {
            pauseSong();
        } else {
            songIndex = index;
            setSong();
            playSong();
        }

    });
});


