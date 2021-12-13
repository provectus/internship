"use strict";

document.body.onload = function () {
  setTimeout(() => {
    const preloader = document.getElementById('page-preloader');
    if (!preloader.classList.contains('done')) {
      preloader.classList.add('done');
    }
  }, 1000);
};

