import React, {useEffect, useState} from "react";
import {GameHeading, Sprite} from "./Game.styles";

export const Game: React.FC = () => {
    const [top, setTop] = useState(40);
    const [left, setLeft] = useState(20);

    //This runs only once when the component first renders.
    useEffect(() => {
        document.addEventListener('keydown',handleButtonPress);
    },[]);

    const handleButtonPress = (e: KeyboardEvent) => {
        switch (e.key) {
            case "ArrowUp": moveUp();
            break;
            case "ArrowDown": moveDown();
            break;
            case "ArrowLeft": moveLeft();
            break;
            case "ArrowRight": moveRight();
            break;
        }
    }

    const moveUp = () => {
        setTop(state => state - 20);
    }

    const moveDown = () => {
        setTop(state => state + 20);
    }

    const moveLeft = () => {
        setLeft(state => state - 20);
    }

    const moveRight = () => {
        setLeft(state => state + 20);
    }

    return (
        <>
            <GameHeading>This is the game screen</GameHeading>
            <Sprite left={`${left}%`} top={`${top}%`} />
        </>
    );
}
