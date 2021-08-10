import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import SoundPlayer from "./index";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders without list or with lists", () => {
    const sounds = [];

    act(() => {
        render(< SoundPlayer list={sounds}
        />, container);
    });

    expect(container.querySelector(".snd-player-content .lds-facebook").textContent).toBe("");

    const sounds2 = [{
        "album": "Amanecer",
        "avatar": "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Amanecer_album_cover.jpg/220px-Amanecer_album_cover.jpg",
        "track": "Bomba Estereo - To My Love",
        "url": "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3"
    },
    {
        "album": "Me & You",
        "avatar": "http://k003.kiwi6.com/hotlink/ifpd9xk6n4/2.jpg",
        "track": "Alex Skrindo - Me & You",
        "url": "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/2.mp3"
    }
    ];

    act(() => {
        render(< SoundPlayer list={sounds2}
        />, container);
    });

    expect(container.querySelectorAll(".snd-player-content .album-art img").length).toBe(2);
});