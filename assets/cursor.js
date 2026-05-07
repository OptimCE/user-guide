/* Steppy cursor animation driver — shared across all static guide pages.
   Reads window.__STEPPY_STEPS__ (per-step frame data with bbox + viewport)
   and window.__STEPPY_TIMINGS__ (cursor timing overrides), then animates
   each step's cursor when its section scrolls into view. */
(function () {
  var steps = window.__STEPPY_STEPS__ || [];
  var T = Object.assign(
    { pre_action_ms: 200, action_ms: 300, post_action_ms: 150, travel_speed_px_per_ms: 1.5 },
    window.__STEPPY_TIMINGS__ || {}
  );

  function sleep(ms) {
    return new Promise(function (r) { setTimeout(r, ms); });
  }

  function easeInOut(t) {
    return t * t * (3 - 2 * t);
  }

  function scaleBbox(bbox, img, viewport) {
    if (!bbox || !viewport || !viewport.width || !viewport.height) return null;
    var rect = img.getBoundingClientRect();
    var rx = rect.width / viewport.width;
    var ry = rect.height / viewport.height;
    return {
      x: bbox.x * rx + (bbox.width * rx) / 2,
      y: bbox.y * ry + (bbox.height * ry) / 2
    };
  }

  function travel(cursorEl, from, to) {
    var dx = to.x - from.x;
    var dy = to.y - from.y;
    var dist = Math.hypot(dx, dy);
    var duration = Math.max(150, dist / (T.travel_speed_px_per_ms || 1.5));
    var mx = (from.x + to.x) / 2;
    var my = (from.y + to.y) / 2;
    var nx = dist ? -dy / dist : 0;
    var ny = dist ? dx / dist : 0;
    var cp = { x: mx + nx * dist * 0.15, y: my + ny * dist * 0.15 };
    return new Promise(function (resolve) {
      var start = performance.now();
      function frame(now) {
        var raw = Math.min(1, (now - start) / duration);
        var t = easeInOut(raw);
        var x = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * cp.x + t * t * to.x;
        var y = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * cp.y + t * t * to.y;
        cursorEl.style.left = x + "px";
        cursorEl.style.top = y + "px";
        if (raw < 1) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
  }

  function fireClick(ripple, to) {
    ripple.style.left = to.x + "px";
    ripple.style.top = to.y + "px";
    ripple.classList.remove("fire");
    void ripple.offsetWidth;
    ripple.classList.add("fire");
  }

  async function typeValue(kbd, to, value) {
    kbd.style.left = (to.x + 16) + "px";
    kbd.style.top = (to.y + 16) + "px";
    kbd.textContent = "";
    kbd.classList.add("visible");
    var chars = (value || "").split("");
    var per = chars.length ? (T.action_ms / chars.length) : T.action_ms;
    for (var i = 0; i < chars.length; i++) {
      kbd.textContent += chars[i];
      await sleep(per);
    }
    await sleep(80);
    kbd.classList.remove("visible");
  }

  async function waitImageReady(img) {
    if (img.complete && img.naturalWidth) return;
    await new Promise(function (r) {
      img.addEventListener("load", r, { once: true });
      img.addEventListener("error", r, { once: true });
    });
  }

  async function animateFrame(stage, frame) {
    var img = stage.querySelector("img");
    var cursor = stage.querySelector(".steppy-cursor");
    var ripple = stage.querySelector(".steppy-ripple");
    var kbd = stage.querySelector(".steppy-kbd");
    var behavior = frame && frame.cursor;
    if (!behavior) {
      cursor.classList.remove("visible");
      return;
    }

    await waitImageReady(img);

    var targets;
    if (behavior.kind === "type-multi") {
      targets = (behavior.targets || []).map(function (t) {
        return { bbox: t.bbox, value: t.value, kind: "type" };
      });
    } else {
      var t0 = behavior.target || {};
      targets = [{ bbox: t0.bbox, value: behavior.value, kind: behavior.kind }];
    }

    var localLast = { x: 8, y: 8 };
    cursor.classList.add("visible");

    for (var i = 0; i < targets.length; i++) {
      var tgt = targets[i];
      var to = scaleBbox(tgt.bbox, img, frame.viewport);
      if (!to) continue;
      await travel(cursor, localLast, to);
      localLast = to;

      cursor.classList.remove("pulse");
      void cursor.offsetWidth;
      cursor.classList.add("pulse");
      await sleep(T.pre_action_ms);
      cursor.classList.remove("pulse");

      if (tgt.kind === "click") {
        fireClick(ripple, to);
        await sleep(T.action_ms);
      } else if (tgt.kind === "type") {
        await typeValue(kbd, to, tgt.value);
      } else {
        await sleep(T.action_ms);
      }

      await sleep(T.post_action_ms);
    }
  }

  async function animateStep(section, step) {
    if (!step) return;
    var stages = section.querySelectorAll(".steppy-stage");
    var frames = step.frames || [];
    for (var i = 0; i < stages.length; i++) {
      await animateFrame(stages[i], frames[i]);
    }
  }

  function init() {
    var sections = document.querySelectorAll(".steppy-step");
    if (!("IntersectionObserver" in window)) {
      (async function () {
        for (var i = 0; i < sections.length; i++) {
          await animateStep(sections[i], steps[i]);
        }
      })();
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var idx = parseInt(entry.target.dataset.stepIndex, 10) - 1;
        io.unobserve(entry.target);
        animateStep(entry.target, steps[idx]);
      });
    }, { threshold: 0.5 });
    sections.forEach(function (s) { io.observe(s); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
