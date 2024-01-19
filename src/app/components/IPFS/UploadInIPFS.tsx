import PinataClient, { PinataPinOptions } from "@pinata/sdk";

const SampleFile = new File(["Hello, world!"], "hello.txt", { type: "text/plain" });

const UploadInIPFS = async (file: File) => {
    const pinata = new PinataClient(process.env.REACT_APP_PINATA_KEY, process.env.REACT_APP_PINATA_SECRET);

    const readableStreamForFile = file.stream();
    const options: PinataPinOptions = {
        pinataMetadata: {
            name: file.name,
        },
        pinataOptions: {
            cidVersion: 0,
        },
    };

    const result = await pinata.pinFileToIPFS(readableStreamForFile, options);

    return result;
}

console.log(UploadInIPFS(SampleFile));

export default UploadInIPFS;