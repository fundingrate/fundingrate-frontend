import Home from './Home'
import Authenticate from './Authenticate'
import Profile from './Profile'
import Wallet from './Wallet'
import NotFound from './NotFound'
import Providers from './Providers'
// import Marketplace from './Marketplace'

export default {
  Home,
  Authenticate,
  Profile,
  // Wallet,
  'My Providers': Providers,
  // Marketplace,

  // NOTE: default if no match above.
  NotFound,
}
