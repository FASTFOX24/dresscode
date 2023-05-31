import { getDownloadURL, uploadBytes } from "firebase/storage";

export const upload = async (ref, image) =>
  await uploadBytes(ref, image).then((snapshot) =>
    getDownloadURL(snapshot.ref)
      .then((url) => {
        return url;
      })
      .catch((err) => {
        console.log(err);
      })
  );
