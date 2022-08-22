import styles from '../styles/spinner.module.css'
const {animated, div, lds_ripple } = styles


const Spinner = () => {
  return (
    <div className={lds_ripple}>
        <div className={div}></div>
        <div className={animated}></div>
    </div>
  )
}

export default Spinner