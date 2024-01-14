import {useState} from 'react';

export const useUserMedia = (constraints: MediaStreamConstraints) => {
    const [stream, setStream] = useState<MediaStream | null>(null);

    const getStream = (refresh = false): Promise<MediaStream> => {
        if (stream && !refresh) {
            return Promise.resolve(stream);
        }

        return navigator.mediaDevices.getUserMedia(constraints).then((_stream: MediaStream) => {
            setStream(_stream);
            return _stream;
        });
    }

    return {stream, getStream};
}
