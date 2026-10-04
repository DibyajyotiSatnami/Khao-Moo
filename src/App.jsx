import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Featured from './components/Featured.jsx'
import Story from './components/Story.jsx'
import Menu from './components/Menu.jsx'
import Order from './components/Order.jsx'
import Gallery from './components/Gallery.jsx'
import Instagram from './components/Instagram.jsx'
import Reviews from './components/Reviews.jsx'
import Reservation from './components/Reservation.jsx'
import Visit from './components/Visit.jsx'
import Footer from './components/Footer.jsx'
import MobileActionBar from './components/MobileActionBar.jsx'
import Lightbox from './components/Lightbox.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Marquee />
        <Featured />
        <Story />
        <Menu />
        <Order />
        <Gallery />
        <Instagram />
        <Reviews />
        <Reservation />
        <Visit />
      </main>
      <Footer />
      <MobileActionBar />
      <Lightbox />
    </>
  )
}
