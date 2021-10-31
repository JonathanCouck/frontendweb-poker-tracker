import Tournaments from './tournaments/Tournaments';
import Cashgames from './cashgames/Cashgames';
import CASHGAME_DATA from '../mock_data/cashgame_mock';
import TOURNAMENT_DATA from '../mock_data/tournament_mock';

export default function MainContent(props) {
  const {user} = props
  return (
    <div className="text-white text-left bg-blue h-screen" >
      <div>
        Tournaments of {user.first_name+" "+user.last_name}: 
       <Tournaments tournaments={TOURNAMENT_DATA} user={user} />
      </div>
      <div>
        Cashgames of {user.first_name+" "+user.last_name}: 
        <Cashgames cashgames={CASHGAME_DATA} user={user} />
      </div>
    </div>
  )
}