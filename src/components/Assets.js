import React from 'react'

// Social
import Twitter from '../assets/images/icons/twitter.svg'
import Telegram from '../assets/images/icons/telegram.svg'
import Github from '../assets/images/icons/github.svg'
import Discord from '../assets/images/icons/discord.svg'
import ChipsLogoLight from '../assets/images/logos/chips_light.png'

import Logos from '../assets/images/logos/*.svg'
import Icons from '../assets/images/icons/*.svg'
import Processors from '../assets/images/processors/*.svg'

import { Box, Icon, Image } from '../primitives'
import theme from '../styles/theme'

const mapAssets = tree => {
  return Object.keys(tree).reduce((memo, k) => {
    const _k = k.toLowerCase()
    const value = tree[k]
    const bg = Object.keys(theme.colors).includes(_k) ? _k : 'primary'

    if (typeof value === 'object') {
      memo[k] = mapAssets(value)
    } else {
      memo[k] = p => <Icon size={28} bg={bg} {...p} src={value} />
    }

    return memo
  }, {})
}

const sets = mapAssets({
  // Logo,
  Processors,
  Icons: {
    Linux: Icons.linux,
    Close: Icons.times,
    Popular: Icons.icon_popular,
    BestOffers: Icons.icon_offer,
    Trusted: Icons.icon_trusted,
    Play: Icons.icon_play,
    User: Icons.user,
    Envelope: Icons.envelope,
    Edit: Icons.edit,
    Key: Icons.key,
    Search: Icons.icon_search,
    Help: Icons.concierge_bell,
    Signup: Icons.address_card,
    Login: Icons.sign_in_alt,
  },
  Social: {
    Twitter,
    Telegram,
    Discord,
    Github,
  },
})

sets.Logos = {
  MainLogoWhite: p => (
    <Image
      src={Logos.color_logo_transparent}
      width={240}
      height={40}
      backgroundSize="180%"
    />
  ),
  Chips: p => (
    <Image src={ChipsLogoLight} width={200} height={32} backgroundSize="100%" />
  ),
}

export default sets
