var holding = false;
var track = document.getElementById('track');
var progress = document.getElementById('progress');
var play = document.getElementById('play');
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var current_track = 0;
var audio = new Audio();
var duration;
var playing = false;
var title = document.getElementById('title');
var artist = document.getElementById('artist');
var art = document.getElementById('art');
var songs = [
    {
        title: 'Ya Te Olvidé',
        artist: 'Rocío Dúrcal',
        url: 'music/Ya_te_olvide.mp3',
        art: 'img/cover/rocio_d.png'
    },
    {
        title: 'Bye Bye',
        artist: 'Babasonicos',
        url: 'music/bye_bye.mp3',
        art: 'img/cover/babasonicos.jpg'
    },
    {
        title: 'Look what youve done',
        artist: 'Jet',
        url: 'music/M/jet.mp3',
        art: 'img/cover/jet.jpg'
    },
    {
        title: 'Dream on',
        artist: 'Aerosmith',
        url: 'music/M/dram_on.mp3',
        art: 'img/cover/dram_oni.jpg'
    },
    {
        title: 'Si antes te hubiera conocido',
        artist: 'Karol G',
        url: 'music/Si_antes_te_hubiera_conocido.mp3',
        art: 'img/cover/karol.jpg'
    },
    {
        title: 'Frankestain posmo',
        artist: 'El cuarteto de nos',
        url: 'music/M/cuarteto_de_nos.mp3',
        art: 'img/cover/cuarteto_de.jpg'
    },
    {
        title: 'Devorando el corazón',
        artist: 'Warcry',
        url: 'music/M/devorando_el_corazon.mp3',
        art: 'img/cover/warcry.jpg'
    },
    {
        title: 'Libre, solterito',
        artist: 'Leo Dan',
        url: 'music/M/libre_solterito.mp3',
        art: 'img/cover/leo_dan.jpg'
    },
    {
        title: 'Me quedaré',
        artist: 'Ricardo Arjona',
        url: 'music/M/me_quedare.mp3',
        art: 'img/cover/ricar.jpg'
    },
    {
        title: 'Mi ciudad',
        artist: 'Tiago PZK',
        url: 'music/M/mi_ciudad.mp3',
        art: 'img/cover/ysy.jpg'
    },
    {
        title: 'Olvidarte',
        artist: 'Ricardo Arjona',
        url: 'music/M/olvidarte.mp3',
        art: 'img/cover/ricardo_ar.jpg'
    },
    {
        title: 'Para que me quieras...',
        artist: 'Ricardo Arjona',
        url: 'music/M/para_que me_quieras_como.mp3',
        art: 'img/cover/ricardo.jpg'
    },
    {
        title: 'Past live',
        artist: 'Borns',
        url: 'music/M/past_live.mp3',
        art: 'img/cover/borns.jpg'
    },
    {
        title: 'Quitame es hombre...',
        artist: 'Pilar Montenegro',
        url: 'music/M/quitame_ese_hombre.mp3',
        art: 'img/cover/pilar.jpg'
    }, {
        title: 'Santo pecado',
        artist: 'Ricardo Arjona',
        url: 'music/M/santo_pecado.mp3',
        art: 'img/cover/pecado_arjona.jpg'
    },
    {
        title: 'Soldado_raso',
        artist: 'Ricardo Arjona',
        url: 'music/M/soldado_raso.mp3',
        art: 'img/cover/raso_arjona.jpg'
    },
    {
        title: 'Take a look around',
        artist: 'Limp Bizkit',
        url: 'music/M/take_a_look.mp3',
        art: 'img/cover/limp.jpg'
    },
    {
        title: 'Real gangsta love',
        artist: 'Trueno',
        url: 'music/M/Trueno.mp3',
        art: 'img/cover/trueno.jpg'
    },
    {
        title: 'Vivir',
        artist: 'Arjona',
        url: 'music/M/vivir.mp3',
        art: 'img/cover/vivir_arjona.jpg'
    },
];
window.addEventListener('load', init, false);
function init() {
    loadTrack(current_track);
}
function loadTrack(trackIndex) {
    song = songs[trackIndex];
    audio.src = song.url;
    title.textContent = song.title;
    artist.textContent = song.artist;
    art.src = song.art;
    audio.load();
}
audio.addEventListener('timeupdate', updateProgress, false);
function updateProgress() {
    var progressWidth = (audio.currentTime / audio.duration) * 100;
    progress.style.width = progressWidth + "%";
}
audio.addEventListener('loadedmetadata', function () {
    duration = this.duration;
}, false);
function seekTrack(e) {
    var percent = e.offsetX / track.offsetWidth;
    audio.currentTime = duration * percent;
}
window.onmousemove = function (e) {
    e.preventDefault();
    if (holding) seekTrack(e);
};
window.onmouseup = function () {
    holding = false;
};
window.onmousedown = function (e) {
    holding = true;
    seekTrack(e);
};
play.onclick = function () {
    if (playing) {
        audio.pause();
    } else {
        audio.play();
    }
};
audio.addEventListener("pause", function () {
    play.innerHTML = '<img class="pad" src="img/play.png" />';
    playing = false;
}, false);
audio.addEventListener("playing", function () {
    play.innerHTML = '<img src="img/pause.png"/>';
    playing = true;
}, false);

next.addEventListener("click", nextTrack, false);
prev.addEventListener("click", prevTrack, false);

function nextTrack() {
    current_track = (current_track + 1) % songs.length;
    loadTrack(current_track);
    audio.play();
}
function prevTrack() {
    current_track = (current_track - 1 + songs.length) % songs.length;
    loadTrack(current_track);
    audio.play();
}
audio.addEventListener('ended', function () {
    nextTrack();
}, false);

function createPlaylist() {
    var playlist = document.getElementById('playlist');
    songs.forEach(function(song, index) {
        var li = document.createElement('li');
        li.textContent = song.title + " - " + song.artist;
        li.setAttribute('data-index', index);
        li.addEventListener('click', function() {
            loadTrack(index);
            audio.play();
            updateActiveTrack(index);
        });
        playlist.appendChild(li);
    });
}

function updateActiveTrack(index) {
    var playlistItems = document.querySelectorAll('#playlist li');
    playlistItems.forEach(function(item, i) {
        item.classList.remove('active');
        if (i === index) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('load', function() {
    init();  // Inicia la primera pista
    createPlaylist();  // Crea la lista de reproducción
    updateActiveTrack(current_track);  // Marca la primera pista como activa
}, false);
