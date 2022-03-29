export type Location = {
  id?: number
  name?: string
  type?: string
  dimension?: string
  residents?: [Character]
  created?: string
}

export type Locations = {
  info?: Info
  results?: [Location]
}

export type Character = {
  id?: number
  name?: string
  status?: string
  species?: string
  type?: string
  gender?: string
  origin?: Location
  location?: Location
  image?: string
  episode?: [Episode]
  created?: string
}
  
export type Characters = {
  info?: Info
  results?: [Character]
}

export type Episode = {
  id?: number
  name?: string
  air_date?: string
  episode?: string
  characters?: [Character]
  created?: string
}

export type Episodes = {
  info?: Info
  results?: [Episode]
}

export type Info = {
  count?: number
  pages?: number
  next?: number
  prev?: number
}

export type FilterCharacter = {
  name?: string
  status?: string
  species?: string
  type?: string
  gender?: string
}