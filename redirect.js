// Detect device 
var isAndroid = /Android/i.test(navigator.userAgent);
var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (isAndroid) {
    window.location.href = "/playstore";
} else if (isIOS) {
    window.location.href = "/appstore";
} else {
    window.location.href = "/desktop";
}