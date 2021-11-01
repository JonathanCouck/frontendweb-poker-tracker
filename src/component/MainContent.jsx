import Tournaments from './tournaments/Tournaments';
import Cashgames from './cashgames/Cashgames';

export default function MainContent({user, tournaments=[], cashgames=[]}) {
  return (
    <div className="text-white text-left bg-blue h-screen p-5" >
      <div>
       <Tournaments tournaments={tournaments} user={user} />
      </div>
      <div>
        <Cashgames cashgames={cashgames} user={user} />
      </div>
    </div>
  )
}