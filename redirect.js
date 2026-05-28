// Get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Check for Firebase auth parameters
var apiKey = getUrlParameter('apiKey');
var oobCode = getUrlParameter('oobCode');
var webLogin = getUrlParameter('webLogin');


if (webLogin === 'true') {
    var encodedLink = encodeURIComponent(window.location.href);
    window.location.href =
        'https://biz.ganddee.com/email-signin-loading?link=' + encodedLink;

} else if (apiKey && oobCode) {
    // Show message for manual sign-in
    var authMessage = document.getElementById('auth-message');
    var urlDisplay = document.getElementById('url-display');
    var copyBtn = document.getElementById('copy-btn');
    
    urlDisplay.textContent = window.location.href;
    authMessage.style.display = 'block';
    
    // Copy button functionality
    copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(window.location.href).then(function() {
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('copied');
            setTimeout(function() {
                copyBtn.textContent = 'Copy Link';
                copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            var textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('copied');
            setTimeout(function() {
                copyBtn.textContent = 'Copy Link';
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    });
} else {

    var authMessage = document.getElementById('auth-message');
    authMessage.style.display = 'none';
    // Show redirecting message
    var mainContent = document.getElementById('main-content');
    mainContent.style.display = 'block';
    
    // Detect device and set manual link
    var isAndroid = /Android/i.test(navigator.userAgent);
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    var manualLink = document.getElementById('manual-link');
    if (isAndroid) {
        manualLink.href = "https://play.google.com/store/apps/details?id=com.bluteshi.ganddee";
        manualLink.textContent = "click here to go to Google Play Store";
    } else if (isIOS) {
        manualLink.href = "https://apps.apple.com/gb/app/ganddee/id6457107823";
        manualLink.textContent = "click here to go to App Store";
    } else {
        manualLink.href = "https://www.ganddee.com/broken-app-link";
        manualLink.textContent = "click here to visit Ganddee website";
    }
    
    // Auto redirect after showing the page
    setTimeout(function() {
        if (isAndroid) {
            window.location.href = "/playstore";
        } else if (isIOS) {
            window.location.href = "/appstore";
        } else {
            window.location.href = "/desktop";
        }
    }, 3000); // Show for 3 seconds
}
