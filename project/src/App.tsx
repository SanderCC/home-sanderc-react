import './css/App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div style={{margin: 30, background: "#f6f6f6", color: "#282c34", borderRadius: 5}}>
                    <div className={"flexCards"} style={{margin: 20}}>
                        <Body />
                        <Image />
                    </div>
                </div>
            </header>
        </div>
    );
}

function Body() {
    return <div>
        <h1>SANDERC.NET</h1>
        <h3>Sander Constantin</h3>
    </div>
}

function Image() {
    return <div style={{padding: 30, marginLeft: 20}}>
        <img height={200} src={"./img/avatar.png"} alt={"me"} style={{borderRadius: 10, boxShadow: "3px 3px 3px rgb(0,0,0,0.2)"}} />
    </div>
}

export default App;
