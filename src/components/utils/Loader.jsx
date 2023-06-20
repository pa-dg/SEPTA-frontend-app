import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }

  
  return (
    <div>
      <CircularProgress style={style}/>
    </div>
  )
}

export default Loader;