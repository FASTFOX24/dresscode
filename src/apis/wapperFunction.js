import { deleteObject, getStorage, ref } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import { upload } from "./uploadBytes";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export const digitsNumber = (price) => {
  const numberString = String(price);
  const digits = numberString.split("");
  const result = [];
  for (let i = digits.length - 1; i >= 0; i -= 3) {
    const chunk = digits.slice(Math.max(i - 2, 0), i + 1);
    result.unshift(chunk.join(""));
  }
  return result.join(",");
};
export const shortSeason = (season) => {
  const seasonFilter = ["Spring", "Summer", "Fall", "Winter"];
  return season.slice().sort((a, b) => {
    return seasonFilter.indexOf(a) - seasonFilter.indexOf(b);
  });
};
const handleClothes = async (imgData, clothesData) => {
  const user = auth.currentUser;
  const { uploadUrl_0, img_0, uploadUrl_1, img_1 } = imgData;
  const { season, part, brand, price, details } = clothesData;
  const storage = getStorage();
  const spaceRef_1 = ref(storage, `${user.uid}/clothes/${uuidv4()}`);
  const spaceRef_2 = ref(storage, `${user.uid}/clothes/${uuidv4()}`);
  const newClothes = {
    imageUrl_1: uploadUrl_0 ? await upload(spaceRef_1, uploadUrl_0) : img_0,
    imageUrl_2: uploadUrl_1
      ? await upload(spaceRef_2, uploadUrl_1)
      : img_1
      ? img_1
      : null,
    season: shortSeason(season),
    part: part,
    brand: brand,
    price: price,
    details: details,
    favorite: false,
  };
  return newClothes;
};
export const uploadClothes = async (imgData, clothesData) => {
  const user = auth.currentUser;
  const clothes = await handleClothes(imgData, clothesData);
  const userDocRef = doc(db, "User", user.uid);
  const clothesCollectionRef = collection(userDocRef, "clothes");
  await setDoc(doc(clothesCollectionRef), clothes).catch((err) => {
    console.log(err);
  });
};
export const updateClothes = async (imgData, clothesData, id) => {
  const user = auth.currentUser;
  const clothes = await handleClothes(imgData, clothesData);
  const userDocRef = doc(db, "User", user.uid);
  const clothesCollectionRef = collection(userDocRef, "clothes");
  const clothesDocRef = doc(clothesCollectionRef, id);
  await updateDoc(clothesDocRef, clothes);
};
export const deleteClothes = async (docName, clothesData) => {
  const { imageUrl_1, imageUrl_2 } = clothesData;
  const storage = getStorage();
  const user = auth.currentUser;
  const userDocRef = doc(db, "User", user.uid);
  const clothesCollectionRef = collection(userDocRef, "clothes");
  await deleteDoc(doc(clothesCollectionRef, docName));
  const spaceRef_1 = ref(storage, imageUrl_1);
  await deleteObject(spaceRef_1);
  if (imageUrl_2) {
    const spaceRef_2 = ref(storage, imageUrl_2);
    await deleteObject(spaceRef_2);
  }
};
