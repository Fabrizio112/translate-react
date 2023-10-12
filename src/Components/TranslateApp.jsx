import { faArrowRightArrowLeft, faChevronDown, faVolumeHigh, faXmark } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectLanguage from "./SelectLanguage";
import { useContext, useState } from "react";
import TranslateContext from "../Context/TranslateContext";
import { useRef } from "react";

function TranslateApp() {
    const [clickSource, setClickSource] = useState(false)
    const [clickTarget, setClickTarget] = useState(false)
    const [voice, setVoice] = useState(null)



    const handleClickButtonLeft = () => {
        clickSource ? setClickSource(false) : setClickSource(true)
    }
    const handleClickButtonRight = () => {
        clickTarget ? setClickTarget(false) : setClickTarget(true)
    }
    const { textToTranslate, setTextToTranslate, textTranslated, setTextTranslated, nameLanguages, setNameLanguages, languageSource, setLanguageSource, languageTarget, setLanguageTarget, voiceSourceCompatible, voiceTargetCompatible, setVoiceSourceCompatible, setVoiceTargetCompatible } = useContext(TranslateContext)

    const handleChange = (e) => {
        setTextToTranslate(e.target.value)
    }
    const handleChangeLanguage = () => {
        if (nameLanguages.source || nameLanguages.target) {
            setLanguageSource(languageTarget)
            setLanguageTarget(languageSource)
            setNameLanguages({ source: nameLanguages.target, target: nameLanguages.source })

        }
    }
    const handleClickMarkIcon = () => {
        setTextToTranslate("")
        setTextTranslated("")
    }
    const refAudio = useRef()

    const handleVoice = (text, language) => {
        const url = `https://text-to-speech-api3.p.rapidapi.com/speak?text=${text}&lang=${language}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '1cdc29d1fbmsh8c7f4b7d7ca48d8p1e78ddjsn2f86475e8467',
                'X-RapidAPI-Host': 'text-to-speech-api3.p.rapidapi.com'
            }
        };
        fetch(url, options)
            .then(res => res.blob())
            .then(json => {
                refAudio.current.src = URL.createObjectURL(json)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <>
            <audio src="" ref={refAudio} autoPlay />
            <section id="translate-app">
                <h1>Translate App</h1>
                <section id="translate-container">
                    <section id="translate-container-languages">
                        <div id="translate-container-languages-left">
                            <button onClick={handleClickButtonLeft} className="btn-language">
                                <span>{nameLanguages.source ? nameLanguages.source : "Select a language "}<FontAwesomeIcon icon={faChevronDown} /></span>
                                {clickSource && <SelectLanguage text="Select Source Language" setClickSource={setClickSource} />}
                            </button>
                        </div>
                        <div id="translate-container-languages-half" onClick={handleChangeLanguage}>
                            <button className="btn-language"><FontAwesomeIcon className="icon" icon={faArrowRightArrowLeft} size="2x" /></button>
                        </div>
                        <div id="translate-container-languages-right">
                            <button onClick={handleClickButtonRight} className="btn-language">
                                <span>{nameLanguages.target ? nameLanguages.target : "Select a language "} <FontAwesomeIcon icon={faChevronDown} /></span>
                                {clickTarget && <SelectLanguage text="Select Target Language" setClickTarget={setClickTarget} />}
                            </button>
                        </div>
                    </section>
                    <section id="translate-container-boxes">
                        <aside id="translate-container-boxes-left" >
                            <TextareaAutosize value={textToTranslate} onChange={handleChange} name="" id="area-translate" />
                            {(textToTranslate.length != 0) && <FontAwesomeIcon icon={faXmark} size="lg" onClick={handleClickMarkIcon} className="x-mark" />}
                            {(voiceSourceCompatible && textToTranslate) && <FontAwesomeIcon icon={faVolumeHigh} size="lg" className="audio" onClick={() => handleVoice(textToTranslate, languageSource)} />}
                        </aside>
                        <aside id="translate-container-boxes-right">
                            <TextareaAutosize value={textTranslated ? textTranslated : ""} name="" id="area-translate" disabled />
                            {(voiceTargetCompatible && textTranslated) && <FontAwesomeIcon icon={faVolumeHigh} size="lg" onClick={() => handleVoice(textTranslated, languageTarget)} className="audio" />}
                        </aside>
                    </section>
                </section>

            </section>

        </>
    );
}

export default TranslateApp;


/*Aplicacion que tenga 2 recuadros , uno para escribir lo que se desea traducir y otro para mostrar lo traducido 
Un select para cada recuadro para elegir el idioma a traducir , un boton para cambiar el idioma por el contrario
Y un narrador para cualquier idioma disponible
Un boton para copiar en el portapales

Primero que nada se va a traer la lista con los idiomas y no se los va a poner en un select , por que es bien feito
Una barra de busqueda para filtrar los resultados del idioma 
Segundo se va  a seleccionar los idiomas y tercero ,se va a escribir lo que se desea traducir
Ponerl limite de caracteres para traducir
*/