function TitleBar({ firstText, secText, className, color = 'text-sec' }) {
    return (
        <h1 className={`uppercase ${className}`}>
            <span className={color}>{firstText}</span>
            <span> {secText}</span>
            <span className={`${color} font-extrabold tracking-tight`}> ________</span>
        </h1>
    )
}
export default TitleBar