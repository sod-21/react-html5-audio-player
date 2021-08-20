import './index.css';
import Icon from "./icon";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";

const debounce = require("lodash.debounce");
const uniqueId = require("lodash.uniqueid");

const DEBOUNCE_DELAY = 300;
const BUFFER_DELPAY = 100;

const initialSeek = {
    width: 0,
    currentTime: 0,
    cur_min: "00",
    cur_sec: "00",
    dur_min: "00",
    dur_sec: "00"
}

function SoundPlayer(props) {
    const snd_player = useRef();
    const { list } = props;
    const [current, SetCurrent] = useState(0);
    const [play, setPlay] = useState(false);
    const [seek, setSeek] = useState(initialSeek);
    const [currentTime, setCurrentTime] = useState(0);
    const [audio, setAudio] = useState(new Audio(list.length ? list[current].url : ""));

    const uuid = useMemo(() => (uniqueId("sound-player")), []);

    const handleMouseOver = (event) => {
        const sArea = snd_player.current.querySelector(".s-area");
        const insTime = snd_player.current.querySelector(".ins-time");
        const sHover = snd_player.current.querySelector(".s-hover");
        const rect = sArea.getBoundingClientRect();

        const seekBarPos = rect.left + window.scrollX;       
        const seekT = event.clientX - seekBarPos;
        const seekLoc = audio.duration * (seekT / sArea.offsetWidth);

        sHover.style.width =  seekT + "px";
        const cM = seekLoc / 60;

        let ctMinutes = Math.floor(cM);
        let ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if (ctMinutes < 10)
            ctMinutes = '0' + ctMinutes;
        if (ctSeconds < 10)
            ctSeconds = '0' + ctSeconds;

        if (isNaN(ctMinutes) || isNaN(ctSeconds)) {
            insTime.textContent = "--:--";
            return;
        }
        else {
            insTime.textContent = ctMinutes + ':' + ctSeconds;
        }

        insTime.style.left = seekT + "px";
        insTime.style.display = "block";
        setCurrentTime(cM);
    };

    const timeupdate = (event) => {


        let curMinutes = Math.floor(audio.currentTime / 60);
        let curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

        let durMinutes = Math.floor(audio.duration / 60);
        let durSeconds = Math.floor(audio.duration - durMinutes * 60);

        const playProgress = (audio.currentTime / audio.duration) * 100;

        if (curMinutes < 10)
            curMinutes = '0' + curMinutes;
        if (curSeconds < 10)
            curSeconds = '0' + curSeconds;

        if (durMinutes < 10)
            durMinutes = '0' + durMinutes;
        if (durSeconds < 10)
            durSeconds = '0' + durSeconds;

        const newseek = { ...seek };
        if (isNaN(curMinutes) || isNaN(curSeconds)) {
            newseek.cur_min = "00";
            newseek.cur_sec = "00";
            newseek.dur_min = "00";
            newseek.dur_sec = "00";
        }
        else {
            newseek.cur_min = curMinutes;
            newseek.cur_sec = curSeconds;
        }

        if (isNaN(durMinutes) || isNaN(durSeconds)) {
            newseek.dur_min = "00";
            newseek.dur_sec = "00";
            newseek.cur_min = "00";
            newseek.cur_sec = "00";
        }
        else {
            newseek.dur_min = durMinutes;
            newseek.dur_sec = durSeconds;
        }

        newseek.width = playProgress;
        setSeek(newseek);
        if (playProgress === 100) {
            setSeek({
                width: 0,
                cur_min: "00",
                cur_sec: "00",
                dur_min: "00",
                dur_sec: "00"
            });
            setPlay(false);
        }

    }

    const handleMouseOut = () => {
        if (snd_player.current) {
            const sHover = snd_player.current.querySelector(".s-hover");
            const insTime = snd_player.current.querySelector(".ins-time");
            insTime.textContent = "00:00";
            insTime.style.display = "none";
            sHover.style.width = 0;
        }

    };

    useEffect(() => {
        const timer = {
            buffering: ""
        };

        if (play) {
            const nTime = audio.currentTime;
            timer.buffering = setInterval(() => {

                if (nTime >= 0 && nTime === audio.currentTime) {
                    if (snd_player.current) {
                        snd_player.current.querySelector(".album-art").classList.add("buffering");
                        snd_player.current.querySelector(".track-time").classList.remove("active");
                    }
                }
                else {
                    if (snd_player.current) {
                        snd_player.current.querySelector(".album-art").classList.remove("buffering");
                        snd_player.current.querySelector(".track-time").classList.add("active");
                    }
                }

                if (audio && audio.paused) {
                    audio.play();
                }
            }, BUFFER_DELPAY);

        } else {
            if (snd_player.current)
                snd_player.current.querySelector(".album-art").classList.remove("buffering");
        }

        return () => clearInterval(timer.buffering);
    }, [play]);

    useEffect(() => {
        if (list.length) {
            audio.src = list[current].url;
                    
        }

        if (audio) {            
            audio.removeEventListener("timeupdate", timeupdate);
            audio.addEventListener("timeupdate", timeupdate);
            setAudio(audio);

            return () => {
                audio.removeEventListener("timeupdate", timeupdate);
            }
        }
    }, [list, current]);

    const playpause = useCallback(debounce(() => {
        if (!list.length) {
            return;
        }

        if (!play) {
            setPlay(true);
            if (audio)
                audio.play();
        }
        else {
            setPlay(false);
            if (audio)
                audio.pause();
        }

    }, DEBOUNCE_DELAY), [play, list]);

    function selectTrack(flag) {
        if (!list.length) {
            return;
        }

        let currIndex = current;
        if (flag === 1)
            ++currIndex;
        else
            --currIndex;

        currIndex = currIndex % list.length;

        SetCurrent(currIndex);

        setSeek({
            width: 0,
            currentTime: 0,
            cur_min: "00",
            cur_sec: "00",
            dur_min: "00",
            dur_sec: "00"
        });

        if (flag != 0) {
            setPlay(true);
        }
    }

    const playFromClickedPos = () => {

        const cM = currentTime;        
        let ctMinutes = Math.floor(cM);
        let ctSeconds = Math.floor((cM - ctMinutes) * 60);

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if (ctMinutes < 10)
            ctMinutes = '0' + ctMinutes;
        if (ctSeconds < 10)
            ctSeconds = '0' + ctSeconds;

        const newSeek = { ...seek };

        newSeek.cur_min = ctMinutes;
        newSeek.cur_sec = ctSeconds;

        if (audio) {
            audio.pause();
            audio.currentTime = parseInt(ctMinutes) * 60 + parseInt(ctSeconds);

            audio.play();
        }
        setSeek(newSeek);
        handleMouseOut();
    };

    useEventListener("mousemove", handleMouseOver, document.querySelector(`.sound-player-wrapper#${uuid} .s-area`));
    useEventListener("mouseout", handleMouseOut, document.querySelector(`.sound-player-wrapper#${uuid} .s-area`));

    return (
        <div className="sound-player-wrapper" ref={snd_player} id={uuid}>
            <div className="snd-player">
                <div className={play ? "player-track active" : "player-track"}>
                    <div className="album-name">{list.length && list[current].album}</div>
                    <div className="track-name">{list.length && list[current].track}</div>
                    <div className={play ? "track-time active" : "track-time"}>
                        <div className="current-time">{seek.cur_min + ":" + seek.cur_sec}</div>
                        <div className="track-length">{seek.dur_min + ":" + seek.dur_sec}</div>
                    </div>
                    <div className="s-area" onClick={() => { playFromClickedPos() }}>
                        <div className="ins-time"></div>
                        <div className="s-hover" ></div>
                        <div className="seek-bar" style={{ width: seek.width + "%" }}></div>
                    </div>
                </div>
                <div className="snd-player-content">
                    <div className={play ? "active album-art" : " album-art "}>
                        {list.length ? list.map((item, index) => (<img key={"art" + index} src={item.avatar} alt={item.track} className={item.url === list[current].url ? "active" : ""} />)) : (<div className="album-blank"></div>)
                        }
                        <div className="buffer-box">Buffering ...</div>
                    </div>

                    <div className="sound-player-controls">
                        {!list.length ? (<div className="lds-facebook"><div></div><div></div><div></div></div>) : (<>
                            <div className="control">
                                <div className="snd-button" id="play-previous" onClick={() => { selectTrack(-1) }}>
                                    <Icon name="backward" />
                                </div>
                            </div>
                            <div className="control">
                                <div className="snd-button" id="play-pause-button" onClick={() => { playpause() }}>
                                    {
                                        play ? (<Icon name="stop" />) : (<Icon name="play" />)
                                    }
                                </div>
                            </div>
                            <div className="control">
                                <div className="snd-button" id="play-next" onClick={() => { selectTrack(1) }}>
                                    <Icon name="forward" />
                                </div>
                            </div>
                        </>)}

                    </div>
                </div>
            </div>
        </div>
    );
}

function useEventListener(eventName, handler, element = window) {
    const savedHandler = useRef();
    useEffect(
        () => {
            savedHandler.current = handler;
        },
        [handler]
    );

    useEffect(
        () => {

            const isSupported = element && element.addEventListener;
            if (!isSupported) return;

            const eventListener = event => savedHandler.current(event);

            element.addEventListener(eventName, eventListener);

            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName, element]
    );
}

export default SoundPlayer;
