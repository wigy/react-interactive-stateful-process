export declare type AxiosProps = {
    url: string;
    receiver: (data: any) => {};
};
/**
 * Helper hook to call API using axios.
 * @param props
 */
export declare const useAxios: (props: AxiosProps) => void;
