import '../styles/home.css'
import Contact from '../components/contact';
import Countdown from '../components/countdown';
import logo from '../assets/logo.webp';

const start_date = new Date('August 01, 2024 08:00:00').getTime();

function updateDate() {
    const current = new Date().getTime();

    const difference = start_date - current;

    const day_count = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours_count = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes_count = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    try {
        document.getElementById("days").textContent = ((day_count === 0) ? "0" : "") + ((day_count < 10) ? "0" : "") + day_count;
        document.getElementById("hours").textContent = ((hours_count === 0) ? "0" : "") + ((hours_count < 10) ? "0" : "") + hours_count;
        document.getElementById("minutes").textContent = ((minutes_count === 0) ? "0" : "") + ((minutes_count < 10) ? "0" : "") + minutes_count;
    } catch (err) {
        ;
    }
}


function Home() {
    new Promise(resolve => setTimeout(resolve, 1000)).then(updateDate);
    setInterval(updateDate, (1000 * 60))

    return <div>
        <section className="title">
            <img src={logo} className='dwmun-logo' style={{height: "40vh"}}></img>
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
        <section id='principal-letter-section'>
            <div id='principal-letter'>
                <h1>Letter from the Principal</h1>
                <div id='principal-letter-content'>
                    <div id='image-placeholder-3'></div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque eget magna sed laoreet. Vivamus pellentesque luctus sem vitae maximus. Aenean vehicula mollis mi sit amet ultricies. Curabitur fermentum dolor lacus, id malesuada lacus pellentesque sed. Suspendisse iaculis felis ac nibh aliquet aliquet. Curabitur vitae tincidunt enim. Nunc ultrices mauris a lacus commodo, dictum interdum nibh convallis.
                        <br></br>
                        <br></br>
                        Aliquam vitae dictum dolor. Sed semper neque ac justo egestas consectetur. Aliquam eget mauris laoreet ante hendrerit fermentum. In ornare nunc ut vestibulum ullamcorper. Curabitur dictum mollis leo, sit amet luctus elit tempor ut. Vestibulum dapibus sem et erat finibus, non porta ex hendrerit. Maecenas congue blandit pellentesque. Sed augue tortor, efficitur eu leo sed, congue varius magna. Sed ac tortor eget libero sollicitudin aliquam. Integer feugiat nunc in neque accumsan, euismod rutrum dolor sollicitudin. Phasellus semper lorem ac placerat malesuada. Sed aliquet imperdiet tellus elementum dignissim. Curabitur faucibus lectus urna, sed gravida tellus efficitur in. Nullam hendrerit turpis ut interdum venenatis. Praesent velit orci, maximus non augue ac, dignissim lobortis est.
                        <br></br>
                        <br></br>
                        Nunc congue, justo vel pellentesque lacinia, neque urna imperdiet mi, ut dictum turpis ipsum ac velit. Aliquam elementum vel arcu efficitur tincidunt. Fusce in efficitur felis, nec dictum tellus. Vestibulum vestibulum velit at leo tempus volutpat. Nunc felis lorem, ornare nec fermentum vel, consectetur sed orci. Fusce bibendum arcu a ante pellentesque, quis pharetra nulla bibendum. Integer facilisis mi a purus fringilla, vitae gravida ipsum volutpat. Quisque tempor sit amet sem vel pellentesque. Fusce commodo sed sem at viverra. Proin eget libero in enim aliquet condimentum. Maecenas dapibus purus at sem auctor condimentum. Pellentesque consequat vestibulum arcu. Aenean ac malesuada ex. Vestibulum a lobortis massa. Duis non nibh non ex suscipit convallis. Proin porttitor mi sed ligula dictum, sed mollis nulla interdum.
                    </p>
                </div>
            </div>
        </section>
        <Countdown></Countdown>
        <Contact></Contact>
    </div>
}

export default Home;