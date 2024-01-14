import {useEffect, useMemo, useRef} from "react";
import {useAudioStore} from "~/store";
import {useWavesurfer} from "@wavesurfer/react";
import SpectrogramPlugin from "wavesurfer.js/plugins/spectrogram";
import TimelinePlugin from "wavesurfer.js/plugins/timeline";
import ZoomPlugin from "wavesurfer.js/plugins/zoom";

export const useAudioTarget = () => {

    const wavesurferRef = useRef(null);
    const spectrogramRef = useRef(null);
    const {targetAudio} = useAudioStore();
    const {wavesurfer, isPlaying} = useWavesurfer({
        container: wavesurferRef,
        url: targetAudio[0].link,
        autoplay: false,
        waveColor: '#a89984',
        progressColor: '#282828',
        cursorColor: '#cc241d',
        cursorWidth: 2,
        height: 200,
        minPxPerSec: 10,
        plugins: useMemo(() => [TimelinePlugin.create(), ZoomPlugin.create()], [])

    });

    useEffect(() => {
        if (wavesurfer && spectrogramRef.current) {

            wavesurfer.registerPlugin(
                SpectrogramPlugin.create({
                    labels: true,
                    splitChannels: true,
                    container: spectrogramRef.current,
                    labelsColor: '#f9f5d7',
                    labelsBackground: "rgba(40,40,40,0.5)"
                })
            )
        }

    }, [wavesurfer]);


    return {
        spectrogramRef,
        wavesurferRef,
        wavesurfer,
        isPlaying,

    }
}