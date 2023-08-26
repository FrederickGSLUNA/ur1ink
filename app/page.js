import Form from './components/Form'
import NavBar from './components/NavBar'

export default function Home () {
  return (
    <main data-theme="default" className='min-h-screen h-screen overflow-hidden flex flex-col'>
      <NavBar/>
      <section className='flex flex-grow justify-center items-center flex-col lg:flex-row h-full'>
        <Form/>
      </section>
    </main>
  )
}
