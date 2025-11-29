// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// mine web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHJqdvr89mj3N8srZ0q4_IBmmvKGNbUH4",
  authDomain: "to-do-list-d4879.firebaseapp.com",
  projectId: "to-do-list-d4879",
  storageBucket: "to-do-list-d4879.firebasestorage.app",
  messagingSenderId: "215632128662",
  appId: "1:215632128662:web:c227945dc0b4392716b0b7"
};


// ✅ Initialize Firebase + Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 📌 Reference to "tasks" collection
const tasksCollection = collection(db, "tasks");

// 🔽 INSERT: add one task
export async function addTask(title) {
  if (!title || !title.trim()) return;

  await addDoc(tasksCollection, {
    title: title.trim(),
    completed: false,
    created_at: serverTimestamp(),
  });
}

// 🔼 FETCH: get all tasks once
export async function getAllTasks() {
  const snapshot = await getDocs(tasksCollection);
  const tasks = [];
  snapshot.forEach((docSnap) => {
    tasks.push({ id: docSnap.id, ...docSnap.data() });
  });
  return tasks;
}

// ✅ UPDATE: toggle completed
export async function toggleTaskCompleted(taskId, currentValue) {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, {
    completed: !currentValue,
  });
}

// 🗑 DELETE: remove task
export async function deleteTask(taskId) {
  const taskRef = doc(db, "tasks", taskId);
  await deleteDoc(taskRef);
}
