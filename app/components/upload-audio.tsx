import {Input, Label} from "~/components/ui";
import {AudioParser} from "~/lib";
import {useAudioStore} from "~/store";

export const UploadAudio = () => {
    const {setTargetAudio} = useAudioStore()
    const onDrag = (e: unknown) => {
        void (e as DragEvent).preventDefault()
        void (e as DragEvent).stopPropagation();
    }

    return (
        <div
            onDragEnter={onDrag}
            onDragLeave={onDrag}
            onDragOver={onDrag}
            onDrop={onDrag}
        >
            <Label variant={"upload"} htmlFor="video">
                <p><span className="font-semibold text-error">Choose a file</span> or drag it here.</p></Label>
            <Input accept={"audio/*"}
                   id={"video"}
                   onChange={e => AudioParser.upload(e, setTargetAudio)}
                   multiple={false}/>
        </div>
    )
}