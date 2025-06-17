import RNFS from 'react-native-fs';

const saveImageLocally = async (imageUrl: any) => {
  try {
    const imagePath = `${RNFS.DocumentDirectoryPath}/tempImage.jpg`; // Set the file path
    const download = await RNFS.downloadFile({
      fromUrl: imageUrl, // Remote URL
      toFile: imagePath, // Local path
    }).promise;

    if (download.statusCode === 200) {
      console.log('Image saved to:', imagePath);
      return imagePath;
    }
  } catch (error) {
    console.error('Error saving image:', error);
  }
};
