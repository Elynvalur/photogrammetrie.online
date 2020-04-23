if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then(function (registration) {
      console.log("Service Worker registration succeeded", registration);
    })
    .catch(function (error) {
      console.log("Service Worker registration failed:", error);
    });
} else {
  console.log("Service Workers are not supported.");
}

let deferredPrompt;
let installButton = document.querySelector("#installButton");
installButton.addEventListener("click", triggerInstall);

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPromotion();
  console.log("beforeinstallprompt fired");
});

function showInstallPromotion() {
  installButton.classList.remove("d-none");
  installButton.classList.add("d-md-none");
}

function triggerInstall() {
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      installButton.style.display = "none";
    } else {
      console.log("Prompt dismissed");
    }
    deferredPrompt = null;
  });
}
