import React, { useState, useRef } from 'react';
import "../scss/SpeechToText.scss"
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIA2J3GCLST6BZEVWTJ',
  secretAccessKey: '3TWaeud3zOckBcs32OaxcMKd6dzQOYhJTmE6ZFy7',
  region: 'us-east-1', // Set your desired AWS region
});

const translate = new AWS.Translate();


const SpeechToText = () => {
  const [recording, setRecording] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const audioRef = useRef(null);

  const startRecording = () => {
    setTranslatedText(''); // Reset translated text when starting a new recording
    const recognition = new window.webkitSpeechRecognition();
    recognition.onstart = () => {
      setRecording(true);
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      console.log('Speech Result:', speechResult);
      // Send the speech result to your backend for translation
      sendRecordingToServer(speechResult);
    };

    recognition.onend = () => {
      setRecording(false);
    };

    recognition.start();
  };

  const stopRecording = () => {
    if (recording) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.stop();
    }
  };

  const sendRecordingToServer = async (speechResult) => {
    const params = {
      Text: speechResult,
      SourceLanguageCode: 'en',
      TargetLanguageCode: 'fr'
    };

    translate.translateText(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        setTranslatedText(data.TranslatedText);
      }
    });
  
  };

  return (
    <div className='speechContainer'>
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
      {translatedText && (
        <div>
          <h2>Translated Text:</h2>
          <p>{translatedText}</p>
        </div>
      )}
      <audio ref={audioRef} controls style={{ display: 'none' }} />
    </div>
  );
};

export default SpeechToText;
