import { useEffect, useState } from 'react'
import Route from './Router'

function App() {
  const [init, setInit] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setInit(true)
    }, 300)

    return () => {
      setInit(false)
    }
  }, [])

  return (
    <>
      <div>{init ? <Route></Route> : <div>로딩중...</div>}</div>
    </>
  )
}

export default App
