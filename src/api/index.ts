import axios from 'axios'
import { EntrieType, UserType, UserSingleType } from "../types"


type TokenType = string
type AuthDataType = {
    data: Array<UserType>
    token: string
}
type AuthEntrieDataType = {
    data: Array<EntrieType>
    token: string
}

type ApiAuthType = {
   data:  {
      data: UserSingleType
      token: string
   }
   
  [propName: string]: any
}
type ApiEntryType = {
   data:  EntrieType
  [propName: string]: any
}

export const ApiEntries = {    
    fetchEntries(userId: number, date: string): Promise<AuthEntrieDataType> {
      return axios.get(`https://budget-el.herokuapp.com/entries/get/?userId=${userId}&date=${date}`)
    },

    createEntry( entrie: EntrieType): Promise<ApiEntryType> {
      return axios.post('https://budget-el.herokuapp.com/entries/create', entrie)
    },

    updateEntry( entrie: EntrieType): Promise<ApiEntryType> {
        return axios.put(`https://budget-el.herokuapp.com/entries/update`, entrie)
    },

    deleteEntries(id: number): Promise<boolean> {
        return axios.delete(`https://budget-el.herokuapp.com/entries/delete/?id=${id}`)
    }
}

export const ApiAuth = {
  _token: null,
  isLoggedIn() {
    return !!this._token;
  },
  _storeTokenToAxios(token: TokenType) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  },

  setToken(token: any) {
    this._token = token
    this._storeTokenToAxios(token)
  },

  init() {
      try {
         const token = window.localStorage.getItem('token')
         this.setToken(token)
      } catch (error) {
        console.log('NOT FOUND TOKEN');
        console.log(error);

      }  
      return this._token
  },

  register(user: UserSingleType): Promise<ApiAuthType> {
    return axios.post(`https://budget-el.herokuapp.com/auth/register`, user )
  },

  login(user: UserSingleType): Promise<ApiAuthType> {
    return axios.post(`https://budget-el.herokuapp.com/auth/login`, user)
  },
  logout() {
     window.localStorage.removeItem("token")
    this.setToken(null)
    return false
  }
}

export const ApiAccount = {
  get(): Promise<UserType> {
    return axios.get('https://budget-el.herokuapp.com/account')
  },
}