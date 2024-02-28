import { useState } from "react";
import { useSteps } from "@/context/TaskStepContext";

const useUserInputEditor = () => {
 const { userInput, setUserInput } = useSteps();
 const [isEditingUserInput, setIsEditingUserInput] = useState(false);
 const [isConfirmed, setIsConfirmed] = useState(false);

 const handleUserInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
 };

 const toggleEditUserInput = () => {
    setIsEditingUserInput(!isEditingUserInput);
 };

 const handleConfirmUserInput = () => {
    setIsConfirmed(true);
    setIsEditingUserInput(false);
 };

 return {
    userInput,
    setUserInput, 
    isEditingUserInput,
    isConfirmed,
    handleUserInputChange,
    toggleEditUserInput,
    handleConfirmUserInput,
 };
};

export default useUserInputEditor;
