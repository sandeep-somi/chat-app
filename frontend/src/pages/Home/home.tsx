import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';

const Home = () => {
  return (
    <div className="flex h-screen">
      <div className="flex w-full shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <div className='w-1/4 border-r border-slate-400 min-w-80'>
          <Sidebar />
        </div>
        <div className='w-3/4'>
          <MessageContainer />
        </div>
      </div>
    </div>
  )
}

export default Home