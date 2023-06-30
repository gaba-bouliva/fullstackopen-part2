const Notification = ({ message, classNames }) => {
  if (message ===  null || message === '') {
    return null
  }

  return (
    <div className={classNames}>
      {message}
    </div>
  )
}

export default Notification