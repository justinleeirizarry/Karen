import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface StepEditorProps {
  line: string;
  onSave: () => void;
  onCancel: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const StepEditor: React.FC<StepEditorProps> = ({ line, onSave, onCancel }) => (
  <>
    <Textarea defaultValue={line} onChange={onCancel} />
    <Button className="m-2 m-h-full" onClick={onSave}>
      Save
    </Button>
  </>
);

StepEditor.displayName = "StepEditor";

export default StepEditor;
