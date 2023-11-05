import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');

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
  if (email.value.trim() !== '' && message.value.trim() !== '') {
    console.log({ email: email.value, message: message.value });
    localStorage.removeItem(FEEDBACK_FORM_KEY);
    event.currentTarget.reset();
  } else {
    alert('Будь ласка, заповніть обидва поля.');
  }
}

try {
  feedbackForm = JSON.parse(localStorage.getItem(FEEDBACK_FORM_KEY));
  if (feedbackForm !== null) {
    email.value = feedbackForm.email;
    message.value = feedbackForm.message;
  }
} catch (error) {
  console.log(error);
}
