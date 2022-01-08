import './css/App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div style={{margin: 30, background: "#f6f6f6", color: "#282c34", borderRadius: 5}}>
                    <div className={"flexCards centerCards"} style={{margin: 20}}>
                        <Body />
                        <Image />
                    </div>
                    <div style={{maxWidth: "90%", margin: "auto"}}>
                        <Languages />
                    </div>
                    <br/>
                </div>
            </header>
        </div>
    );
}

function Body() {
    return <div style={{margin: "auto", padding: 2, textAlign: "center"}}>
        <h1>SANDERC.NET</h1>
        <h4>A <span style={{color: "red"}}>❤</span> for coding</h4>
    </div>
}

function Languages() {
    const other = ["Kotlin", "R", "C", "PHP"]
    const analysis = ["Python", "R"]
    const html = ["HTML", "CSS", "SASS", "Bootstrap",]
    const java = ["Java", "JavaFX", "Spring"]
    const csharp = ["C#", "ASP.NET", "MVC", "API", "Blazor"]
    const js = ["JavaScript", "npm", "TypeScript", "ReactJS", "Angular"]
    const sql = ["SQL", "PL/SQL"]
    const management = ["Docker", "Git"]
    const languages = [csharp, java, js, sql, html, analysis, management, other]
    return <>{languages.map(a => (<div key={a[0]}>
            <hr />
            <p style={{margin: "5px"}}>{a.join(", ")}</p>
        </div>
    ))}</>
}

function Image() {
    return <img height={200} src={"./img/avatar.png"} alt={"me"} style={{margin: "10px 30px", borderRadius: 10, boxShadow: "3px 3px 3px rgb(0,0,0,0.2)"}} />
}

export default App;
