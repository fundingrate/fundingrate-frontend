export default {
    init(state,props){
      console.log('init', state, props)
      return {
        ...state,
        ...props
      }
    },
    setConnected(state, b=false) {
      return {
        ...state,
        connected: b
      }
    },
    logout(state,props){
      window.localStorage.removeItem('token')
      window.location='/'
      return state
    },
    showError(state,props){
          if(props){
              console.log('error',props)
              return {
                  ...state,
                  error: props.message || props
              }
          }
          return {
              ...state,
              error:props,
          }
    },
    showSuccess(state,props){
      return {...state,success:props}
    },
    object(state,name,data,method='set'){
      return {
        ...state,
        [name]:data
      }
    },
    setAuth(state,{tokenid,userid}){
      return {
        ...state,
        token:tokenid,
      }
    },
    setState(state,update,channels){
  
      update = channels.reduce((result,channel)=>{
        result = {
          ...result,
          ...update[channel]
        }
        return result
      },{})
  
      return {
        ...state,
        ...update,
        // [channel]:{...update},
      }
    },
    setCategory(state,category){
      if(category === state.category){
        category = null
      }
      return {
        ...state,
        category,
      }
    },
  }
  