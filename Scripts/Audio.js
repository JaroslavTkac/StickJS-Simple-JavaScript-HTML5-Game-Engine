/**
 * Created by jaroslavtkaciuk on 19/04/2017.
 */

class Sound{
    constructor(){
        this.sounds = [];
    }

    addSong(song){
        this.sounds.push(song);
    }
    getSongByName(name){
        for(var i in this.sounds) {
            if (this.sounds[i].name === name)
                return this.sounds[i];
        }
    }

}

class Song{
    constructor(soundSrc, name){
        this.soundSrc = soundSrc;
        this.name = name;
        this.sound = new Audio(soundSrc);
    }
    play(){
        this.sound.play();
    }
    repeat(){
        this.sound.loop = true;
    }
    stop(){
        this.sound.pause();
        this.sound.currentTime = 0.0;
    }
}

