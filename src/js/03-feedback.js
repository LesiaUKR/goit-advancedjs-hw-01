import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
console.log(form);
const email = document.querySelector('input');
console.log(email);
const message = document.querySelector('textarea');
console.log(message);

const FEEDBACK_FORM_KEY = 'feedback-form-state';

let feedbackForm = {};

form.addEventListener('submit', onSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
  localStorage.setItem(
    FEEDBACK_FORM_KEY,
    JSON.stringify({
      email: email.value,
      message: message.value,
    })
  );
}

function onSubmit(event) {
  event.preventDefault();
  console.log(event);
  console.log({ email: email.value, message: message.value });
  localStorage.removeItem(FEEDBACK_FORM_KEY);
  event.currentTarget.reset();
}
try {
  feedbackForm = JSON.parse(localStorage.getItem(FEEDBACK_FORM_KEY));
  console.log(feedbackForm);
  if (feedbackForm !== null) {
    email.value = feedbackForm.email;
    message.value = feedbackForm.message;
  }
} catch (error) {
  console.log(error);
}
