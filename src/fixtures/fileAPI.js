export const createFile = (size = 44320, name = 'ecp-logo.png') =>
  new File([new ArrayBuffer(size)], name , {
    type: 'image/png',
  });

export const createFileList = (files = [createFile()]) => {
  const fileList = new FileList();
  for(let i = 0; i < files.length; i++) {
    fileList[i] = files[i];
  }
  fileList.item = index => fileList[index];
  return fileList;
}
