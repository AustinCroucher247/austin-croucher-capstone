import React from "react";
import Preview from "./Preview";
import '.././ActivePacMan.scss'


const Previews = ({ tetriminoes }) => {
    const previewTetrominoes = tetriminoes
        .slice(1 - tetriminoes.length)
        .reverse();


    return (

        <>
            {previewTetrominoes.map((tetrimino, index) => (
                <Preview tetrimino={tetrimino} index={index} key={index} />
            ))}
        </>
    )

}

export default React.memo(Previews);

