import React from "react";

function Header() {
    const [isDay, setIsDay] = React.useState(false);
    const toggleDayNight = () => {
        setIsDay(!isDay);
        document.body.classList.toggle("day", !document.body.classList.contains("day"));
        document.body.classList.toggle("night", !document.body.classList.contains("night"));
    }

    return (
        <div className="page_header">
            <div className={`toggle ${isDay ? "day" : ""}`} id="toggle" onClick={toggleDayNight}/>
        </div>
    )
}

export default Header;