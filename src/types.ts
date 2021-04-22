import rootReducer from './modules/index'
 
export interface EntrieType {
       data: { 
          id: number
          date: string
          catagorie: string
          userId: number
          amount: number
       }
 }
export interface UserType {  
    data: {  
       id: number
       username: string
       email: string
       password: string  
    }     
    token?: string 
}
export interface UserSingleType {   
       id?: number
       username?: string
       email?: string
       password?: string      
}
export interface EntrySingleType {   
   id?: number
   date: string
   catagorie: string
   userId: number
   amount: number      
}

type RootReducer = typeof rootReducer

export type RootStore = ReturnType<RootReducer>