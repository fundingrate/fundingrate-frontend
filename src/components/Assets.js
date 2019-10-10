import React from 'react'

import Popular from '../assets/images/icons/icon_popular.svg'
import BestOffers from '../assets/images/icons/icon_offer.svg'
import Trusted from '../assets/images/icons/icon_trusted.svg'
import Play from '../assets/images/icons/icon_play.svg'
import Search from '../assets/images/icons/icon_search.svg'

import User from '../assets/images/icons/user.svg'
import Edit from '../assets/images/icons/edit.svg'
import Envelope from '../assets/images/icons/envelope.svg'
import Key from '../assets/images/icons/key.svg'

// processors
import Bitcoin from '../assets/images/processors/Bitcoin.svg'
import Mastercard from '../assets/images/processors/Mastercard.svg'
import PayPal from '../assets/images/processors/PayPal.svg'
import Visa from '../assets/images/processors/Visa.svg'

// import Logo from "../assets/images/P2P.svg";
// import Banner01 from "../assets/images/banner01.png";

// Social
import Twitter from '../assets/images/icons/twitter.svg'
// import Steam from '../assets/images/icons/steam.svg'
// import Twitch from '../assets/images/icons/twitch.svg'
import Telegram from '../assets/images/icons/telegram.svg'
import Github from '../assets/images/icons/github.svg'
import Discord from '../assets/images/icons/discord.svg'

import { Icon } from '../primitives'
import theme from '../styles/theme'

const mapAssets = tree => {
  return Object.keys(tree).reduce((memo, k) => {
    const _k = k.toLowerCase()
    const value = tree[k]
    const bg = Object.keys(theme.colors).includes(_k) ? _k : 'primary'

    if (typeof value === 'object') {
      memo[k] = mapAssets(value)
    } else {
      memo[k] = p => <Icon size={24} {...p} src={value} bg={bg} />
    }

    return memo
  }, {})
}

const sets = mapAssets({
  // Logo,
  Icons: {
    Popular,
    BestOffers,
    Trusted,
    Play,
    User,
    Envelope,
    Edit,
    Key,
    Search,
  },
  Processors: {
    Bitcoin,
    Mastercard,
    PayPal,
    Visa,
  },
  Banners: {
    // Banner01
  },
  Social: {
    Twitter,
    Telegram,
    Discord,
    Github,
  },
})

console.log(sets)

export default sets
