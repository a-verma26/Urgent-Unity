import React, { useState, useRef } from 'react';
import "../scss/SpeechToText.scss"
import speakImg from "./assets/speak.png"
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION, // Set your desired AWS region
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
          <div className='leftWrapper'>
          <img className="speak-img" src={speakImg} alt="Alert"/>
          </div>
          <div  className='rightWrapper'> 
          <div className='textheading'>Translated Text sent to CPR Practitioner:</div>
          <div className='textmsg'>{translatedText}</div>
          </div>
        </div>
      )}
      <audio ref={audioRef} controls style={{ display: 'none' }} />
    </div>
  );
};

export default SpeechToText;
