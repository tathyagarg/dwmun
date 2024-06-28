import ContactUs from '../components/contact'

export default function ThankYou() {
    return <div>
        <div className='thank-you-page'>
            <h1 className='header'>Thank You!</h1>
            <h2>You have been registered for DWMUN'24!</h2>
        </div>
       <ContactUs></ContactUs>
    </div>
}