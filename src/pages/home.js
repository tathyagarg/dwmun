import '../styles/home.css'

const start_date = new Date('August 01, 2024 08:00:00').getTime();

function updateDate() {
    const current = new Date().getTime();

    const difference = start_date - current;

    const day_count = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours_count = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes_count = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("date").textContent = day_count + " days " + hours_count + " hours " + minutes_count + " minutes";
}

new Promise(resolve => setTimeout(resolve, 1000)).then(updateDate);

function Home() {
    setInterval(updateDate, (1000 * 60))

    return <div>
        <section className="title">
            {/* change to img vvv */}
            <div className="image-placeholder">
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
                    <ul>
                        <li><h2>About</h2></li>
                        <li><h1>Delhi Public School Whitefield</h1></li>
                        <li><h1>Model United Nations</h1></li>
                    </ul>
                </div>
                <p style={{width: "100%"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a dapibus risus. Praesent non semper tellus, eget eleifend risus. Pellentesque vulputate elit vel tempor condimentum. Sed eleifend, lectus a auctor egestas, ligula massa ultricies leo, ut placerat massa libero malesuada metus. Donec pharetra lorem sit amet maximus hendrerit. Proin lobortis convallis eros, vel rutrum dui suscipit quis. Fusce felis odio, rutrum ac risus ut, congue semper dolor.
                </p>
            </div>
        </section>
        <section className="countdown">
            <h1>
                BIGGER. BETTER. BRIGHTER.
            </h1>
            <p>
                The conference starts in:
            </p>
            <h2 id="date"></h2>
        </section>
    </div>
}

export default Home;