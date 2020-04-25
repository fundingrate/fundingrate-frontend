import Home from './Home'
import Authenticate from './Authenticate'
import Profile from './Profile'
import Wallet from './Wallet'
import NotFound from './NotFound'
import Providers from './Providers'
import Marketplace from './Marketplace'
import Documentation from './Documentation'

export default {
  Home,
  Marketplace,
  Authenticate,
  Profile,
  // Wallet,
  'My Providers': Providers,
  'API Documentation' : Documentation,
  // NOTE: default if no match above.
  NotFound,
}
