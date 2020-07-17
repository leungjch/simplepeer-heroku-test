(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// get video/voice stream
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  }).then(gotMedia).catch(() => {})
  
  function gotMedia (stream) {
    var peer1 = new Peer({ initiator: true, stream: stream })
    var peer2 = new Peer()
  
    peer1.on('signal', data => {
      peer2.signal(data)
    })
  
    peer2.on('signal', data => {
      peer1.signal(data)
    })
  
    peer2.on('stream', stream => {
      // got remote video stream, now let's show it in a video tag
      var video = document.querySelector('video')
  
      if ('srcObject' in video) {
        video.srcObject = stream
      } else {
        video.src = window.URL.createObjectURL(stream) // for older browsers
      }
  
      video.play()
    })
  }
},{}]},{},[1]);
