import React from 'react'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'

interface HeadCell {
  id: keyof Data
  label: string
}

const headCells: readonly HeadCell[] = [
  {
    id: 'scheduledTime',
    label: 'Scheduled Time',
  },
  {
    id: 'departureTime',
    label: 'Departure Time',
  },
]

interface Data {
  scheduledTime: number
  departureTime: number
}

export type Order = 'asc' | 'desc'

interface StationInfoTableHeaderProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void
  order: Order
  orderBy: string
}

export const StationInfoTableHeader: React.FC<StationInfoTableHeaderProps> = ({
  onRequestSort,
  order,
  orderBy,
}) => {
  const createSortHandler =
    (prop: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, prop)
    }

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">Line</TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            ></TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">Direction</TableCell>
      </TableRow>
    </TableHead>
  )
}
