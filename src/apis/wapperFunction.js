import { getStorage, ref } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import { upload } from "./uploadBytes";
import {
  collection,
  doc,
  getDocs,
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
const handleClothes = async (imgData, clothesData, id) => {
  const user = auth.currentUser;
  const { uploadUrl_0, img_0, uploadUrl_1, img_1 } = imgData;
  const { season, part, brand, price, details } = clothesData;
  const storage = getStorage();
  const spaceRef_1 = ref(storage, `${user.uid}/clothes/${uuidv4()}`);
  const spaceRef_2 = ref(storage, `${user.uid}/clothes/${uuidv4()}`);
  const newClothes = {
    id: id ? id : uuidv4(),
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
  await setDoc(doc(clothesCollectionRef, uuidv4()), clothes).catch((err) => {
    console.log(err);
  });
};
export const updateClothes = async (imgData, clothesData, id) => {
  const user = auth.currentUser;
  const clothes = await handleClothes(imgData, clothesData, id);
  const userDocRef = doc(db, "User", user.uid);
  const clothesCollectionRef = collection(userDocRef, "clothes");
  const querySnapshot = await getDocs(clothesCollectionRef);
  const docName = querySnapshot.docs.find((doc) => doc.data().id === id).id;
  const clothesDocRef = doc(clothesCollectionRef, docName);
  await updateDoc(clothesDocRef, clothes);
};
