import { useEffect, useState } from 'react'
import apiCall from '../api/api'

const useAxiosFetch = (url: string) => {
  const [data, setData] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiCall.get(url)
        setData(res)
      } catch (e) {
        console.log('error : {}', e)
      }
    }
    fetchData()
  }, [url])

  return { data, setData }
}

export default useAxiosFetch
