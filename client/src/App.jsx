import Gallery from './components/gallery/gallery'
import LeftBar from './components/leftBar/leftBar'
import TopBar from './components/topBar/topBar'

const App = () => {
  return (
    <div className='w-full flex gap-4 max-md:gap-2 max-sm:gap-0'>
      <LeftBar/>
      <div className="flex-1 mr-4 max-md:mr-2 max-sm:mr-0 max-sm:px-2">
        <TopBar/>
        <Gallery/>
      </div>
    </div>
  )
}

export default App