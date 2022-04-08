let previous = document.querySelector('#pre')
let play = document.querySelector('#play')
let next =document.querySelector('#next')
let title = document.querySelector('#title')
let recent_volume = document.querySelector('#volume')
let volume_show = document.querySelector('#volume_show')
let slider = document.querySelector('#duration_slider')
let show_duration =document.querySelector('#show_duration')
let quranPix = document.querySelector('#Quranpix')
let auto_play = document.querySelector('#auto')
let present  = document.querySelector('#present')
let total = document.querySelector('#total')
let reciter = document.querySelector('#reciter')


let timer
let autoplay = 0
let index_no = 0
let Playing_quran = false


// //create audio element

let quran = document.createElement('audio')

//All chapters

let All_chapters = [
    {
        name: 'suratul faathia',
        path: 'mp3/Quran1.mp3',
        img:   'img/quranpix1.jpg',
        reciter: '1'
    },
    {
        name: 'suratul Baqarah',
        path: 'mp3/Quran2.mp3',
        img:   'img/quranpix1.jpg',
        reciter: '2'
    },
    {
        name: 'suratul Al-imran',
        path: 'mp3/Quran3.mp3',
        img:   'img/quranpix1.jpg',
        reciter: '3'
    },
    {
        name: 'suratul Al-Nisai',
        path: 'mp3/Quran4.mp3',
        img:   'img/quranpix1.jpg',
        reciter: '4'
    },
    {
        name: 'suratul An-Nas',
        path: 'mp3/Quran114.mp3',
        img:   'img/quranpix1.jpg',
        reciter: '114'
    },
]


//All function

//Loading the quran


function load_quran(index_no){
    clearInterval(timer);
    reset_slider();
    quran.src = All_chapters[index_no].path 
    title.innerHTML = All_chapters [index_no].name
    quranPix.src = All_chapters[index_no].img
    reciter.innerHTML = All_chapters[index_no].reciter
    quran.load()
    timer = setInterval (range_slider, 1000);
    total.innerHTML = All_chapters.length;
    present.innerHTML = index_no  + 1;			
} 

load_quran(index_no)

// // mute sound
function mute_sound(){
    quran.volume = 0;
    volume.value - 0;
    volume_show.innerHTML = 0;
}

// //checking the quran playing or not

function justplay(){
    if(Playing_quran == false){
        playquran()
    }else{
        pausequran()
    }
}

// //reset quran slider

function reset_slider(){
    slider.value = 0;
}

//play quran
function playquran(){
    quran.play()
    Playing_quran = true
    play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>'
}

//play quran
function pausequran(){
    quran.pause()
    Playing_quran = false
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
}

//next chapter
function next_chapter(){
    if(index_no < All_chapters.length - 1){
     index_no += 1
     load_quran(index_no)
     playquran()
    }else{
        index_no = 0
        load_quran(index_no)
        playquran()
    }
}

function previous_chapter(){
    if(index_no > 0 ){
     index_no -= 1
     load_quran(index_no)
     playquran()
    }else{
        index_no = All_chapters.length
        load_quran(index_no)
        playquran()
    }
}
function volume_change(){
    volume_show.innerHTML = recent_volume.value
    quran.volume = recent_volume.value/100
}

function change_duration(){
    slider_position = quran.duration * (slider.value/100)
    quran.currentTime = slider_position
}

function autoplay_switch(){
    if(autoplay == 1){
        autoplay = 0
        auto_play.style.background = "rgba(255,255,255,0.2)"
    }else{
        autoplay = 1
        auto_play.style.background = "#148F77"
    }
}

function range_slider(){
    let position = 0
    if(!isNaN(quran.duration)){
        position = quran.currentTime * (100 / quran.duration)
        slider.value = position
    }
     //function should work when quran is over
     if(quran.ended){
         play.innerHTML = '<i class="fa fa-play" aria-hidden= "true"></i>'
         if(autoplay == 1){
             index_no += 1
             load_quran(index_no)
             playquran()
         }
     }
}