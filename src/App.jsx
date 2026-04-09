import Hero from './components/Hero/Hero'
import EventDetails from './components/EventDetails/EventDetails'
import RSVPForm from './components/RSVP/RSVPForm'
import Footer from './components/Footer/Footer'

export default function App() {
  return (
    <main>
      <Hero />
      <EventDetails />
      <RSVPForm />
      <Footer />
    </main>
  )
}
