import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

export const stateSchema = Annotation.Root({
    ...MessagesAnnotation.spec,
    schema: Annotation<string>,
  });
  