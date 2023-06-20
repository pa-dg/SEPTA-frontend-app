export interface RawStationInfo {
  Northbound?: StationInfo[]
  Southbound?: StationInfo[]
}

export interface StationInfo {
  direction: 'N' | 'S'
  path: string
  train_id: string
  origin: string
  destination: string
  line: string
  status: string
  service_type: string
  next_station: string
  sched_time: string
  depart_time: string
  track: string
  track_change?: string
  platform?: string
  platform_change?: string
}

export type FilterDirection = 'All' | 'Northbound' | 'Southbound'
