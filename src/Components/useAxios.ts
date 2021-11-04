import { Dispatch, SetStateAction, useEffect } from 'react'
import axios from 'axios'

export type AxiosProps<Type> = {
  url: string,
  receiver: Dispatch<SetStateAction<Type>>
}

/**
 * Helper hook to call API using axios.
 * @param props
 */
export function useAxios<Type>(props: AxiosProps<Type>) {
  useEffect(() => {
    axios.get(props.url)
      .then(resp => props.receiver(resp.data as Type))
      .catch(err => console.error('Axios:', err))
  }, [props.url])
}
