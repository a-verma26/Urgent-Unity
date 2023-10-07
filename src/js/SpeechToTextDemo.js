// import React, { useState, useEffect } from 'react';
// import { SpeechClient } from '@google-cloud/speech';

// const SpeechToTextDemo = () => {
//   const [transcript, setTranscript] = useState('');
//   const [recording, setRecording] = useState(false);

//   const startRecording = async () => {
//     setRecording(true);
//     const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     const audioContext = new AudioContext();
//     const source = audioContext.createMediaStreamSource(mediaStream);
//     const recognizer = new SpeechClient();

//     recognizer
//       .streamingRecognize({
//         config: {
//           encoding: 'LINEAR16',
//           sampleRateHertz: 16000,
//           languageCode: 'en-US',
//         },
//         interimResults: true,
//       })
//       .on('data', (data) => {
//         if (data.results[0] && data.results[0].alternatives[0]) {
//           setTranscript(data.results[0].alternatives[0].transcript);
//         }
//       })
//       .on('end', () => {
//         setRecording(false);
//       });

//     source.connect(audioContext.destination);
//   };

//   const stopRecording = () => {
//     // Implement stopping the recording and cleaning up resources
//   };

//   return (
//     <div>
//       <h1>Speech-to-Text Live Demo</h1>
//       <button onClick={startRecording} disabled={recording}>
//         Start Recording
//       </button>
//       <button onClick={stopRecording} disabled={!recording}>
//         Stop Recording
//       </button>
//       <div>
//         <p>Transcription: {transcript}</p>
//       </div>
//     </div>
//   );
// };

// export default SpeechToTextDemo;
