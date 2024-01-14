import {type ChangeEvent} from "react";

interface AudioData {
    name: string;
    link: string;
}

enum UploadEnum {
    target,
    compare
}

class AudioParser {

    public static upload(e: unknown, cb: (link: AudioData[]) => void): void {

        const files: FileList | null = (e as DragEvent).dataTransfer?.files ||
            (e as ChangeEvent<HTMLInputElement>).target?.files;

        if (files && files.length > 0) {
            const links = Array.from(files).map(file => {
                return ({
                    name: file.name,
                    link: URL.createObjectURL(file),
                });
            });

            console.log(links);
            cb(links);
        }
    }
}

export {AudioParser, type AudioData}