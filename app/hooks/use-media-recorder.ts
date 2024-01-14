import {useRef, useState} from "react";
import {useUserMedia} from "~/hooks/use-user-media";

type MediaRecorderHandlers = {
    onStart?: (recorder: MediaRecorder) => void;
    onStop?: (audioUrl: string) => void;
    onData?: (event: BlobEvent, audioChunks: Blob[]) => void;
};

export const useMediaRecorder = ({onStart, onStop, onData}: MediaRecorderHandlers) => {
    const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
    const [state, setState] = useState<string>('inactive');
    const {getStream} = useUserMedia({audio: true, video: false});
    const audioChunks = useRef<Blob[]>([]);

    const start = async (timeslices?: number, _stream?: MediaStream) => {
        const stream = _stream || await getStream(true);
        audioChunks.current = [];
        const _recorder = new MediaRecorder(stream);
        onStart?.(_recorder);
        _recorder.start(timeslices);
        setRecorder(_recorder);
        setState(_recorder.state);

        _recorder.addEventListener('dataavailable', (event: BlobEvent) => {
            audioChunks.current.push(event.data);
            onData?.(event, audioChunks.current);
        });

        _recorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks.current);
            const audioUrl = URL.createObjectURL(audioBlob);
            onStop?.(audioUrl);
            setState(_recorder.state);
        });
    }

    const stop = async () => {
        if (recorder) {
            recorder.stop();
            (await getStream()).getTracks().forEach((track: { stop: () => void }) => track.stop());

        }
    }

    return {start, stop, state};
}
