import '../styles/resources.css'
import Contact from '../components/contact.js'
import CodeOfConduct from '../assets/DWMUN\'24\ Code\ of\ Conduct.pdf'
import Itinerary from '../assets/Itinerary.pdf'

export default function Resources() {
    return (<div>
        <div className="delegate-resources-container">
            <h1 className="header">Delegate Resources</h1>
            <div className='resources-parent'>
                <h1 className='subhead'>Committee Information</h1>
                <div className='resources'>
                    <div>
                        <h1>Committee X</h1>
                        <a href='https://docs.google.com/spreadsheets/d/e/2PACX-1vTkwWKYZ9zowk2fsNEyyEbD7xAhUR5sEFBC7oQdl8FL4p53SNfBggNG6Cyxw4b2h2R86Dwbj99yiWnP/pubhtml?gid=655421433&single=true'>Matrix</a>
                        {/* <a>Background Guide</a> */}
                    </div>
                    <div>
                        <h1>CCC</h1>
                        <a href='https://docs.google.com/spreadsheets/d/e/2PACX-1vTkwWKYZ9zowk2fsNEyyEbD7xAhUR5sEFBC7oQdl8FL4p53SNfBggNG6Cyxw4b2h2R86Dwbj99yiWnP/pubhtml?gid=90685736&single=true'>Matrix</a>
                        <a href='https://drive.google.com/file/d/1RfJqxpWjeQOz5ojEdR_OqPjxIcAyZj0G/view?usp=sharing'>Background Guide</a>
                    </div>
                    <div>
                        <h1>DISEC</h1>
                        <a href='https://docs.google.com/spreadsheets/d/e/2PACX-1vTkwWKYZ9zowk2fsNEyyEbD7xAhUR5sEFBC7oQdl8FL4p53SNfBggNG6Cyxw4b2h2R86Dwbj99yiWnP/pubhtml?gid=1768273203&single=true'>Matrix</a>
                        <a href='https://drive.google.com/file/d/1IQH1PZ2kjPbXrIsS61mV7wmAQYJpOcpP/view?usp=sharing'>Background Guide</a>
                    </div>
                    <div>
                        <h1>IPC</h1>
                        <a href='https://docs.google.com/spreadsheets/d/e/2PACX-1vTkwWKYZ9zowk2fsNEyyEbD7xAhUR5sEFBC7oQdl8FL4p53SNfBggNG6Cyxw4b2h2R86Dwbj99yiWnP/pubhtml?gid=1791090009&single=true'>Matrix</a>
                        <a href='https://drive.google.com/file/d/1aiZdy-yYUgCJKJbm45NPU5Q9izujE8GU/view?usp=sharing'>Background Guide</a>
                    </div>
                    <div>
                        <h1>Lok Sabha</h1>
                        <a href='https://docs.google.com/spreadsheets/d/e/2PACX-1vTkwWKYZ9zowk2fsNEyyEbD7xAhUR5sEFBC7oQdl8FL4p53SNfBggNG6Cyxw4b2h2R86Dwbj99yiWnP/pubhtml?gid=785812940&single=true'>Matrix</a>
                        <a href='https://drive.google.com/file/d/1Y0Vj9nkSv0AolAbmspZX6bkQUpjfCKfW/view?usp=sharing'>Background Guide</a>
                    </div>
                    <div>
                        <h1>UNHRC</h1>
                        <a href='https://docs.google.com/spreadsheets/d/e/2PACX-1vTkwWKYZ9zowk2fsNEyyEbD7xAhUR5sEFBC7oQdl8FL4p53SNfBggNG6Cyxw4b2h2R86Dwbj99yiWnP/pubhtml?gid=754926755&single=true'>Matrix</a>
                        <a href='https://drive.google.com/file/d/1zFJP41FwxHAyz65UJKTFRIbPB9e9n9HW/view?usp=sharing'>Background Guide</a>
                    </div>
                    <div>
                        <h1>UNSC</h1>
                        <a href='https://docs.google.com/spreadsheets/d/e/2PACX-1vTkwWKYZ9zowk2fsNEyyEbD7xAhUR5sEFBC7oQdl8FL4p53SNfBggNG6Cyxw4b2h2R86Dwbj99yiWnP/pubhtml?gid=212126292&single=true'>Matrix</a>
                        <a href='https://drive.google.com/file/d/1cTm6YDnyGOKjox335_2a9i58v8bSzGit/view?usp=sharing'>Background Guide</a>
                    </div>
                </div>
                <h1 className='subhead'>Conference Information</h1>
                <div class="conf-info">
                    <a id="coc" href={CodeOfConduct} target='_blank'>Code Of Conduct</a>
                    <a id="iti" href={Itinerary} target='_blank'>Itinerary</a>
                </div>
            </div>
        </div>
        <Contact></Contact>
    </div>)
}