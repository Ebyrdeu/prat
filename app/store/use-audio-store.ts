import {create} from "zustand";
import {AudioData} from "~/lib";

interface AudioStore {
    targetAudio: AudioData[];
    compareAudio: string;
    setTargetAudio: (audio: AudioData[]) => void;
    setCompareAudio: (audio: string) => void;
}

const useAudioStore = create<AudioStore>((set) => ({
    targetAudio: [],
    compareAudio: "",
    setTargetAudio: (audioLink) => set(() => ({targetAudio: audioLink})),
    setCompareAudio: (audioLink) => set(() => ({compareAudio: audioLink})),
}));

export {useAudioStore};
