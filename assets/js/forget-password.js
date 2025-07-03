const toast = document.getElementById('toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

document.getElementById('forgotPasswordForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = '';

  if (!email.includes('@') || !email.includes('.')) {
    errorMessage.textContent = 'Please enter a valid email address.';
    return;
  }

  console.log('Password reset requested for:', email);

  setTimeout(() => {
    showToast('A reset link has been sent to your email.');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1000);
  }, 800);
});