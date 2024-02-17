import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface StepEditorProps {
  line: string;
  onSave: () => void;
  onCancel: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDelete: () => void;
}

const StepEditor: React.FC<StepEditorProps> = ({
  line,
  onSave,
  onCancel,
  onDelete,
}) => (
  <>
    <Textarea defaultValue={line} onChange={onCancel} />
    <Button className="m-2 m-h-full" onClick={onSave}>
      Save
    </Button>
    <Button className="m-2 m-h-full" onClick={onDelete}>
      Delete
    </Button>
  </>
);

StepEditor.displayName = "StepEditor";

export default StepEditor;
