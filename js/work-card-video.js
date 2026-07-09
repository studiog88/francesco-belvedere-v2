/**
 * Homepage work-card videos with a pause between loop cycles.
 * Use data-loop-pause-ms on the <video> to set the gap (default 5000ms).
 * Falls back to the sibling static image when playback is unavailable.
 */
(function initWorkCardVideos() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("video[data-loop-pause-ms]").forEach((video) => {
    const media = video.closest(".work-card-media");
    const fallbackImage = media?.querySelector(".work-card-image-fallback");

    const showStaticFallback = () => {
      if (!media || !fallbackImage) {
        return;
      }

      media.classList.add("is-static-fallback");
      video.pause();
      video.removeAttribute("autoplay");
    };

    if (prefersReducedMotion) {
      showStaticFallback();
      return;
    }

    const pauseMs = Number(video.dataset.loopPauseMs) || 5000;
    let replayTimeoutId = null;

    const scheduleReplay = () => {
      video.currentTime = 0;

      replayTimeoutId = window.setTimeout(() => {
        replayTimeoutId = null;
        video.play().catch(showStaticFallback);
      }, pauseMs);
    };

    video.addEventListener("ended", scheduleReplay);
    video.addEventListener("error", showStaticFallback);

    video.play().catch(showStaticFallback);
  });
})();
