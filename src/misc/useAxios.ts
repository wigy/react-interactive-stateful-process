import { Dispatch, SetStateAction, useEffect } from 'react'
import axios from 'axios'

export type AxiosProps<Type> = {
  url: string,
  token?: string,
  receiver: Dispatch<SetStateAction<Type>>
}

/**
 * Helper hook to call API using axios.
 * @param props
 */
export function useAxios<Type>(props: AxiosProps<Type>) {
  const { token, url, receiver } = props
  useEffect(() => {
    let gone = false
    const headers: { Authorization?: string } = {}
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    axios({ method: 'GET', url: url, headers })
      .then(resp => !gone && receiver(resp.data as Type))
      .catch(err => console.error('Axios:', err))

    return () => {
      gone = true
    }
  }, [token, url, receiver])
}
