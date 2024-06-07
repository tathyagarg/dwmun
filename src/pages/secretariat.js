import logo from '../assets/logo.png'
import Contact from '../components/contact'
import '../styles/secretariat.css'

function Secretariat() {
    return <div>
        <div className="secretariat">
            <h1 id="secretariat-heading">Secretariat</h1>
            <div className='letters'>
                <div id="sg">
                    <img src={logo}></img>
                    <div>
                        <h1>Letter from Secretary General</h1>
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
                <div id="dg">
                    <div>
                        <h1>Letter from Director General</h1>
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
                    <img src={logo}></img>
                </div>
            </div>
            <h1 className='oc-heading'>Organizing Committee</h1>
            <div className='oc'>
                <div className='oc-card'>
                    <h1>Logistics Head</h1>
                    <div className='image-placeholder-2'></div>
                    <p>Dhushyanth Gowda & Adhvik G Vijai</p>
                </div>
                <div className='oc-card'>
                    <h1>Head of Design</h1>
                    <div className='image-placeholder-2'></div>
                    <p>Devina Jha</p>
                </div>
                <div className='oc-card'>
                    <h1>Head of Tech</h1>
                    <div className='image-placeholder-2'></div>
                    <p>Tathya Garg</p>
                </div>
                <div className='oc-card'>
                    <h1>Head of Delegate Affairs</h1>
                    <div className='image-placeholder-2'></div>
                    <p>Jagath Singh Raja</p>
                </div>
            </div>
            <div className='image-placeholder'></div>
        </div>
        <Contact></Contact>
    </div>
}

export default Secretariat;