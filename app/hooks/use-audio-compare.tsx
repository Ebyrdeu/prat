import {useEffect, useMemo, useRef} from "react";
import {useAudioStore} from "~/store";
import {useWavesurfer} from "@wavesurfer/react";
import TimelinePlugin from "wavesurfer.js/plugins/timeline";
import SpectrogramPlugin from "wavesurfer.js/plugins/spectrogram";
import ZoomPlugin from "wavesurfer.js/plugins/zoom";

export const useAudioCompare = () => {
    const wavesurferCompareRef = useRef(null);
    const {compareAudio} = useAudioStore();
    const {wavesurfer: wavesurferCompare, isPlaying: isPlayingCompare} = useWavesurfer({
        container: wavesurferCompareRef,
        url: compareAudio,
        autoplay: false,
        waveColor: '#a89984',
        progressColor: '#282828',
        cursorColor: '#282828',
        cursorWidth: 2,
        height: 200,
        minPxPerSec: 10,
        plugins: useMemo(() => [TimelinePlugin.create(), ZoomPlugin.create()], [])
    });

    useEffect(() => {
        if (wavesurferCompare && wavesurferCompareRef.current) {
            wavesurferCompare.registerPlugin(
                SpectrogramPlugin.create({
                    labels: true,
                    splitChannels: true,
                    labelsColor: '#f9f5d7',
                    labelsBackground: "rgba(40,40,40,0.5)"
                }),
            )
        }
    }, [wavesurferCompare]);

    return {
        wavesurferCompareRef,
        wavesurferCompare,
        isPlayingCompare
    }
}