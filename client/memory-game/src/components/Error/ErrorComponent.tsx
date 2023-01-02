import { useRouteError } from 'react-router-dom'
import classes from './error.module.css'

const ErrorComponent = () => {
  const error: any = useRouteError()

  console.log('error', error)
  return (
    <div className={classes.error}>
      <h1>Something went wrong</h1>
      <p>{error.statusText || error.message}</p>
    </div>
  )
}

export default ErrorComponent
