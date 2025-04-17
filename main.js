const videoElement = document.querySelector('#video')
const palyVideo = document.querySelector("#play")
const prevVideo = document.querySelector("#prev-btn")
const nextVideo = document.querySelector('#next-btn')
const title = document.querySelector('.videoNaem')
const artistname = document.querySelector('.artisName')
const curentTimeEL = document.querySelector('.curent-time')
const durationTime= document.querySelector('.duration')
const progresscontainer = document.querySelector('.progrees-bar')
const progress = document.querySelector('.progress')
const volume = document.querySelector('#volume')
const speeds = document.querySelector('#speed')

const videos =[
    {
        title:"Sheekh" , artist:"wacdi"  , video:"video 1.mp4"
    },
    {
        title:"Shactiro" , artist:"arab"  , video:"video 5MP4.MP4"
    },
    {
        title:"casal" , artist:"wiilka yar"  , video:"video 6.mp4"
    },
    {
        title:"buufin" , artist:"arab"  , video:"video_2.mp4"
    },
    {
        title:"ciid" , artist:"arab"  , video:"video_3.mp4"
    },
    {
        title:"dheeel" , artist:"arab"  , video:"video_4.mp4"
    },
    
]

let videoIndex = 0
let isPlaying =false
let speed = 1

function loadvideo(video){
    title.textContent =video.title 
    artistname.textContent=video.artist
    videoElement.src =video.video
}
loadvideo(videos[videoIndex])


function playvideos(){
    palyVideo.querySelector('i').classList.remove('fa-play')
    palyVideo.querySelector('i').classList.add('fa-pause')
    videoElement.play()
    isPlaying =true


}
function pausevideos(){
    palyVideo.querySelector('i').classList.remove('fa-pause')
    palyVideo.querySelector('i').classList.add('fa-play')
    videoElement.pause()
    isPlaying =false


}
console.log(videos.length)

function nextvideos(){
    pausevideos()
    setTimeout(function(){
        videoIndex++
        if(videoIndex > videos.length -1){
            videoIndex =0
        }
        loadvideo(videos[videoIndex])
        playvideos()
    },300)
}
function prevvideos(){
    pausevideos()
    setTimeout(function(){
        videoIndex--
        if(videoIndex < 0){
            videoIndex=videos.length -1
        }
        loadvideo(videos[videoIndex])
        playvideos()
    },300)
}


function updateprogress(e){
    const{duration ,currentTime}=e.srcElement
    // console.log( "duration",duration )
    // console.log( "current",currentTime )
    if(isNaN(duration))return

    const progresspercent = (currentTime /duration)*100
    progress.style.width=`${progresspercent}%`

    const durationMinutes = Math.floor(duration/60)
    let durationSeconds = Math.floor(duration%60)
    if(durationSeconds <10){
        durationSeconds = `0${durationSeconds}`
    }
    durationTime.textContent=`${durationMinutes}: ${durationSeconds}`

    const currentMinutes = Math.floor(currentTime / 60)
    let currentseconds = Math.floor(currentTime % 60)

    if(currentseconds < 10){
        currentseconds =`0${currentseconds}`
    }
    // console.log(currentseconds)

    curentTimeEL.textContent =`${currentMinutes}:${currentseconds}`

    videoElement.playbackRate =speed
}


function setprogress(e){
    const width= this.clientWidth
    const clickX= e.offsetX
    const duration = videoElement.duration
        console.log(width)
        console.log(clickX)

    if(isNaN(duration))return

    const newtime = (clickX /width)*duration
    videoElement.currentTime= newtime
}


palyVideo.addEventListener("click" , function() {
    if(isPlaying)
        {pausevideos()

    }else{
        playvideos()
    }

})
nextVideo.addEventListener('click' , function(){
    nextvideos()})

prevVideo.addEventListener('click' , function(){
    prevvideos()})

videoElement.addEventListener('timeupdate' , updateprogress)

progresscontainer.addEventListener('click' , setprogress)

volume.addEventListener('input' , function (e){
    

    videoElement.volume=e.target.value
})

speeds.addEventListener("change",(e)=>{
    speed =parseFloat(e.target.value)
    videoElement.playbackRate =speed
})


videoElement.addEventListener('loadedmetadata' , updateprogress)