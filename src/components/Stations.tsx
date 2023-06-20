import { useEffect, useState } from 'react'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'

const FavoriteStationsKey = 'FavoriteStations'

interface FavoriteStationsStorage {
  [station: string]: string
}

interface StationsProps {
  stations: string[]
  setSelectedStation: (station: string) => void
}

const Stations: React.FC<StationsProps> = ({
  stations,
  setSelectedStation,
}) => {
  const [toggleFavoriteStations, setToggleFavoriteStations] = useState(false)
  const [favoriteStations, setFavoriteStations] =
    useState<FavoriteStationsStorage>({})

  const handleToggle = () => {
    setToggleFavoriteStations(!toggleFavoriteStations)
  }

  const handleButtonClick = (station: string) => () => {
    setSelectedStation(station)
  }

  const handleFavorite =
    (station: string) =>
    (_e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (checked) {
        const newFavoriteStations = { ...favoriteStations, [station]: station }
        // TODO: cleanup
        localStorage.setItem(
          FavoriteStationsKey,
          JSON.stringify(newFavoriteStations)
        )
        setFavoriteStations(newFavoriteStations)
      } else {
        const { [station]: _, ...newFavoriteStations } = favoriteStations
        localStorage.setItem(
          FavoriteStationsKey,
          JSON.stringify(newFavoriteStations)
        )
        setFavoriteStations(newFavoriteStations)
      }
    }

  const isFavoriteStation = (station: string) => {
    // can wrap in a useCallback with favoriteStations as dependency
    return !!favoriteStations[station]
  }

  useEffect(() => {
    const favoriteStations =
      localStorage.getItem(FavoriteStationsKey) ?? JSON.stringify({})
    setFavoriteStations(JSON.parse(favoriteStations))
  }, [])

  return (
    <div className="stations-container">
      <FormControlLabel
        id="stations__toggle"
        label={
          toggleFavoriteStations
            ? 'Favorite Stations'
            : 'All Stations'
        }
        labelPlacement="start"
        control={
          <Switch checked={toggleFavoriteStations} onChange={handleToggle} />
        }
      />
      <List
        sx={{
          overflow: 'auto',
          maxHeight: 700,
          minHeight: 700,
          paddingTop: 0,
        }}
      >
        {(toggleFavoriteStations
          ? Object.keys(favoriteStations)
          : stations
        ).map((station, index) => {
          const labelId = `${station}-${index}`

          return (
            <ListItem
              key={station}
              secondaryAction={
                <Checkbox
                  id="favorite-star-icon"
                  checked={
                    toggleFavoriteStations ? true : isFavoriteStation(station)
                  }
                  edge="end"
                  icon={<StarBorderRoundedIcon />}
                  checkedIcon={<StarRoundedIcon />}
                  onChange={handleFavorite(station)}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemText
                  id={labelId}
                  primary={station}
                  onClick={handleButtonClick(station)}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default Stations
