import './Loading.css'

const Loading = ({ className, ...others }) => {
  const cls = className ? className + ' loading' : 'loading'

  return <div className={cls} {...others} />
}

export default Loading