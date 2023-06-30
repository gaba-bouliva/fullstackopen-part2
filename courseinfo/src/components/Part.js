const Content = (props) => {
  console.log('Content props: ', props);
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

export default Content