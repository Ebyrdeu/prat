import type {MetaFunction} from "@remix-run/node";
import {ClientOnly} from "remix-utils/client-only";
import AudioWave from "~/components/audio-wave";
import {useAudioStore} from "~/store";
import {UploadAudio} from "~/components/upload-audio";

export const meta: MetaFunction = () => {
    return [
        {title: "Prat"},
        {name: "description", content: "Prat much more simple version of praat with 2 audiofiles"},
    ];
};

export default function Index() {
    const {targetAudio} = useAudioStore();
    return targetAudio.length > 0 ? (
        <>
            <ClientOnly fallback={<div>m</div>}>
                {() => <>
                    <AudioWave/>
                </>}
            </ClientOnly>

        </>
    ) : (<UploadAudio/>)
}
