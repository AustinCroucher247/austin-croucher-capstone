import React from "react";
import Preview from "./Preview";
import '.././ActiveTetris.scss'


const Previews = ({ tetriminoes }) => {
    const previewTetriminoes = tetriminoes
        .slice(1 - tetriminoes.length)
        .reverse();


    return (

        <>
            {previewTetriminoes.map((tetrimino, index) => (
                <Preview tetrimino={tetrimino} index={index} key={index} />
            ))}
        </>
    )

}

export default React.memo(Previews);

