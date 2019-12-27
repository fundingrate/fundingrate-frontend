import reducers from './reducers'
import React,{useState,useEffect} from 'react'
import Wiring from 'react-wiring'

export const [useWiring,store] = Wiring(React,reducers)
