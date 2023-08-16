import { from } from 'rxjs';
import { concatMap, takeWhile, reduce } from 'rxjs/operators';

// Description of the task can be found here https://codesandbox.io/s/rxjs-playground-forked-zpie72?file=/src/index.js

const areAllWarningsAccepted = (messagesToConfirm) => {
  // Confirm every message step by step
  // Should return Observable<Boolean> if all messages are confirmed
  // * If user declines at least one message don't show next confirmation popup
  // ConfirmationService.confirm(message) => Observable true / false

  return from(messagesToConfirm).pipe(
    concatMap(ConfirmationService.confirm), // launch questions in sequence, one after another, but only after previous is finished
    takeWhile(Boolean), // if any answer is negative we don't need to answer other questions
    reduce((_acc, val) => Boolean(val)) // emit result value after ALL questions answered
  );
};
