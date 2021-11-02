import { useEffect } from 'react'
import axios from 'axios'

export type AxiosProps = {
  url: string,
  receiver: (data) => {}
}

/**
 * Helper hook to call API using axios.
 * @param props
 */
export const useAxios = (props: AxiosProps) => {
  useEffect(async () => {
    const resp = await axios.get(props.url).catch(err => console.error('Axios:', err))
    if (resp) {
      props.receiver(resp.data)
    }
  }, [props.url])
}
