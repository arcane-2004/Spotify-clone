let songs;
let currFolder;

async function getSongs(folder) {
    currFolder = folder
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`)
    let response = await a.text();
    console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            // songs.push(element.href.split("/assests/audio")[1])
            songs.push(element.href.split(`/${folder}/`).slice(-1)[0])
        }
    }


    //show all the songs in playlist
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUL.innerHTML = " "
    for (const song of songs) {

        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" src="/assests/images/music.svg" alt="">
                             <div class="info">
                                 <div>${song.replaceAll("%20", " ")}</div>
                                 <div>song artist</div>
                             </div>
                             <div class="playnow">
                                 <span>Play now</span>
                                 <img class="invert" src="/assests/images/play.svg" alt="">
                             </div> </li>`;
    }
    //Add an event listener to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playmusic(e.querySelector(".info").firstElementChild.innerHTML)
        })

    });

    return songs;
}

const playmusic = (track, pause = false) => {
    currentSong.src = `/${currFolder}/` + track
    if (!pause) {
        play.src = "/assests/images/pause.svg"
        currentSong.play()
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

}

//second to minute
function secondToMinute(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "0:00";
    }
    const wholeSeconds = Math.floor(seconds); // Remove fractional part
    const minutes = Math.floor(wholeSeconds / 60);
    const remainingSeconds = wholeSeconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

let currentSong = new Audio();

async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:3000/assests/audio`)
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("/assests")) {

            let folder = e.href.split("/").slice(-2)[0]
            //to get meta data of folder
            let a = await fetch(`http://127.0.0.1:3000/assests/audio/${folder}/info.json`)
            let response = await a.json();
            console.log(response)

            cardContainer.innerHTML = cardContainer.innerHTML + ` <div data-folder="${folder}" class="card">
                        <div class="playbutton">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                style="width: 100%; height: 100%;">
                                <circle fill="#1ED760" cx="256" cy="256" r="256" />
                                <path fill="#000000"
                                    d="M351.74 275.46c17.09-11.03 17.04-23.32 0-33.09l-133.52-97.7c-13.92-8.73-28.44-3.6-28.05 14.57l.54 191.94c1.2 19.71 12.44 25.12 29.04 16l131.99-91.72z" />
                            </svg>
                        </div>
                        <img src="/assests/audio/${folder}/cover.jpeg" alt="">
                        <h2>${response.title}</h2>
                        <p>${response.description} </p>
                    </div>`
        }
    }
    //load the palylist when a card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {

        e.addEventListener("click", async item => {
            console.log(`${item.currentTarget.dataset.folder}`)
            songs = await getSongs(`assests/audio/${item.currentTarget.dataset.folder}`);
            // console.log(`${item.currentTarget.dataset.folder}`)
            console.log(songs)
            playmusic(songs[0])

        })
    });
}

async function main() {
    //Get the list of songs
    await getSongs("assests/audio/ncs");
    playmusic(songs[0], true);

    //display all the albums
    displayAlbums();

    //Attach an event listener to play, next, previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "/assests/images/pause.svg"
        }
        else {
            currentSong.pause();
            play.src = "/assests/images/play.svg"
        }
    })

    //listener for time upddate
    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".songtime").innerHTML = `${secondToMinute(currentSong.currentTime)} / ${secondToMinute(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    //Add anevent listener to the seek bar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    })

    //add event listener to hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })

    //add event listener for clase button
    document.querySelector(".close-left").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-110%";
    })

    //add an even listener to previous 
    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= length) {
            playmusic(songs[index - 1]);
        }
    })

    //add an even listener to next
    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playmusic(songs[index + 1]);
        }
    })

    //add an eventlistener to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currVolume = parseInt(e.target.value) / 100
        currentSong.volume = currVolume;
    })

    //add eventlistener to mute the track
    document.querySelector(".volume").addEventListener("click", (e)=>{
        console.log(e.target)
        if(e.target.src.includes("volume.svg")){
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else{
            e.target.src = e.target.src.replace("mute.svg", "volume.svg" );
            currentSong.volume = currVolume;
            document.querySelector(".range").getElementsByTagName("input")[0].value = currVolume*100;
        }
    })

}




main();
