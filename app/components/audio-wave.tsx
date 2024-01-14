import {useAudioCompare, useAudioTarget, useMediaRecorder} from "~/hooks";
import {useAudioStore} from "~/store";
import {Button} from "~/components/ui";
import {PauseIcon, PlayIcon, RecordIcon, StopRecordIcon} from "~/components/ui/icons";

const AudioWave = () => {
    const {wavesurfer, isPlaying, spectrogramRef, wavesurferRef} = useAudioTarget();
    const {wavesurferCompare, wavesurferCompareRef, isPlayingCompare} = useAudioCompare();
    const onPlayPause = () => {
        if (wavesurfer) {
            void wavesurfer.playPause();
        }
    };
    const {compareAudio, setCompareAudio} = useAudioStore();
    const {start, stop, state} = useMediaRecorder({
        onStop: (audioUrl) => setCompareAudio(audioUrl),
    });

    const onComaprePlayPause = () => {
        if (wavesurferCompare) {
            void wavesurferCompare.playPause();
        }
    };
    return (
        <>
            <div ref={spectrogramRef}/>
            <div ref={wavesurferRef}/>
            <div ref={wavesurferCompareRef}/>
            {compareAudio.length > 0 ? <div ref={wavesurferRef}/> : null}
            <div className={"flex gap-2  p-4 justify-center absolute bottom-0 inset-x-0 z-[9999]"}>
                <Button leftSection={isPlaying ? <PauseIcon/> : <PlayIcon/>} onClick={onPlayPause}/>
                <Button leftSection={state === "recording" ? <StopRecordIcon/> : <RecordIcon/>}
                        onClick={() => state === "recording" ? stop() : start()}/>
                {compareAudio.length > 0 ? (
                    <Button leftSection={isPlayingCompare ? <PauseIcon/> : <PlayIcon/>} onClick={onComaprePlayPause}/>
                ) : null}
            </div>
        </>
    );

}

export default AudioWave;