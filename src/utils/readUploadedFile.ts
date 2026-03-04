export default function readUploadedFile(file: Blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = () => {
      reject();
    };

    fileReader.readAsArrayBuffer(file);
  });
}
