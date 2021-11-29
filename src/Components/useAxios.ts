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
  useEffect(() => {
    let gone = false
    const headers: { Authorization?: string } = {}
    if (props.token) {
      headers.Authorization = `Bearer ${props.token}`
    }
    axios({ method: 'GET', url: props.url, headers })
      .then(resp => !gone && props.receiver(resp.data as Type))
      .catch(err => console.error('Axios:', err))

    return () => {
      gone = true
    }
  }, [props.url])
}
