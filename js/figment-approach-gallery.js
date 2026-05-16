/**
 * Figment section 03 — horizontal gallery
 *
 * - Mouse: 1:1 drag on scrollLeft; past edges, inner track shifts (rubber) — release: elastic bounce to x:0.
 * - Mouse in-bounds release: GSAP momentum on scrollLeft (power3.out).
 * - Keyboard: ArrowLeft / ArrowRight + scrollTo({ behavior: smooth }).
 * - Touch: native horizontal scroll (CSS touch-action: pan-x).
 * - prefers-reduced-motion: no rubber / no momentum / no elastic — direct scroll only.
 *
 * HTML: .project-figment-approach-gallery > .project-figment-approach-track > cells
 * Uses global gsap from figment.html (core only).
 */
(function () {
  var reduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var hasGsap = typeof window !== "undefined" && typeof window.gsap !== "undefined";

  /** px/ms — below this, skip coasting (in-bounds release only) */
  var VELOCITY_THRESHOLD = 0.12;
  var MOMENTUM_MS = 480;
  var MOMENTUM_CAP_MULT = 1.35;

  /** Rubber: max visual stretch (px) scales with viewport */
  var RUBBER_CAP_MULT = 0.11;
  /** Release bounce when |translateX| exceeds this (px) */
  var RUBBER_RELEASE_THRESHOLD = 0.85;

  function clampScroll(el, x) {
    var max = Math.max(0, el.scrollWidth - el.clientWidth);
    if (x < 0) {
      return 0;
    }
    if (x > max) {
      return max;
    }
    return x;
  }

  /** Maps “wanted overscroll” in px to a damped translateX magnitude (diminishing returns) */
  function rubberAmount(overscrollPx, maxStretch) {
    if (overscrollPx <= 0) {
      return 0;
    }
    return maxStretch * (1 - 1 / (1 + overscrollPx * 0.0035));
  }

  function killGalleryTweens(el, track) {
    if (!hasGsap) {
      return;
    }
    gsap.killTweensOf(el);
    if (track) {
      gsap.killTweensOf(track);
    }
  }

  function setTrackX(track, xPx) {
    if (!track) {
      return;
    }
    if (hasGsap) {
      gsap.set(track, { x: xPx });
    } else {
      track.style.transform =
        xPx !== 0 ? "translate3d(" + xPx + "px,0,0)" : "";
    }
  }

  function setup(el) {
    var track = el.querySelector(".project-figment-approach-track");

    el.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("dragstart", function (ev) {
        ev.preventDefault();
      });
    });

    el.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
        return;
      }
      e.preventDefault();
      var delta = Math.round(el.clientWidth * 0.35);
      var dir = e.key === "ArrowRight" ? 1 : -1;
      var next = clampScroll(el, el.scrollLeft + dir * delta);
      el.scrollTo({
        left: next,
        behavior: reduced ? "auto" : "smooth",
      });
    });

    var fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) {
      return;
    }

    el.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) {
        return;
      }
      killGalleryTweens(el, track);
      if (track && hasGsap) {
        gsap.set(track, { x: 0 });
      } else if (track) {
        track.style.transform = "";
      }

      var pid = e.pointerId;
      var startX = e.clientX;
      var startScroll = el.scrollLeft;

      var prevT = performance.now();
      var prevSL = el.scrollLeft;
      var velEma = 0;
      /** Current rubber translateX on inner track (px); positive = pulled past left edge */
      var rubberX = 0;

      function move(ev) {
        if (ev.pointerId !== pid) {
          return;
        }

        var max = Math.max(0, el.scrollWidth - el.clientWidth);
        var raw = startScroll - (ev.clientX - startX);
        var cap = el.clientWidth * RUBBER_CAP_MULT;
        var tx = 0;

        if (reduced) {
          el.scrollLeft = clampScroll(el, raw);
          rubberX = 0;
          setTrackX(track, 0);
        } else if (raw < 0) {
          el.scrollLeft = 0;
          tx = rubberAmount(-raw, cap);
          rubberX = tx;
        } else if (raw > max) {
          el.scrollLeft = max;
          tx = -rubberAmount(raw - max, cap);
          rubberX = tx;
        } else {
          el.scrollLeft = raw;
          rubberX = 0;
          tx = 0;
        }

        if (!reduced && track) {
          setTrackX(track, tx);
        }

        var t = performance.now();
        var dt = t - prevT;
        if (dt > 0 && dt < 100) {
          var inst = (el.scrollLeft - prevSL) / dt;
          /* Ignore finger velocity during rubber so release does not fire horizontal momentum */
          if (Math.abs(rubberX) < 0.5) {
            velEma = velEma * 0.55 + inst * 0.45;
          } else {
            velEma *= 0.8;
          }
        }
        prevT = t;
        prevSL = el.scrollLeft;
      }

      function end(ev) {
        if (ev.pointerId !== pid) {
          return;
        }
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", end);
        el.removeEventListener("pointercancel", end);
        try {
          el.releasePointerCapture(pid);
        } catch (err) {
          /* ignore */
        }

        if (reduced || !hasGsap) {
          if (track) {
            setTrackX(track, 0);
          }
          return;
        }

        /* Edge rubber: bounce track back — do not run scroll momentum */
        if (track && Math.abs(rubberX) > RUBBER_RELEASE_THRESHOLD) {
          gsap.killTweensOf(track);
          gsap.to(track, {
            x: 0,
            duration: 1.12,
            /* Higher 2nd arg = less wobble; amp <1 = smaller first overshoot */
            ease: "elastic.out(0.88, 0.72)",
            overwrite: "auto",
          });
          return;
        }

        if (Math.abs(velEma) < VELOCITY_THRESHOLD) {
          return;
        }

        var extra = velEma * MOMENTUM_MS;
        var capDist = el.clientWidth * MOMENTUM_CAP_MULT;
        if (extra > capDist) {
          extra = capDist;
        } else if (extra < -capDist) {
          extra = -capDist;
        }

        var target = clampScroll(el, el.scrollLeft + extra);
        if (Math.abs(target - el.scrollLeft) < 3) {
          return;
        }

        var dist = Math.abs(target - el.scrollLeft);
        var dur = Math.min(1.35, Math.max(0.42, 0.38 + dist / 2200));

        gsap.to(el, {
          scrollLeft: target,
          duration: dur,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      try {
        el.setPointerCapture(pid);
      } catch (err) {
        /* ignore */
      }
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", end);
      el.addEventListener("pointercancel", end);
    });
  }

  document
    .querySelectorAll(".project-story-grid-gallery.project-figment-approach-gallery")
    .forEach(setup);
})();
