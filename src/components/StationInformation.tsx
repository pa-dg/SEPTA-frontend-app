import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TableSortLabel from '@mui/material/TableSortLabel'
import dateTimeParser from './utils/dateTimeParser'
import currentDate from './utils/currentDate'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { StationInfoTableHeader } from './StationInfoTableHeader'
import { RawStationInfo, StationInfo, FilterDirection } from './types'

interface StationInfoProps {
  selectedStation: string
}

const StationInformation: React.FC<StationInfoProps> = ({
  selectedStation,
}) => {
  const CORS_PROXY_URL = 'https://api.allorigins.win/raw?url='
  const API_URL = `https://www3.septa.org/api/Arrivals/index.php?station=${selectedStation}`
  
  const [stationInfo, setStationInfo] = useState<RawStationInfo[] | []>([])
  const [renderedRows, setRenderedRows] = useState<StationInfo[] | []>([])
  const [filterDirection, setFilterDirection] = useState<FilterDirection>('All')

  const parseAllStationInfo = (
    rawData: RawStationInfo[],
    direction: FilterDirection = 'All'
  ): StationInfo[] => {
    // wrap this in a useMemo, to memoize parsing of data/value
    // with dependency on stationInfo & filterDirection

    let result: StationInfo[] | [] = []
    let idx = 0
    for (const directionObj of rawData) {
      // if direction northbound
      if (direction === 'Northbound' && idx === 0) {
        result = [...result, ...Object.values(directionObj).flat()]
        // console.log('result')
        return result
      }
      // if direction southbound
      if (direction === 'Southbound' && idx === 1) {
        result = [...result, ...Object.values(directionObj).flat()]
        return result
      }
      // if direction all
      if (direction === 'All') {
        result = [...result, ...Object.values(directionObj).flat()]
      }
      idx++
    }
    console.log(result)
    return result
  }

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilterDirection(event.target.value as FilterDirection)
  }

  // const sortTime = () => {
  //   let times: string[] = []

  //   renderedRows.map((row, _) => {
  //     times.push(dateTimeParser(row.sched_time).split(' ')[0])
  //   })

  //   console.log('before sort', times)
  //   console.log('sorted', times.sort())
  //   times = times.sort()
  //   return times
  // }

  useEffect(() => {
    const fetchStationInfo = async () => {
      try {
        const response = await fetch(CORS_PROXY_URL + API_URL)
        const data = await response.json()
        setStationInfo(Object.values(data)[0] as RawStationInfo[])
      } catch (error) {
        console.error('Error fetching station information')
      }
    }
    selectedStation && fetchStationInfo()
  }, [selectedStation])

  useEffect(() => {
    if (stationInfo.length) {
      setRenderedRows(parseAllStationInfo(stationInfo, filterDirection))
    }
  }, [stationInfo, filterDirection])

  return selectedStation ? (
    <div className="stations-info-container">
      <div className="stations-info-header-container">
        <div className="stations-info__current-date-container">
          <p>Today's Date: {currentDate()}</p>
        </div>
        <div className="stations-info__filterButton">
          <FormControl fullWidth>
            <InputLabel id="filter-button-label">Filter Direction</InputLabel>
            <Select
              labelId="filter-button-select-label"
              id="filter-button-select"
              value={filterDirection}
              label="Filter by Direction"
              onChange={handleFilterChange}
            >
              <MenuItem value={'Northbound'}>View North Bound</MenuItem>
              <MenuItem value={'Southbound'}>View South Bound</MenuItem>
              <MenuItem value={'All'}>View All</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <h2 className="station-info__current-station-info">{selectedStation}</h2>
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          sx={{
            overflow: 'auto',
            minHeight: 600,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Line</TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={false}
                  // direction={'desc'}
                  // onClick={sortTime}
                >
                  Scheduled Time
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Departure Time</TableCell>
              <TableCell align="center">Direction</TableCell>
            </TableRow>
          </TableHead>
          {/* <StationInfoTableHeader
          /> */}
          <TableBody>
            {renderedRows.map((row) => (
              <TableRow key={row.train_id}>
                <TableCell align="center">{row.line}</TableCell>
                <TableCell key={row.sched_time} align="center">
                  {dateTimeParser(row.sched_time)}
                </TableCell>
                <TableCell align="center">
                  {dateTimeParser(row.depart_time)}
                </TableCell>
                <TableCell align="center">
                  {row.direction === 'N' ? 'Northbound' : 'Southbound'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : (
    <div className="stations-info-container">
      <h1>Select a Station</h1>
    </div>
  )
}

export default StationInformation
