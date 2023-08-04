import { faChevronUp, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import TranslateContext from "../Context/TranslateContext";


function SelectLanguage({ text, setClickTarget, setClickSource }) {
    const { languages, setLanguageSource, setLanguageTarget, setNameLanguages, nameLanguages } = useContext(TranslateContext)

    const [search, setSearch] = useState("")

    useEffect(() => {

        let allLanguages = document.querySelectorAll(".language-item")

        { search.length != 0 && allLanguages.forEach((el) => !(el.innerText.toLowerCase().includes(search)) ? el.classList.add("no-search") : el.classList.remove("no-search")) }

    }, [search])
    const handleClick = () => {
        setClickSource != undefined && setClickSource(false)
        setClickTarget != undefined && setClickTarget(false)
    }
    const handleClickLanguage = (code) => {
        setClickSource != undefined ? setLanguageSource(code.code) : setLanguageTarget(code.code)
        setClickSource != undefined ? setNameLanguages({ ...nameLanguages, source: code.name }) : setNameLanguages({ ...nameLanguages, target: code.name })
        handleClick()
    }
    const handleChange = (e) => {
        setSearch((e.target.value).toLowerCase())
    }

    return (
        <section id="select-language" onClick={e => e.stopPropagation()}>
            <aside id="select-language-top">
                <button className="btn-language" onClick={handleClick}>
                    <span>{text} <FontAwesomeIcon icon={faChevronUp} /></span>
                </button>
                <button onClick={handleClick} className="btn-language">
                    <span>Cerrar</span>
                </button>
            </aside>
            <aside id="select-language-bottom">
                <div id="container-searchbar">
                    <FontAwesomeIcon id="lupa" icon={faMagnifyingGlass} /><input id="search" placeholder="Search a language" type="search" value={search} onChange={handleChange} />
                </div>
                <aside id="container-results">
                    {languages.length != 0 && languages.map((language) => <p className="language-item" onClick={() => handleClickLanguage({ code: language.code, name: language.name })} key={language.code}>{language.name}</p>)}
                </aside>
            </aside>
        </section>
    );
}

export default SelectLanguage;