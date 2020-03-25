import { opacify, darken, lighten, linearGradient } from 'polished'

// const breakpoints = ['64em', '80em']
// const breakpoints = ['40em', '52em', '64em', '80em']
const breakpoints = [
  // "20em",
  "30em",
  "37.5em",
  "48em",
  "56.25em",
  "68.75em",
  "81.25em"
];

const space = [0, 4, 8, 16, 32, 64, 128, 160, 256, 512]

const colors = {
  subnavbg: '#434346',
  offwhite: '#f6f6f6',
  text: '#dcdcdc',
  subtext: '#979797',
  scrollbar: '#161a1f',
  scrollbarTrack: '#3E3E41',
  backingDark: '#2C2C2E',
  backingLight: '#38383C',
  red: '#e94c4c',
  green: '#42b142',
  icon: '#616162',
  offwhiteBorder: '#ececec',
  border: '#1b1b1b',
  blue: '#00aeef',
  yellow: '#ffd200',
  // #232a30
  // old
  white: '#fff',
  black: '#000',
  // orange: '#FB6C2B',
  orange: '#f78e1e',
  foregroundBacking: '#252B31',
  textOther: '#52565A',
  backing: '#191E23',
  darkBacking: '#171C20',
  consumer: '#B0C3D9',
  industrial: '#5E98D9',
  milspec: '#4B69FF',
  restricted: '#8847FF',
  classified: '#D32EE6',
  covert: '#EB4B4B',
  contraband: '#FFAE39',
  scarlet: '#DD4837',
  lightScarlet: lighten(0.04, '#DD4837'),
  lime: '#3DDD37',
  lightGray: lighten(0.3, '#808080'),
  get primary() {
    return this.orange
  },
  get lightPrimary() {
    return lighten(0.04, this.primary)
  },
  // get primaryGradient() {
  //   return linearGradient('290deg', '#f03c3c', '#ff7e24')
  // },
  get card() {
    return this.foregroundBacking
  },
  get lightCard() {
    return lighten(0.04, this.foregroundBacking)
  },
  twitter: '#1DA1F2',
  twitch: '#6441A4',
  discord: '#7289DA',
  discover: '#FF6000',
}

const colorStyles = {
  textOnPrimary: {
    color: colors.white,
    bgColor: colors.primary,
    bgColorHover: colors.lightPrimary,
  },
  //   textOnDark: {
  //     color: colors.gray,
  //     bgColor: colors.primary,
  //     bgColorHover: colors.lightPrimary
  //   }
}

const borders = {
  none: 'none',
  normal: '1px solid',
}

const radii = {
  normal: '3px',
  rounded: '6px',
  curved: '40px',
  circle: '50%',
}

const fontSizes = [
  '0.702rem',
  '0.79rem',
  '.889rem',
  '1rem',
  '1.125rem',
  '1.266rem',
  '1.424rem',
  '2.027rem',
  '2.566rem',
  '3.247rem',
]

const maxWidths = ['40em', '52em', '64em', '80em', '96em', '104em']

const letterSpacings = {
  normal: 0,
  slight: '.05em',
  title: '.1em',
  loose: '.25em',
}

const boxPadding = {
  small: {
    paddingTop: `${space[1]}px`,
    paddingBottom: `${space[1]}px`,
    paddingLeft: `${space[2]}px`,
    paddingRight: `${space[2]}px`,
  },
  medium: {
    paddingTop: `${space[2]}px`,
    paddingBottom: `${space[2]}px`,
    paddingLeft: `${space[3]}px`,
    paddingRight: `${space[3]}px`,
  },
  large: {
    paddingTop: `${space[3]}px`,
    paddingBottom: `${space[3]}px`,
    paddingLeft: `${space[4]}px`,
    paddingRight: `${space[4]}px`,
  },
}

const theme = {
  breakpoints,
  space,
  colors,
  colorStyles,
  borders,
  radii,
  fontSizes,
  maxWidths,
  letterSpacings,
  boxPadding,
}

export default theme
