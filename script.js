//variable initialization
let audioElement = new Audio("songs/0.mp3");
let songIndex = 0;
let playBar = document.getElementById('playBar');
let mainPlay = document.getElementById('mainPlay');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let bottomSongName= document.getElementById('bottomSongName');


songs = [
    {songName:'Khat Me Zanzeeri - Alia Ansari', songPath: 'songs/zanzeeri.mp3', coverPath: 'covers/zanzeeri.jpg'},
    {songName:'Rababi Malanga - Laila Khan', songPath: 'songs/rabbabi.mp3', coverPath: 'covers/rabbabi2.jpg'},
    {songName:'Za che zo Laghman ta - Ghezaal Enayat', songPath: 'songs/laghman.mp3', coverPath: 'covers/laghman1.jpg'},
    {songName:'Tora Da Jalkay - Bakhtyar & Laila', songPath: 'songs/jalky.mp3', coverPath: 'covers/jalky.jpg'},
    {songName:'Jenakai Dali Dali - Zahra and Laila', songPath: 'songs/daly.mp3', coverPath: 'covers/daly.jpg'},
];

//event listening
//1. main play/pause
mainPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        mainPlay.classList.remove('fa-circle-play');
        mainPlay.classList.add('fa-circle-pause');
        //opacity of the gif
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        mainPlay.classList.remove('fa-circle-pause');
        mainPlay.classList.add('fa-circle-play');
        //opacity of the gif
        gif.style.opacity = 0;

    }

})

//2. playbar progress
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    playBar.value = progress;

})

//3.playbar seek
playBar.addEventListener('change', ()=>{
    audioElement.currentTime = (playBar.value/100)*audioElement.duration;
})

//4. giving/iterating covers and names of the songitem class
songItem.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

//fucntion which makes all icon change into play
const makeAllIconPlay = ()=>{
    Array.from(document.getElementsByClassName('songPlayIcon')).forEach((element)=>{
            element.classList.remove("fa-circle-pause");
            element.classList.add("fa-circle-play");
    })
}

//5. changin gplay/pause icon corresponding song in songItem container
Array.from(document.getElementsByClassName('songPlayIcon')).forEach((element)=>{
    element.addEventListener('click',(e)=>{

        if(audioElement.paused){//songs are paused
            songIndex = e.target.id;
            bottomSongName.innerText = songs[songIndex].songName;
            audioElement.src = `songs/${songIndex}.mp3`;
            audioElement.play();
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            //opacity of the gif
            gif.style.opacity = 1;
            
            //main play button
            mainPlay.classList.remove('fa-circle-play');
            mainPlay.classList.add('fa-circle-pause');
        }else{//songs are playing
            let songClassList = e.target.classList.value;
            makeAllIconPlay();
            if(songClassList == "fa-regular songPlayIcon fa-circle-pause"){//the target icon song is playing
                songIndex = e.target.id;
                bottomSongName.innerText = songs[songIndex].songName;
                audioElement.pause();
                e.target.classList.remove("fa-circle-pause");
                e.target.classList.add("fa-circle-play");

                //opacity of the gif
                gif.style.opacity = 0;

                mainPlay.classList.remove('fa-circle-pause');
                mainPlay.classList.add('fa-circle-play');
            }else{//the target icon song is paused
                songIndex = e.target.id;
                bottomSongName.innerText = songs[songIndex].songName;
                songIndex = e.target.id;
                bottomSongName.innerText = songs[songIndex].songName;
                songIndex = e.target.id;
                audioElement.src = `songs/${songIndex}.mp3`;
                audioElement.play();
                e.target.classList.remove("fa-circle-play");
                e.target.classList.add("fa-circle-pause");
            }
        }
    })
})


//6.next button event
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex == 4){
        songIndex = 0;
    }else{
        songIndex++;
    }

    bottomSongName.innerText = songs[songIndex].songName;

    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.play();
    mainPlay.classList.remove("fa-circle-play");
    mainPlay.classList.add("fa-circle-pause");

    //.making next  song icon changed from play to pause icon
    makeAllIconPlay();
    document.getElementById(songIndex).classList.remove("fa-circle-play");
    document.getElementById(songIndex).classList.add("fa-circle-pause");

    //opacity
    gif.style.opacity = 1;

})

//7.prrevious button event
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex == 0){
        songIndex = 4;
    }else{
        songIndex--;
    }

    bottomSongName.innerText = songs[songIndex].songName;

    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.play();
    mainPlay.classList.remove("fa-circle-play");
    mainPlay.classList.add("fa-circle-pause");

    //.making previous  song icon changed from play to pause icon
    makeAllIconPlay();
    document.getElementById(songIndex).classList.remove("fa-circle-play");
    document.getElementById(songIndex).classList.add("fa-circle-pause");
    //opacity
    gif.style.opacity = 1;
})
