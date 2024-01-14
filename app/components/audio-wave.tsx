import {useAudioCompare, useAudioTarget, useMediaRecorder} from "~/hooks";
import {useAudioStore} from "~/store";
import {Button, Flex, Input, Label} from "~/components/ui";
import {AddAudioIcon, PauseIcon, PlayIcon, RecordIcon, StopRecordIcon} from "~/components/ui/icons";
import {AudioParser} from "~/lib";

const AudioWave = () => {
    const {wavesurfer, isPlaying, spectrogramRef, wavesurferRef} = useAudioTarget();
    const {wavesurferCompare, wavesurferCompareRef, isPlayingCompare} = useAudioCompare();
    const onPlayPause = () => {
        if (wavesurfer) {
            void wavesurfer.playPause();
        }
    };
    const {compareAudio, setCompareAudio, setTargetAudio} = useAudioStore();
    const {start, stop, state} = useMediaRecorder({
        onStop: (audioUrl) => setCompareAudio(audioUrl),
    });

    const onComaprePlayPause = () => {
        if (wavesurferCompare) {
            void wavesurferCompare.playPause();
        }
    };
    return (
        <div>
            <div ref={spectrogramRef}/>
            <div ref={wavesurferRef}/>
            <div ref={wavesurferCompareRef} className={'mb-10'}/>
            {compareAudio.length > 0 ? <div ref={wavesurferRef}/> : null}
            <div className={"sticky bottom-0 inset-x-0 px-8  z-[9999] bg-gruvbox-fg0/30"}>
                <Flex className={"py-6"} gap={"md"} direction={"col"} justify={"start"} align={"between"}>
                    <Flex justify={'between'}>
                        <Flex gap={"xl"}>
                            <Button size={"icon"}>
                                <Label variant={"icon"} htmlFor="subtitle" leftSection={<AddAudioIcon/>}/>
                                <Input accept={"audio/*"} id={"subtitle"}
                                       onChange={e => AudioParser.upload(e, setTargetAudio)} multiple={true}/>
                            </Button>
                            <Button leftSection={isPlaying ? <PauseIcon/> : <PlayIcon/>} onClick={onPlayPause}/>
                        </Flex>

                        <div>
                            {compareAudio.length > 0 ? (
                                <Button leftSection={isPlayingCompare ? <PauseIcon/> : <PlayIcon/>}
                                        onClick={onComaprePlayPause}/>
                            ) : null}
                            <Button leftSection={state === "recording" ? <StopRecordIcon/> : <RecordIcon/>}
                                    onClick={() => state === "recording" ? stop() : start()}/>
                        </div>
                    </Flex>
                </Flex>
            </div>
        </div>
    );

}

export default AudioWave;