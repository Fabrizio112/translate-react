import { useState } from "react";
import { createContext, useEffect } from "react";


const TranslateContext = createContext()

const TranslateProvider = ({ children }) => {

    const [textToTranslate, setTextToTranslate] = useState("")
    const [textTranslated, setTextTranslated] = useState(null)

    const [languageSource, setLanguageSource] = useState("")
    const [languageTarget, setLanguageTarget] = useState("")

    const [nameLanguages, setNameLanguages] = useState({})
    const [languages, setLanguages] = useState([])


    const [voiceSourceCompatible, setVoiceSourceCompatible] = useState(false)
    const [voiceTargetCompatible, setVoiceTargetCompatible] = useState(false)


    const supportVoices = {
        af: "af",
        sq: "sq",
        ar: "ar",
        bn: "bn",
        bg: "bg",
        my: "my",
        ca: "ca",
        zh: "zh",
        hr: "hr",
        cs: "cs",
        da: "da",
        nl: "nl",
        en: "en",
        eo: "eo",
        et: "et",
        tl: "tl",
        fi: "fi",
        fr: "fr",
        de: "de",
        el: "el",
        gu: "gu",
        ht: "ht",
        iw: "iw",
        hi: "hi",
        hu: "hu",
        is: "is",
        id: "id",
        it: "it",
        ja: "ja",
        jw: "jw",
        kn: "kn",
        km: "km",
        ko: "ko",
        lo: "lo",
        la: "la",
        lv: "lv",
        lt: "lt",
        mk: "mk",
        ml: "ml",
        mt: "mt",
        mr: "mr",
        ne: "ne",
        no: "no",
        or: "or",
        ps: "ps",
        fa: "fa",
        pl: "pl",
        pt: "pt",
        pa: "pa",
        ro: "ro",
        ru: "ru",
        sr: "sr",
        sk: "sk",
        sl: "sl",
        so: "so",
        es: "es",
        su: "su",
        sw: "sw",
        sv: "sv",
        tl: "tl",
        ta: "ta",
        te: "te",
        th: "th",
        tr: "tr",
        uk: "uk",
        ur: "ur",
        uz: "uz",
        vi: "vi",
        cy: "cy",
        yi: "yi",
        yo: "yo",
    };

    useEffect(() => {
        { languageSource && Object.values(supportVoices).forEach(voz => voz === languageSource && setVoiceSourceCompatible(true)) }

    }, [languageSource])

    useEffect(() => {
        { languageTarget && Object.values(supportVoices).forEach(voz => voz === languageTarget && setVoiceTargetCompatible(true)) }

    }, [languageTarget])


    useEffect(() => {
        const url = 'https://text-translator2.p.rapidapi.com/getLanguages';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '912ed96bd2msh8744e85583e08cep145e10jsn65fe4d870f31',
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            }
        };
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setLanguages(json.data.languages)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        if (languageSource.length != 0 && languageTarget.length != 0 && textToTranslate) {
            const url = 'https://text-translator2.p.rapidapi.com/translate';
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': '912ed96bd2msh8744e85583e08cep145e10jsn65fe4d870f31',
                    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
                },
                body: new URLSearchParams({
                    source_language: `${languageSource}`,
                    target_language: `${languageTarget}`,
                    text: `${textToTranslate}`
                })
            };
            fetch(url, options)
                .then(res => res.json())
                .then(json => {
                    setTextTranslated(json.data.translatedText)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [textToTranslate])




    const data = { textToTranslate, setTextToTranslate, setTextTranslated, textTranslated, languages, setLanguageSource, languageSource, languageTarget, setLanguageTarget, nameLanguages, setNameLanguages, voiceSourceCompatible, setVoiceSourceCompatible, voiceTargetCompatible, setVoiceTargetCompatible }
    return (
        <TranslateContext.Provider value={data}>{children}</TranslateContext.Provider>
    )
}


export default TranslateContext
export { TranslateProvider }