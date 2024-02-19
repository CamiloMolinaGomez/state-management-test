import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = "https://covid-api.com/api/";
  const url = `${baseUrl}${req.url}`;
  const newRequest = req.clone({ url });

  return next(newRequest).pipe(catchError(handleError));
};

function handleError(response: HttpErrorResponse) {
  let defaultMessage: string;
  switch (response.constructor) {
    case ErrorEvent:
      console.error('An error occurred:', response.error.message);
      defaultMessage = response.error.message;
      break;
      // Add more cases as needed
    default:
      defaultMessage =
      response.error && response.error.Message
      ? response.error.Message
      : 'There was an error. Please try again later.';
      console.error(`Server returned code ${response.status}, ` + `Error: ${defaultMessage}`);
      break;
  }
  return throwError(() => defaultMessage);
}
