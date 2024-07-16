import { IAppController } from "../../global/types";
import { getSteps } from "./operations/getSteps";

export const StepController: IAppController = {
  "get|/steps": { action: getSteps }
}