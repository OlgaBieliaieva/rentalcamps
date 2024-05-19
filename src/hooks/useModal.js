import { useRef } from "react";

export default function useModal() {
  const ref = useRef(null);
  const onOpen = () => {
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
    return ref.current.showModal();
  };
  const onClose = () => {
    const currentClassList = ref.current.className;
    ref.current.className = `${currentClassList} close`;
    ref.current.close();
    ref.current.className = currentClassList;
    document.body.style.height = "auto";
    document.body.style.overflow = "auto";
  };

  return { ref, onOpen, onClose };
}
