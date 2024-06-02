import '../styles/home.css'

function Home() {
    return <div>
        <section className="title">
            {/* change to img vvv */}
            <div style={{backgroundColor: "green", height: "40%", width: "40%"}}>
                LOGO
            </div>
            <div className="header">
                <h1>D</h1>
                <h1>W</h1>
                <h1>M</h1>
                <h1>U</h1>
                <h1>N</h1>
                <h1>2</h1>
                <h1>4</h1>
            </div>
            <p>The 6th Edition</p>
        </section>
        <section className="about">
            <div className="about-div">
                <div className="about-heading">
                    <div className="quote-block"></div>
                    <ul>
                        <li><h2>About</h2></li>
                        <li><h1>Delhi Public School Whitefield</h1></li>
                        <li><h1>Model United Nations</h1></li>
                    </ul>
                </div>
                <p style={{maxWidth: "100%"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a dapibus risus. Praesent non semper tellus, eget eleifend risus. Pellentesque vulputate elit vel tempor condimentum. Sed eleifend, lectus a auctor egestas, ligula massa ultricies leo, ut placerat massa libero malesuada metus. Donec pharetra lorem sit amet maximus hendrerit. Proin lobortis convallis eros, vel rutrum dui suscipit quis. Fusce felis odio, rutrum ac risus ut, congue semper dolor.
                </p>
            </div>
        </section>
        <section className="committees">

        </section>
    </div>
}

export default Home;