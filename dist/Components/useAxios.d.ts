import { Dispatch, SetStateAction } from 'react';
export declare type AxiosProps<Type> = {
    url: string;
    token?: string;
    receiver: Dispatch<SetStateAction<Type>>;
};
/**
 * Helper hook to call API using axios.
 * @param props
 */
export declare function useAxios<Type>(props: AxiosProps<Type>): void;
